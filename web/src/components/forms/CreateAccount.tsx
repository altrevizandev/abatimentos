"use client";

import * as z from 'zod';
import { AlertCircleIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../ui/alert";
import { SignedAccount, useSignedAccount } from '../../../store/signedAccount';
import { Separator } from '../ui/separator';
import { ApiErrorData } from './SignIn';

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

export const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    <Card className="flex-1 max-w-112.5 md:m-auto">
      <CardHeader>
        <CardTitle className='text-center'>Tirol Abatimentos</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        {apiError.message != "" && (
          <Alert variant="destructive" className="max-w-md mb-3">
            <AlertCircleIcon />
            <AlertTitle>Mensagem da API</AlertTitle>
            <AlertDescription>
              {apiError.message}
            </AlertDescription>
          </Alert>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id='form-sign-in'
          className="flex flex-col gap-3"
        >
          <FieldGroup>
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="joe@example.com"
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-password">
                    Senha
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="**************"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <div>
          {apiError.message}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {form.formState.isSubmitting ? (
          <Button disabled type="submit" className="w-full">
            <Spinner data-icon="inline-start" />
            Entrando no sistema...
          </Button>
        ) : (
          <Button type="submit" className="w-full" form="form-sign-in">
            Entrar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}