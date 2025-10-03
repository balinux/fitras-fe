"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import useEditTransactionStore from "@/features/transactions/hooks/use-edit-transaction-store";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
// import { useRouter } from "next/navigation";

interface ActionProps {
  id: string;
}

export default function Actions({ id }: ActionProps) {
  // const router = useRouter();

  // use edit account hook and pass id to it
  const { onOpen } = useEditTransactionStore();

  // use delete account hook and pass id to it
  const { mutate: deleteMutate } = useDeleteTransaction(id);

  // confirmation hooks
  const [ConfirmDelete, confirm] = useConfirm(
    "are you sure you want to delete this transaction?",
    "Delete Transaction",
  );

  // on delete function
  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutate();
    }
  };

  const onInvoice = () => {
    // router.push(`/invoice/${id}/pdf`);
    window.open(`/invoice/${id}/pdf`, "_blank");
  };  


  return (
    <>
      <ConfirmDelete />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={false}
            onClick={() => onOpen(id)}
            className="flex gap-2"
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={false}
            onClick={() => onInvoice()}
            className="flex gap-2"
          >
            <Edit className="size-4 mr-2" />
            Invoice
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            disabled={false}
            onClick={onDelete}
            className="flex gap-2"
          >
            <Trash2 className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
