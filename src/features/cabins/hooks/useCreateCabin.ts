import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    queryKey: ["cabins"],
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
