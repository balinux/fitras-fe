import Header from "@/components/header";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        <Suspense
          fallback={<Loader2 className="size-6 animate-spin text-slate-400" />}
        >
          {children}
        </Suspense>
      </main>
    </>
  );
}
