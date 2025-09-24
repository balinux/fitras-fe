"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useNewAccountStore from "@/features/accounts/hooks/use-new-accout-hook";
import AccountForm from "@/features/accounts/components/account-form";
import { insertAccountSchema } from "@/db/schema";
import z from "zod";
import { useCreateAccount } from "@/features/accounts/api/use-create-acount";

export default function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccountStore();

  // react query
  const mutation = useCreateAccount();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formSchema = insertAccountSchema.pick({
    name: true,
  });

  type formValues = z.infer<typeof formSchema>;

  const onSubmit = (values: formValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create new account to track your expenses
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValue={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
}
