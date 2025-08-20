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
import useNewCategoryStore from "@/features/categories/hooks/use-new-category-hook";
import CategoryForm from "@/features/categories/components/category-form";
import { insertCategorySchema } from "@/db/schema";
import z from "zod";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

export default function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategoryStore();

  // react query
  const mutation = useCreateCategory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formSchema = insertCategorySchema.pick({
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
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create new category to organize your expenses
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
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
