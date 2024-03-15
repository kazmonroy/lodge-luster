import Table from '../../ui/Table';
import { Booking } from '../../services/types/collection';
import StackedCell from '../../ui/StackedCell';
import Tag from '../../ui/Tag';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import { format, isToday } from 'date-fns';
import Spinner from '../../ui/Spinner';

function BookingRow({ booking }: { booking: Booking }) {
  const {
    cabins: { name: cabinName },
    guests: { fullName, email },
    id: bookingId,
    status,
    totalPrice,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    hasBreakfast,
    isPaid,
  } = booking;

  if (!booking) return <Spinner />;
  const statusToTagName: { [field: keyof Booking]: string } = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Table.Row key={bookingId}>
        <div>{cabinName}</div>
        <StackedCell>
          <span>{fullName}</span>
          <span>{email}</span>
        </StackedCell>
        <StackedCell>
          <span>
            {isToday(new Date(startDate!))
              ? 'Today'
              : formatDistanceFromNow(startDate!)}{' '}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate!), 'MMM dd yyyy')} &mdash;{' '}
            {format(new Date(endDate!), 'MMM dd yyyy')}
          </span>
        </StackedCell>
        <Tag type={statusToTagName[status]}>{status}</Tag>
        <div>{formatCurrency(totalPrice!)}</div>
        {/* <div className={styles.price}>{formatCurrency(regularPrice!)}</div>
        {discount ? (
          <div className={styles.discount}>{formatCurrency(discount)}</div>
        ) : (
          <span>&mdash;</span>
        )} */}
        {/* <div>
        <Modal>
          <Menu.Content>
            <Menu.Toggle id={cabinId!} />
            <Menu.List id={cabinId!}>
              <Menu.Button
                icon={<HiOutlineClipboardDocument />}
                onClick={() => handleDuplicate()}
              >
                Duplicate
              </Menu.Button>

              <Modal.Open opens='cabin-edit'>
                <Menu.Button icon={<HiOutlinePencilSquare />}>
                  Edit
                </Menu.Button>
              </Modal.Open>

              <Modal.Open opens='cabin-delete'>
                <Menu.Button icon={<HiXMark />}>Delete</Menu.Button>
              </Modal.Open>
            </Menu.List>

            <Modal.Window name='cabin-edit' title={`Edit cabin ${name}`}>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name='cabin-delete' title={`Delete cabin ${name}`}>
              <ConfirmDelete
                cabinName={name!}
                onConfirm={() => handleDelete(cabinId!)}
              />
            </Modal.Window>
          </Menu.Content>
        </Modal>
      </div> */}
      </Table.Row>
    </>
  );
}

export default BookingRow;
