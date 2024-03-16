import { useCabins } from './hooks/useCabins';
import { Cabin } from '../../services/types/collection';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Menu from '../../ui/Menu';

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  const filterQuery = searchParams.get('discount') || 'all';
  const sortByQuery = searchParams.get('sortBy') || 'name-asc';

  if (isLoading) return <Spinner />;
  // Filter
  const filteredCabins =
    filterQuery === 'with-discount'
      ? cabins?.filter((cabin) => cabin.discount! > 0)
      : filterQuery === 'no-discount'
      ? cabins?.filter((cabin) => cabin.discount! === 0)
      : cabins;

  // Sort
  const [field, direction] = sortByQuery.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortAndFilteredCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

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
          data={sortAndFilteredCabins!}
          render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menu>
  );
}

export default CabinTable;
