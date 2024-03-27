import { supabase, supabaseUrl } from './supabase-client';

interface Login {
  email: string;
  password: string;
}

interface UpdateUser {
  fullName: string;
  password: string;
  avatar: string;
}

export interface SignUp {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export async function signup({ fullName, email, password }: SignUp) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error('Something went wrong while signing up');
  }
  return data;
}

export async function login({ email, password }: Login) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error('Something went wrong while login in');
  }

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

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return null;
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UpdateUser) {
  // 1. Update the password Otfullname

  let updateData = {};

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // 2. Updload the avatar image

  const fileName = `avatar-${data.user.id}-${crypto.randomUUID()}`;

  const { error: imageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar!.image, {
      contentType: 'image/jpeg',
    });

  if (imageError) {
    // await supabase.from('avatars').delete().eq('id', data?.id);
    console.error(imageError);
    throw new Error('Avatr image could not be updated');
  }
  // 3. Update avatar in the user

  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars/` },
    });

  if (updateUserError) {
    throw new Error(updateUserError.message);
  }

  return updatedUser;
}
