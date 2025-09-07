import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMilliUnit } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: convertAmountFromMilliUnit(data.incomeAmount),
        expenseAmount: convertAmountFromMilliUnit(data.expenseAmount),
        remainingAmount: convertAmountFromMilliUnit(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMilliUnit(category.value),
        })),
        days: data.days.map((day) => ({
            ...day,
            income: convertAmountFromMilliUnit(day.income),
            expenses: convertAmountFromMilliUnit(day.expenses),
        }))
      };
    },
  });
  return query;
};
