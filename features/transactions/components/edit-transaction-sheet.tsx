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
import { insertTransactionSchema } from "@/db/schema";
import z from "zod";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import useEditTransactionStore from "@/features/transactions/hooks/use-edit-transaction-store";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import TransactionForm from "@/features/transactions/components/transaction-form";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useCreateAccount } from "@/features/accounts/api/use-create-acount";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export default function EditTransactionSheet() {
  const { isOpen, onClose, id } = useEditTransactionStore();

  //   get transaction data
  const transactionQuery = useGetTransaction(id);

  // mutation for edit
  const { mutate: editMutate, isPending: editPending } = useEditTransaction(id);

  // mutation for delete
  const { mutate: deleteMutate, isPending: deletePending } =
    useDeleteTransaction(id);

  // confirmation hooks
  const [ConfirmDelete, confirm] = useConfirm(
    "are you sure you want to delete this transaction?",
    "Delete Transaction",
  );

  // add category mutation
  const { mutate: addCategoryMutation, isPending: addCategoryIsPending } =
    useCreateCategory();

  // add category query
  const { data: categories, isLoading: categoriesIsLoading } =
    useGetCategories();

  // option categories
  const categoryOptions = (categories ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  // add account mutation
  const { mutate: addAccountMutation, isPending: addAccountIsPending } =
    useCreateAccount();

  // add account query
  const { data: accounts, isLoading: accountsIsLoading } = useGetAccounts();

  // option accounts
  const accountOptions = (accounts ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  // handle isPending
  const isPending =
    editPending ||
    deletePending ||
    transactionQuery.isLoading ||
    addCategoryIsPending ||
    addAccountIsPending;

  // check if isLoading
  const isLoading =
    transactionQuery.isLoading || categoriesIsLoading || accountsIsLoading;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formSchema = insertTransactionSchema.omit({
    id: true,
  });

  type formValues = z.input<typeof formSchema>;

  const onSubmit = (values: formValues) => {
    editMutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  //   default value
  const defaulValue = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        payee: transactionQuery.data.payee,
        amount: transactionQuery.data.amount.toString(),
        notes: transactionQuery.data.notes,
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
      }
    : {
        accountId: "",
        categoryId: "",
        payee: "",
        amount: "",
        notes: "",
        date: new Date(),
      };

  // on delete function
  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  // function for create category
  const onCreateCategory = (name: string) => {
    addCategoryMutation(
      { name },
      {
        onSuccess: () => {
          // onClose();
        },
      },
    );
  };

  // function for create category
  const onCreateAccount = (name: string) => {
    addAccountMutation(
      { name },
      {
        onSuccess: () => {
          // onClose();
        },
      },
    );
  };

  return (
    <>
      <ConfirmDelete />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction</SheetDescription>
          </SheetHeader>

          {/* handle loading here */}
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-2 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              defaultValue={defaulValue}
              categoryOptions={categoryOptions}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              onCreateCategory={onCreateCategory}
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
