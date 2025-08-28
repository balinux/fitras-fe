import EditAccountStore from "@/features/accounts/hooks/use-edit-account-hook";

type Props = {
  account: string;
  accountId: string;
};

export default function AccountTransactionEditColumn({
  account,
  accountId,
}: Props) {
  const { onOpen: onOpenEditAccount } = EditAccountStore();

  const onClick = () => {
    onOpenEditAccount(accountId);
  };
  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </div>
  );
}
