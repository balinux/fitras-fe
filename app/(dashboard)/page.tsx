"use client";

import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import useNewAccountStore from "@/features/accounts/hooks/use-new-accout-hook";

export default function Home() {
  const { data: accounts, isLoading } = useGetAccounts();
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
