"use client";

import * as z from 'zod';
import { AlertCircleIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Spinner } from '../ui/spinner';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../ui/alert";

import { useEffect, useState } from "react";
import { ApiErrorData } from "./SignIn";
import { useRouter } from "next/navigation";
import { useSignedAccount } from "../../../store/signedAccount";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const createAccountSchema = z.object({
  name: z.string(),
  email: z.email("Insira um e-mail valido"),
  password: z.string().min(15, "A senha precisa ter pelo menos 15 caracteres"),
  role: z.enum(["admin", "operator"], "Insira uma função valida")
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

type CreateAccountAPIResponse = {
  account: {
    id: number,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date
  }
}

type AccountRoleType = {
  id: number
  name: string
  slug: string
  created_at: Date
  updated_at: Date
}

export const CreateAccountForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles, setRoles] = useState<AccountRoleType[]>([]);
  const [apiErrorFetchRoles, setApiErrorFetchRoles] = useState<ApiErrorData>({
    message: "",
    status: ""
  });
  const [apiError, setApiError] = useState<ApiErrorData>({
    message: "",
    status: ""
  });

  const router = useRouter();

  const {
    setSignedAccount
  } = useSignedAccount();

  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'operator'
    }
  });

  useEffect(() => {
    async function loadRoles() {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/roles`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        }
      );

      if (!request.ok) {
        const data = await request.json() as ApiErrorData;

        setApiErrorFetchRoles(data);
      }

      const roles = await request.json() as AccountRoleType[];

      setRoles(roles);
    }

    loadRoles();
  }, []);

  const onSubmit = async (data: CreateAccountFormData) => {
    setIsSubmitting(true);
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!request.ok) {
        const data = await request.json() as ApiErrorData;

        setApiError(data);
      }

      const {
        account
      } = await request.json() as CreateAccountAPIResponse;
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id='form-sign-in'
        className="flex flex-col gap-3"
      >
        <FieldGroup>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-name">
                  Nome
                </FieldLabel>
                <Input
                  {...field}
                  id="form-name"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Nome do cliente"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup className="grid gap-2">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-email">
                  E-mail
                </FieldLabel>
                <Input
                  {...field}
                  id="form-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="E-mail do cliente"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup className="grid gap-2">
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-role">
                  Perfil
                </FieldLabel>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleciona o perfil da conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.slug}>{role.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
