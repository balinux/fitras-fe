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
import useNewTransactionStore from "@/features/transactions/hooks/use-new-transaction-hook";
// import TransactionForm from "@/features/transactions/components/transaction-form";
import { insertTransactionSchema } from "@/db/schema";
import z from "zod";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-acount";
import TransactionForm from "./transaction-form";
import { Loader2 } from "lucide-react";

export default function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransactionStore();

  // react query
  const { mutate: addTransactionMutation, isPending: addTransactionIsPending } = useCreateTransaction();

  // add category mutation
  const { mutate: addCategoryMutation, isPending: addCategoryIsPending } = useCreateCategory();

  // add category query
  const { data: categories, isLoading: categoriesIsLoading } = useGetCategories();

  // add category mutation
  const { mutate: addAccountMutation, isPending: addAccountIsPending } = useCreateAccount();

  // add category query
  const { data: accounts, isLoading: accountsIsLoading } = useGetAccounts();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formSchema = insertTransactionSchema.omit({
    id: true,
  });

  type formValues = z.infer<typeof formSchema>;

  const onSubmit = (values: formValues) => {
    addTransactionMutation(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  // option categories
  const categoryOptions = (categories ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  // option accounts
  const accountOptions = (accounts ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  // function for create category
  const onCreateCategory = (name: string) => {
    addCategoryMutation({ name }, {
      onSuccess: () => {
        // onClose();
      },
    });
  }

  // function for create category
  const onCreateAccount = (name: string) => {
    addAccountMutation({ name }, {
      onSuccess: () => {
        // onClose();
      },
    });
  }

  const isPending = addTransactionIsPending || addCategoryIsPending || addAccountIsPending
  const isLoading = categoriesIsLoading || accountsIsLoading;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Create new transaction to track your expenses
          </SheetDescription>
        </SheetHeader>
        {/* <TransactionForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValue={{ name: "" }}
        /> */}

        {isLoading
          ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin text-muted-foreground" />
            </div>
          )
          : (
            <TransactionForm
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              onCreateCategory={onCreateCategory}
            />
          )
        }

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
