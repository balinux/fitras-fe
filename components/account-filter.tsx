"use client"

import qs from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Select, SelectItem } from "./ui/select";
import { SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

export default function AccountFilter() {
    const router = useRouter()
    const pathname = usePathname()

    const params = useSearchParams()
    const accountId = params.get("accountId") || "all";
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const {
        data: accounts,
        isLoading: isLoadingAccounts
    } = useGetAccounts()    

    const {
        isLoading: isLoadingSummary
    } = useGetSummary()

    const onChange = (value: string) => {
        const query = {
            accountId: value,
            from,
            to
        }
        if (value === "all") {
            query.accountId = ""
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }
    return (
        <Select
            value={accountId}
            onValueChange={onChange}
            disabled={isLoadingAccounts || isLoadingSummary}
        >
            <SelectTrigger
                className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/20 hover:bg-white/70 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
                <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all"> All Account </SelectItem>
                {
                    accounts?.map((account) => {
                        return (
                            <SelectItem key={account.id} value={account.id}>
                                {account.name}
                            </SelectItem>
                        )
                    })
                }
            </SelectContent>

        </Select>
    )
}