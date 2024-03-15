import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../../services/apiBookings';

export function useBookings() {
  const { data: bookings, isLoading } = useQuery({
    queryFn: getBookings,
    queryKey: ['bookings'],
  });
  return { bookings, isLoading };
}
