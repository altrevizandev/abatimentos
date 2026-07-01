"use client";

import { FormProvider, useForm } from 'react-hook-form';
import { CreateAccountForm } from '../forms/CreateAccountForm';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const createAccountSchema = z.object({
  name: z.string(),
  email: z.email("Insira um e-mail valido"),
  role: z.enum(["admin", "operator"], "Insira uma função valida")
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export const CreateAccountModal = () => {

  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'operator'
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Criar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Criando nova conta</DialogTitle>
          <DialogDescription>
            Crie uma nova conta aqui
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <CreateAccountForm />
        </FormProvider>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" form='form-create-account'>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}