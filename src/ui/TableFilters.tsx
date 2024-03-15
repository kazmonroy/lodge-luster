import { useSearchParams } from 'react-router-dom';
import styles from './styles/TableFilters.module.css';
import { Options } from '../features/cabins/CabinTableFilters';

interface Props {
  filterField: string;
  filterOptions: Options[];
}

function TableFilters({ filterField, filterOptions }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || filterOptions.at(0);

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };
  return (
    <div className={styles.wrapper}>
      {filterOptions.map((option) => (
        <button
          key={option.value}
          className={`${styles.filter} ${
            currentFilter === option.value && styles.active
          }`}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default TableFilters;
