"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import useNewAccountStore from "@/features/accounts/hooks/use-new-accout-hook";

export default function AccountsPage() {
    const { onOpen } = useNewAccountStore();
    return (
        <div className=" max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm ">
                <CardHeader className="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between ">
                    <CardTitle className="text-xl line-clamp-1 ">Accounts Page</CardTitle>
                    <Button className="w-full lg:w-auto" onClick={onOpen}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add new
                    </Button>
                </CardHeader>
            </Card>
        </div>
    );
}
