import { useSearchParams } from 'react-router-dom';

interface Props {
  field: string;
  value?: string;
}

export function useUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleUrlEvent = ({ field, value }: Props) => {
    searchParams.set(field, value!);
    setSearchParams(searchParams);
  };

  return { handleUrlEvent };
}
