"use client";

import { useGetAcounts } from "@/features/accounts/api/use-get-account";

export default function Home() {
  const { data: accounts, isLoading } = useGetAcounts();

  if (isLoading) {
    return <>Loading . . .</>;
  }

  return (
    <>
      {accounts?.map((account) => (
        <div key={account.id}>{account.name}</div>
      ))}
    </>
  );
}
