import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>["json"];

export const useBulkCreateTransaction = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json: RequestType) => {
      const response = await client.api.transactions["bulk-create"]["$post"]({
        json,
      });
      if (!response) {
        throw new Error("Failed to bulk create transaction");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transaction bulk created successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to bulk create transaction");
    },
  });
  return mutation;
};
