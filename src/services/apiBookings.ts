import { supabase } from './supabase-client';

interface BookingsProps {
  filter: { field: string; value: string } | null;
  sortBy?: { field: string; direction: string };
}
export async function getBookings({ filter, sortBy }: BookingsProps) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)'
    );

  // FILTER
  if (filter !== null) query = query.eq(filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }
  return data;
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    // Filters
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be loaded');
  }

  return data;
}
