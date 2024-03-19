import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props {
  bookingId: string | number;
}

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }: Props) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.at(0)?.id} successfully checked out!`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => {
      toast.success('There was an error while checking-in');
    },
  });
  return { checkout, isCheckingOut };
}
