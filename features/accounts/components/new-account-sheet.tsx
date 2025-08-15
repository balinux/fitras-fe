"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import useNewAccountStore from "@/features/accounts/hooks/use-new-accout-hook";
import AccountForm from "@/features/accounts/components/account-form";
import { insertAccountSchema } from "@/db/schema";
import z from "zod";

export default function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccountStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formSchema = insertAccountSchema.pick({
    name: true,
  });

  type formValues = z.infer<typeof formSchema>;

  const onSubmit = (values: formValues) => {
    console.log(values);
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
          disabled={false}
          defaultValue={{ name: "" }}
        />
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Continue</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
