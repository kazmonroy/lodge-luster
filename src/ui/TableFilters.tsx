import { useSearchParams } from 'react-router-dom';
import styles from './styles/TableFilters.module.css';

interface Props {
  filterField: string;
  filterOptions: { label: string; value: string }[];
}

function TableFilters({ filterField, filterOptions }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || filterOptions.at(0);
  console.log(currentFilter);

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };
  return (
    <div className={styles.wrapper}>
      {filterOptions.map((opt) => (
        <button
          key={opt.value}
          className={`${styles.filter} ${
            currentFilter === opt.value && styles.active
          }`}
          onClick={() => handleClick(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default TableFilters;
