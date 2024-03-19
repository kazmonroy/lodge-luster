import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../../services/apiCabins';
import { Cabin } from '../../../services/types/collection';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: Cabin; id: number }) =>
      createEditCabin(newCabin, id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
