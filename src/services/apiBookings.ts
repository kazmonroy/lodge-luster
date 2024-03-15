import { supabase } from './supabase-client';

export async function getBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)'
    );

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
