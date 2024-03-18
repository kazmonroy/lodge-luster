import { Booking } from '../../services/types/collection';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import { format, isToday } from 'date-fns';
import {
  HiArrowRightOnRectangle,
  HiOutlineIdentification,
  HiXMark,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import Table from '../../ui/Table';
import StackedCell from '../../ui/StackedCell';
import Tag from '../../ui/Tag';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import Menu from '../../ui/Menu';

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

  const Navigate = useNavigate();

  if (!booking) return <Spinner />;

  const statusToTagName: { [field: string]: string } = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const amountSyle = { fontFamily: 'Sono, monospace', textAlign: 'right' };

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
        <Tag type={statusToTagName[status!]}>{status!}</Tag>
        <div style={amountSyle}>{formatCurrency(totalPrice!)}</div>
        {/* <div className={styles.price}>{formatCurrency(regularPrice!)}</div> */}

        <div>
          <Modal>
            <Menu.Content>
              <Menu.Toggle id={bookingId!} />
              <Menu.List id={bookingId!}>
                <Menu.Button
                  icon={<HiOutlineIdentification />}
                  onClick={() => Navigate(`/bookings/${bookingId}`)}
                >
                  See details
                </Menu.Button>

                <Modal.Open opens='cabin-edit'>
                  <Menu.Button icon={<HiArrowRightOnRectangle />}>
                    Check in
                  </Menu.Button>
                </Modal.Open>

                <Modal.Open opens='cabin-delete'>
                  <Menu.Button icon={<HiXMark />}>Delete booking</Menu.Button>
                </Modal.Open>
              </Menu.List>

              <Modal.Window
                name='cabin-delete'
                title={`Delete booking ${bookingId}`}
              >
                <ConfirmDelete
                  itemName={bookingId!}
                  onConfirm={() => console.log(bookingId!)}
                />
              </Modal.Window>
            </Menu.Content>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default BookingRow;
