import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../../services/apiBookings';

export function useTodaysActivity() {
  const { data: stays, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['todays-activity'],
  });
  return { stays, isLoading };
}
