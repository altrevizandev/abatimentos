"use client";

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

export const CreateAccountModal = () => {
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
        <CreateAccountForm />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}