import { insertAccountSchema } from "@/db/schema";
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

const formSchema = insertAccountSchema.pick({
  name: true,
});

type formValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  defaultValue?: formValues;
  onSubmit: (values: formValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export default function AccountForm({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
}: Props) {
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });

  const handleSubmit = async (values: formValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-x-4 pt-4 mx-5"
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Account name"
                  {...field}
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
