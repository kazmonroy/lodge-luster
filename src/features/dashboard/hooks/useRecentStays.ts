import { useQuery } from '@tanstack/react-query';
import { getStaysAfterDate } from '../../../services/apiBookings';
import { useQueryDate } from './useQueryDate';

export function useRecentStays() {
  const { numDays, queryDate } = useQueryDate();

  const {
    data: stays,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  );
  return { confirmedStays, isLoading, error };
}
