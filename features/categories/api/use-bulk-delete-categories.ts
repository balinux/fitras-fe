import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json: RequestType) => {
      const response = await client.api.categories["bulk-delete"]["$post"]({
        json,
      });
      if (!response) {
        throw new Error("Failed to bulk delete category");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Category bulk deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to bulk delete category");
    },
  });
  return mutation;
};
