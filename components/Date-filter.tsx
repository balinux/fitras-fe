"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";
import qs from "query-string";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { formatDateRange } from "@/lib/utils";
import { useState } from "react";
import { Calendar } from "./ui/calendar";

export default function DateFilter() {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId");
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defautlTo = new Date();
  const defautlFrom = subDays(defautlTo, 30);

  const paramState = {
    from: from ? new Date(from) : defautlFrom,
    to: to ? new Date(to) : defautlTo,
  };

  const [dateRange, setDateRange] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange?: DateRange) => {
    const query = {
      from: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : undefined,
      to: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
      accountId,
    };
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    );
    router.push(url);
  };

  const onReset = () => {
    setDateRange(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size="sm"
          variant="outline"
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/20 hover:bg-white/70 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <Calendar
          mode="range"
          disabled={false}
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
        />
        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              onClick={() => pushToUrl(dateRange)}
              disabled={!dateRange?.from || !dateRange?.to}
              className="w-full"
            >
              Apply
            </Button>
          </PopoverClose>
        </div>

        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              variant="outline"
              onClick={onReset}
              disabled={!dateRange?.from || !dateRange?.to}
              className="w-full"
            >
              Reset
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
