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
import useEditCategoryStore from "@/features/categories/hooks/use-edit-category-hook";
import CategoryForm from "@/features/categories/components/category-form";
import { insertCategorySchema } from "@/db/schema";
import z from "zod";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

export default function EditCategorySheet() {
  const { isOpen, onClose, id } = useEditCategoryStore();

  //   ambil data caategory
  const categoryQuery = useGetCategory(id);

  // mutaion for edit
  const { mutate: editMutate, isPending: editPending } = useEditCategory(id);

  // mutation for delete
  const { mutate: deleteMutate, isPending: deletePending } =
    useDeleteCategory(id);

  // check if isLoading
  const isLoading = categoryQuery.isLoading;

  // confirmation hooks
  const [ConfirmDelete, confirm] = useConfirm(
    "are you sure you want to delete this category?",
    "Delete Category",
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formSchema = insertCategorySchema.pick({
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
  const defaulValue = categoryQuery.data
    ? {
        name: categoryQuery.data[0].name,
      }
    : {
        name: "",
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

  return (
    <>
      <ConfirmDelete />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>
              Edit category to organize your expenses
            </SheetDescription>
          </SheetHeader>

          {/* handle loading here */}
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-2 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
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
