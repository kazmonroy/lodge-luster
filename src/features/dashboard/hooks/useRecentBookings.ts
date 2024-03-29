import { useQuery } from '@tanstack/react-query';
import { getBookingsAfterDate } from '../../../services/apiBookings';
import { useQueryDate } from './useQueryDate';

export function useRecentBookings() {
  const { numDays, queryDate } = useQueryDate();

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${numDays}`],
  });

  return { bookings, isLoading, error };
}
