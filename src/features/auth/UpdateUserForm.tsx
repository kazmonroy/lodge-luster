import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateUser } from '../../services/apiAuth';
import { useUser } from './hooks/useUser';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';

import useUpdateUser from './hooks/useUpdateUser';
import FormHeader from '../../ui/FormHeader';

function UpdateUserForm() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const initialData = {
    email: user?.email,
    avatar: user?.user_metadata.avatar,
    fullName: user?.user_metadata.fullName,
  };

  const { register, handleSubmit, setValue } = useForm<UpdateUser>({
    defaultValues: initialData,
  });

  const onSubmit: SubmitHandler<UpdateUser> = (data) => {
    const imgUpload =
      typeof data.avatar === 'string' ? data.avatar : data.avatar![0];
    updateUser({ ...data, avatar: imgUpload });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setValue('fullName', user?.user_metadata.fullName);
    setValue('avatar', user?.user_metadata.avatar);
  };

  return (
    <>
      <FormHeader
        header='Personal Information'
        description='This information will be displayed publicly so be careful what you share

'
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label='Email address'>
          <input {...register('email')} disabled />
        </FormRow>

        <FormRow label='Full name'>
          <input
            type='text'
            {...register('fullName')}
            id='fullName'
            disabled={isUpdating}
          />
        </FormRow>

        <FormRow label='Avatar image'>
          <input
            id='image'
            type='file'
            accept='image/*'
            {...register('avatar')}
            disabled={isUpdating}
          />
        </FormRow>

        <FormRow>
          <Button
            style='secondary'
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button>Update information</Button>
        </FormRow>
      </form>
    </>
  );
}

export default UpdateUserForm;
