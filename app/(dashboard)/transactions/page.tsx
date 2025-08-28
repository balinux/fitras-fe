"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "@/app/(dashboard)/transactions/columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransaction } from "@/features/transactions/api/use-bulk-delete-transactions";
import useNewTransactionStore from "@/features/transactions/hooks/use-new-transaction-hook";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useState } from "react";
import UploadButton from "./upload-button";
import ImportCard from "./import-card";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {}
}

export default function TransactionsPage() {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)

  // import result state
  const [importResults, setImportResults] = useState<typeof INITIAL_IMPORT_RESULTS>(INITIAL_IMPORT_RESULTS)

  const transactionQuery = useGetTransactions();
  const transactions = transactionQuery.data || [];

  const deleteMutation = useBulkDeleteTransaction();

  const { onOpen } = useNewTransactionStore();

  const isDisabled = transactionQuery.isLoading || deleteMutation.isPending;

  if (transactionQuery.isLoading) {
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

  

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    // console.log(results)
    setImportResults(results)
    setVariant(VARIANTS.IMPORT)
  }

  const onCancelImport = () => {
    setVariant(VARIANTS.LIST)
    setImportResults(INITIAL_IMPORT_RESULTS)
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <ImportCard data={importResults.data} onCancel={onCancelImport} onSubmit={() => {}}/>
    )
  }

  return (
    <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between ">
          <CardTitle className="text-xl line-clamp-1 ">
            Transactions history
          </CardTitle>
          <div className="flex gap-2 items-center">
            <Button className="w-full lg:w-auto" onClick={onOpen}>
              <Plus className="mr-2 h-4 w-4" />
              Add new
            </Button>
            <UploadButton onUpload={onUpload}/>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="payee"
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
