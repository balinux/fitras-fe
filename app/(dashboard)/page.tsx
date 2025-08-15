"use client";

import { Button } from "@/components/ui/button";
import { useGetAcounts } from "@/features/accounts/api/use-get-account";
import useNewAccountStore from "@/features/accounts/hooks/use-new-accout-hook";

export default function Home() {
  const { data: accounts, isLoading } = useGetAcounts();
  const { onOpen } = useNewAccountStore();

  if (isLoading) {
    return <>Loading . . .</>;
  }

  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      {accounts?.map((account) => (
        <div key={account.id}>{account.name}</div>
      ))}
    </>
  );
}
