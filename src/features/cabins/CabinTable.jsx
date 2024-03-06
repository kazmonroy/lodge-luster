import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

import styles from './styles/CabinTable.module.css';
import Spinner from '../../ui/Spinner';

function CabinTable() {
  const { data, isLoading } = useQuery({
    queryFn: getCabins,
    queryKey: ['cabins'],
  });

  console.log(data);
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.table} role='table'>
      <div className={styles.tableHeader} role='row'>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </div>
    </div>
  );
}

export default CabinTable;
