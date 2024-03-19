import { supabase } from './supabase-client';

interface Props {
  email: string;
  password: string;
}

export async function login({ email, password }: Props) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error('Something went wrong while login in');
  }

  console.log(data);

  return data;
}
