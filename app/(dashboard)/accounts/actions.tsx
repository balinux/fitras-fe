"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useEditAccountStore from "@/features/accounts/hooks/use-edit-account-hook";
import { Edit, MoreHorizontal } from "lucide-react";

interface ActionProps {
    id: string;
}

export default function Actions({ id }: ActionProps) {
    // use edit account hook and pass id to it
    const { onOpen } = useEditAccountStore();

    return (
        <>
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
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}