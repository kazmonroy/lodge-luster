import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../ui/Button';

import FormRow from '../../ui/FormRow';
import { useUser } from './hooks/useUser';

interface UserData {
  email: string;
  fullName: string;
  avatar: string;
}

function UpdateUserForm() {
  const { user } = useUser();
  const initialData = {
    email: user?.email,
    avatar: user?.user_metadata.avatar,
    fullName: user?.user_metadata.fullName,
  };

  const { register, handleSubmit } = useForm<UserData>({
    defaultValues: initialData,
  });

  const onSubmit: SubmitHandler<UserData> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Email address'>
        <input {...register('email')} disabled />
      </FormRow>

      <FormRow label='Full name'>
        <input
          type='text'
          {...register('fullName')}
          id='fullName'
          //   disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Avatar image'>
        <input
          id='image'
          type='file'
          accept='image/*'
          {...register('avatar')}
          //   onChange={(e) => setAvatar(e.target.files[0])}
          //   disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type='reset'
          style='secondary'
          //   disabled={isUpdating}
          //   onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </form>
  );
}

export default UpdateUserForm;
