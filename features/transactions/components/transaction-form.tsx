import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { insertTransactionSchema } from "@/db/schema";
import { Select } from "@/components/select";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string(),
  payee: z.string(),
  amount: z.number(),
  note: z.string().nullable().optional(),
})

const apiSchema = insertTransactionSchema.omit({
  id: true,
})

type ApiFormValues = z.infer<typeof apiSchema>
type formValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  defaultValue?: formValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void
  onCreateCategory: (name: string) => void;
};

export default function TransactionForm({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory
}: Props) {
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });

  const handleSubmit = async (values: formValues) => {
    // onSubmit(values);
    console.log(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-x-4 space-y-4 pt-4 mx-5"
      >
        <FormField
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  disabled={disabled}
                  placeholder="Select Account"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}

                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  disabled={disabled}
                  placeholder="Select Category"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}

                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={disabled}
          className="w-full mt-5"
          type="submit"
          onClick={() => form.handleSubmit(handleSubmit)}
        >
          {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {id ? "Save Changes" : "Create Account"}
        </Button>

        {!!id && (
          <Button
            disabled={disabled}
            type="button"
            onClick={handleDelete}
            variant="destructive"
            className="w-full mt-5"
          >
            <Trash className="size-4 mr-2" />
            Delete Account
          </Button>
        )}
      </form>
    </Form>
  );
}
