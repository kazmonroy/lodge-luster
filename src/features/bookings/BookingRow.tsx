import { Booking } from '../../services/types/collection';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import { format, isToday } from 'date-fns';
import {
  HiArrowLeftOnRectangle,
  HiArrowRightOnRectangle,
  HiOutlineIdentification,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/hooks/useCheckout';
import { useDeleteBooking } from './hooks/useDeleteBooking';

import Table from '../../ui/Table';
import StackedCell from '../../ui/StackedCell';
import Tag from '../../ui/Tag';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import Menu from '../../ui/Menu';

function BookingRow({ booking }: { booking: Booking }) {
  const { checkout } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const {
    cabins: { name: cabinName },
    guests: { fullName, email },
    id: bookingId,
    status,
    totalPrice,
    startDate,
    endDate,
    numNights,
  } = booking!;

  const Navigate = useNavigate();

  if (!booking) return <Spinner />;

  const handleCheckout = () => {
    checkout({ bookingId });
  };

  const handleDeleteBooking = () => {
    deleteBooking(bookingId);
  };

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
                <>
                  {status === 'unconfirmed' && (
                    <Menu.Button
                      icon={<HiArrowRightOnRectangle />}
                      onClick={() => Navigate(`/checkin/${bookingId}`)}
                    >
                      Check in
                    </Menu.Button>
                  )}
                </>
                <>
                  {status === 'checked-in' && (
                    <Menu.Button
                      icon={<HiArrowLeftOnRectangle />}
                      onClick={handleCheckout}
                    >
                      Check out
                    </Menu.Button>
                  )}
                </>

                <Modal.Open opens='booking-delete'>
                  <Menu.Button icon={<HiOutlineTrash />}>
                    Delete booking
                  </Menu.Button>
                </Modal.Open>
              </Menu.List>

              <Modal.Window
                name='booking-delete'
                title={`Delete booking ${bookingId}`}
              >
                <ConfirmDelete
                  itemName={bookingId!}
                  onConfirm={handleDeleteBooking}
                  disabled={isDeletingBooking}
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
