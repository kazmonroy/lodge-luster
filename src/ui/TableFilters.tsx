import { useSearchParams } from 'react-router-dom';
import styles from './styles/TableFilters.module.css';
import { Options } from '../features/cabins/CabinTableFilters';
import { useUrl } from '../hooks/useUrl';

interface Props {
  filterField: string;
  filterOptions: Options[];
}

function TableFilters({ filterField, filterOptions }: Props) {
  const [searchParams] = useSearchParams();
  const { handleUrlEvent } = useUrl();
  const currentFilter = searchParams.get(filterField) || filterOptions.at(0);

  const handleClick = (value: string) => {
    handleUrlEvent({ value, field: filterField });
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
