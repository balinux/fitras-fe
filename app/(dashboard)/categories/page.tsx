"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import useNewCategoryStore from "@/features/categories/hooks/use-new-category-hook";
import { columns } from "@/app/(dashboard)/categories/columns";
import { DataTable } from "@/components/data-table";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategory } from "@/features/categories/api/use-bulk-delete-categories";

export default function CategoriesPage() {

  // get categories query
  const categoryQuery = useGetCategories();

  // categories data
  const categories = categoryQuery.data || [];

  // delete mutation
  const deleteMutation = useBulkDeleteCategory();

  // open new category modal
  const { onOpen } = useNewCategoryStore();

  // is disabled
  const isDisabled = categoryQuery.isLoading || deleteMutation.isPending;

  // loading state
  if (categoryQuery.isLoading) {
    return (
      <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm ">
          <CardHeader>
            <Skeleton className="h-10 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[500px] w-full flex items-center justify-center" />
            <Loader2 className="animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between ">
          <CardTitle className="text-xl line-clamp-1 ">
            Categories Page
          </CardTitle>
          <Button className="w-full lg:w-auto" onClick={onOpen}>
            <Plus className="mr-2 h-4 w-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteMutation.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}
