import { useCabins } from './hooks/useCabins';
import styles from './styles/CabinTable.module.css';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';

function CabinTable() {
  const { cabins, isLoading } = useCabins();

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
      {cabins!.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinTable;
