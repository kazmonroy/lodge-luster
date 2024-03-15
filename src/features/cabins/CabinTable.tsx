import { useCabins } from './hooks/useCabins';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import { Cabin } from '../../services/types/collection';
import Menu from '../../ui/Menu';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('discount') || 'all';
  console.log(query);

  const filteredCabins =
    query === 'with-discount'
      ? cabins?.filter((cabin) => cabin.discount! > 0)
      : query === 'no-discount'
      ? cabins?.filter((cabin) => cabin.discount! === 0)
      : cabins;

  if (isLoading) return <Spinner />;
  return (
    <Menu>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins!}
          render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menu>
  );
}

export default CabinTable;
