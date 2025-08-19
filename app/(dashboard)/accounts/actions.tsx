"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-acount";
import useEditAccountStore from "@/features/accounts/hooks/use-edit-account-hook";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface ActionProps {
    id: string;
}

export default function Actions({ id }: ActionProps) {
    // use edit account hook and pass id to it
    const { onOpen } = useEditAccountStore();

    // use delete account hook and pass id to it
    const { mutate: deleteMutate } = useDeleteAccount(id);

    // confirmation hooks
    const [ConfirmDelete, confirm] = useConfirm(
        "are you sure you want to delete this account?",
        "Delete Account",
    )

    // on delete function
    const onDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutate();
        }
    }

    return (
        <>
        <ConfirmDelete/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="size-8 p-0">
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
    )
}