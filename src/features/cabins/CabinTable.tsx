import { useCabins } from './hooks/useCabins';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  if (isLoading) return <Spinner />;
  return (
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr' role='table'>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body>
        {cabins!.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CabinTable;

{
  /* {cabins!.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))} */
}
