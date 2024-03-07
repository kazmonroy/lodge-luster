import { supabase } from './supabase-client';
import { Cabin } from './types/collection';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}
export async function deleteCabin(id:number) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
}

export async function createCabin(cabin:Cabin) {
  const { data, error } = await supabase.from('cabins').insert([
    cabin
  ])
  .select()

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  return data


}
