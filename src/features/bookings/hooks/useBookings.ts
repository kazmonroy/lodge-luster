import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status');
  const sortValue = searchParams.get('sortBy') || 'startDate-desc';

  // FILTER
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // SORT
  const [field, direction] = sortValue.split('-');
  const sortBy = { field, direction };

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookings({ filter, sortBy }),
    queryKey: ['bookings', filter, sortBy],
  });
  return { bookings, isLoading };
}
