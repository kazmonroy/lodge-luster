import Row from '../../ui/Row';
import SortBy from '../../ui/SortBy';
import TableFilters from '../../ui/TableFilters';

export interface Options {
  value: string;
  label: string;
}
function CabinTableFilters() {
  // TODO write a JSON config file
  const filterField = 'discount';
  const filterOptions: Options[] = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'No Discount',
      value: 'no-discount',
    },
    {
      label: 'With Discount',
      value: 'with-discount',
    },
  ];

  const sortByOptions: Options[] = [
    { value: 'name-asc', label: 'Sort by name (A-Z)' },
    { value: 'name-desc', label: 'Sort by name (Z-A)' },
    { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
    { value: 'regularPrice-desc', label: 'Sort by price (high first)' },
    { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
    { value: 'maxCapacity-desc', label: 'Sort by capacity (high first)' },
  ];
  return (
    <Row direction='horizontal' gap={2}>
      <TableFilters filterField={filterField} filterOptions={filterOptions} />
      <SortBy sortByOptions={sortByOptions} />
    </Row>
  );
}

export default CabinTableFilters;
