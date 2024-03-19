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

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const { data: { user } = {}, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}
