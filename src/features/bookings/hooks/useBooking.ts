import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../../services/apiBookings';

function useBooking() {
  const { bookingId } = useParams();
  console.log('bookingId', bookingId);
  const { data: booking, isLoading } = useQuery({
    queryFn: () => getBooking(bookingId!),
    queryKey: ['booking'],
  });
  return { booking, isLoading };
}

export default useBooking;
