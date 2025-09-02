import { clsx, type ClassValue } from "clsx";
import { eachDayOfInterval, isSameDay } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountTomiliUnit(amount: number) {
  return Math.round(amount * 1000);
}

export function convertAmountFromMilliUnit(amount: number) {
  return amount / 1000;
}

export function formatCurrency(amount: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous == 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}

export function fillMissingDays(
  activeDays: {
    date: Date;
    income: number;
    expenses: number;
  }[],
  startDate: Date,
  endDate: Date,
) {
  // check leng of active day
  if (activeDays.length == 0) {
    return [];
  }
  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // fill all transastion by days
  const transactionByDay = allDays.map((day) => {
    const activeDay = activeDays.find((activeDay) =>
      isSameDay(activeDay.date, day),
    );

    if (activeDay) {
      return activeDay;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });

  return transactionByDay;
}
