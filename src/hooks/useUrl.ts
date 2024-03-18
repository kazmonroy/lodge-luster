import { useSearchParams } from 'react-router-dom';

interface Props {
  field: string;
  value?: string;
}

export function useUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleUrlEvent = ({ field, value }: Props) => {
    if (searchParams.get('page') !== null) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }

    searchParams.set(field, value!);
    setSearchParams(searchParams);
  };

  return { handleUrlEvent };
}
