import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../../services/apiBookings';
import toast from 'react-hot-toast';
import { Booking } from '../../../services/types/collection';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, { status: 'checked-in', isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.at(0)?.id} successfully checked in!`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => {
      toast.success('There was an error while checking-in');
    },
  });
  return { checkin, isCheckingIn };
}
