import { useForm } from 'react-hook-form';
import FormHeader from '../../ui/FormHeader';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import useUpdateUser from './hooks/useUpdateUser';
import { UpdateUser } from '../../services/apiAuth';

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<UpdateUser>({
    defaultValues: {
      password: '',
    },
  });
  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit = ({ password }: UpdateUser) => {
    if (!password) return;
    updateUser(
      {
        password,
      },
      {
        onSuccess: () => reset(),
      }
    );
  };
  return (
    <>
      <FormHeader header='Password' description='Update your password' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label='Password' error={errors?.password?.message}>
          <input
            id='password'
            {...register('password', { required: 'This field is required' })}
            type='password'
          />
        </FormRow>
        <FormRow
          label='Confirm password'
          error={errors?.confirmPassword?.message}
        >
          <input
            id='confirmPassword'
            {...register('confirmPassword', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues()!.password! || 'Passwords do not match',
            })}
            type='password'
          />
        </FormRow>

        <FormRow>
          <Button style='secondary' disabled={isUpdating} type='reset'>
            Cancel
          </Button>
          <Button>Update password</Button>
        </FormRow>
      </form>
    </>
  );
}

export default UpdatePasswordForm;
