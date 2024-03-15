import AddCabin from '../features/cabins/AddCabin';
import CabinTable from '../features/cabins/CabinTable';
import CabinTableFilters from '../features/cabins/CabinTableFilters';
import Row from '../ui/Row';

function Cabins() {
  return (
    <>
      <Row direction='horizontal'>
        <h2>All Cabins</h2>

        <Row direction='horizontal' gap={2}>
          <CabinTableFilters />
          <AddCabin />
        </Row>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
