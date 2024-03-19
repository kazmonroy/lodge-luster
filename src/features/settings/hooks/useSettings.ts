import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../../services/apiSettings';

export function useSettings() {
  const {
    data: { data } = {},
    error,
    isLoading,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ['settings'],
  });

  const settings = data?.at(0);

  return { settings, error, isLoading };
}
