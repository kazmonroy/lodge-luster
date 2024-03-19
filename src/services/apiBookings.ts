import { PAGE_SIZE } from '../utils/constants';
import { supabase } from './supabase-client';

interface BookingsProps {
  filter: { field: string; value: string } | null;
  sortBy?: { field: string; direction: string };
  page: number;
}
export async function getBookings({ filter, sortBy, page }: BookingsProps) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
      { count: 'exact' }
    );

  // FILTER
  if (filter !== null) query = query.eq(filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }
  return { data, count };
}

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be loaded');
  }

  return data;
}

export async function updateBooking(
  id: string,
  obj: {
    status: string;
    isPaid: boolean;
    extrasPrice?: number;
    totalPrice?: number;
  }
) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  return data;
}
