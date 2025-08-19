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
import useEditAccountStore from "@/features/accounts/hooks/use-edit-account-hook";
import AccountForm from "@/features/accounts/components/account-form";
import { insertAccountSchema } from "@/db/schema";
import z from "zod";
import { useGetAcount } from "@/features/accounts/api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "@/features/accounts/api/use-edit-acount";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-acount";
import { useConfirm } from "@/hooks/use-confirm";


export default function EditAccountSheet() {
  const { isOpen, onClose, id } = useEditAccountStore();

  //   ambil data account
  const accountQuery = useGetAcount(id)

  // mutaion for edit
  const { mutate: editMutate, isPending: editPending } = useEditAccount(id)

  // mutation for delete
  const { mutate: deleteMutate, isPending: deletePending } = useDeleteAccount(id)

  // check if isLoading
  const isLoading = accountQuery.isLoading;

  // confirmation hooks
  const [ConfirmDelete, confirm] = useConfirm(
    "are you sure you want to delete this account?",
    "Delete Account",
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formSchema = insertAccountSchema.pick({
    name: true,
  });

  type formValues = z.infer<typeof formSchema>;

  const onSubmit = (values: formValues) => {
    editMutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  //   default value
  const defaulValue = accountQuery.data ? {
    name: accountQuery.data[0].name,
  } : {
    name: ""
  };

  // on delete function
  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutate(undefined,{
        onSuccess:() => {
          onClose();
        }
      });
    }
  }

  return (
    <>
    <ConfirmDelete/>
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>
            Edit account to track your expenses
          </SheetDescription>
        </SheetHeader>

        {/* handle loading here */}
        {isLoading
          ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-2 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={editPending || deletePending}
              defaultValue={defaulValue}
              onDelete={onDelete}
            />
          )}

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Continue</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </>

  );
}
