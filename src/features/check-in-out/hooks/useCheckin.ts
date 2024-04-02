import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Props {
  bookingId: number;
  breakfast?: {
    extrasPrice: number;
    totalPrice: number;
    hasBreakfast: boolean;
  };
}

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: Props) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.at(0)?.id} successfully checked in!`);
      queryClient.invalidateQueries();
      navigate('/');
    },
    onError: () => {
      toast.success('There was an error while checking-in');
    },
  });
  return { checkin, isCheckingIn };
}
