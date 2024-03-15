import { useSearchParams } from 'react-router-dom';
import { Options } from '../features/cabins/CabinTableFilters';
import { ChangeEvent } from 'react';
import styles from './styles/SortBy.module.css';
interface Props {
  sortByOptions: Options[];
}

const SORT_KEY = 'sortBy';

function SortBy({ sortByOptions }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get(SORT_KEY) || '';

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set(SORT_KEY, e.target!.value!);
    setSearchParams(searchParams);
  };

  return (
    <select value={sortBy} onChange={handleOnChange} className={styles.select}>
      {sortByOptions.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;
