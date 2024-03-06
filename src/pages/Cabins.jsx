import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../services/apiCabins';

function Cabins() {
  const { data, isLoading } = useQuery({
    queryFn: getCabins,
    queryKey: ['cabins'],
  });

  console.log(data);
  if (isLoading) return <p>is loading...</p>;
  return <div>Cabins!</div>;
}

export default Cabins;
