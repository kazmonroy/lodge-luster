import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

export function useQueryDate() {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get('last')) || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  return { numDays, queryDate };
}
