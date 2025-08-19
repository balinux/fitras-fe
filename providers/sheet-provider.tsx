"use client";

import NewAccountSheet from "@/features/accounts/components/new-account-sheet";
import EditAccountSheet from "@/features/accounts/components/edit-account";

export default function SheetProvider() {
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
}
