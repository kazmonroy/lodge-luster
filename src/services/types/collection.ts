import { Database } from './supabase';

export type Cabin = Database['public']['Tables']['cabins']['Row'];
export type Settings = Database['public']['Tables']['settings']['Row'];
export type Guest = Database['public']['Tables']['guests']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
