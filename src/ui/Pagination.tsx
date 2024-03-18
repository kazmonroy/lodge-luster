import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import styles from './styles/Pagination.module.css';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

interface Props {
  count: number;
}

function Pagination({ count }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', next.toString());
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', prev.toString());
    setSearchParams(searchParams);
  };

  if (pageCount <= 1) return null;
  return (
    <div className={styles.pagination}>
      <p>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span>{count}</span> results
      </p>

      <div className={styles.buttons}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Prev</span>
        </button>

        <button onClick={nextPage} disabled={currentPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
