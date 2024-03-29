import { Database, Tables } from './supabase';

export type Cabin = Tables<'cabins'>;
export type Settings = Tables<'settings'>;
export type Guest = Database['public']['Tables']['guests']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
