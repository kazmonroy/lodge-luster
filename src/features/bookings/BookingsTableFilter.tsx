import Row from '../../ui/Row';
import SortBy from '../../ui/SortBy';
import TableFilters from '../../ui/TableFilters';

export interface Options {
  value: string;
  label: string;
}
function BookingsTableFilter() {
  // TODO write a JSON config file
  const filterField = 'status';
  const filterOptions: Options[] = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Checked Out',
      value: 'checked-out',
    },
    {
      label: 'Checked In',
      value: 'checked-in',
    },
    {
      label: 'Unconfirmed',
      value: 'unconfirmed',
    },
  ];

  const sortByOptions: Options[] = [
    { value: 'startDate-asc', label: 'Sort by Date (recent first)' },
    { value: 'startDate-desc', label: 'Sort by Date (earlier first)' },
    { value: 'status-asc', label: 'Sort by Status (A-Z)' },
    { value: 'status-desc', label: 'Sort by Status (Z-A)' },
    { value: 'totalPrice-asc', label: 'Sort by Amount (low first)' },
    { value: 'totalPrice-desc', label: 'Sort by Amount (high first)' },
  ];
  return (
    <Row direction='horizontal' gap={2}>
      <TableFilters filterField={filterField} filterOptions={filterOptions} />
      <SortBy sortByOptions={sortByOptions} />
    </Row>
  );
}

export default BookingsTableFilter;
