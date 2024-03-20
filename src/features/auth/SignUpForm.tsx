import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import styles from '../../ui/styles/Form.module.css';
import Button from '../../ui/Button';

interface SignUp {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
function SignUpForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<SignUp>();

  const onSubmit = (data: SignUp) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.form} ${styles.regular}`}
    >
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <input
          type='text'
          id='fullName'
          //   disabled={isUpdating}
          {...register('fullName', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label='Email' error={errors?.email?.message}>
        <input
          type='email'
          id='email'
          //   disabled={isUpdating}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email',
            },
          })}
        />
      </FormRow>
      <FormRow label='Password' error={errors?.password?.message}>
        <input
          type='password'
          id='password'
          //   disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password should be 8 characters long',
            },
          })}
        />
      </FormRow>
      <FormRow
        label='Confirm Password'
        error={errors?.confirmPassword?.message}
      >
        <input
          type='password'
          id='confirmPassword'
          //   disabled={isUpdating}
          {...register('confirmPassword', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || `Passwords don't match`,
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button style='secondary'>Cancel</Button>
          <Button>Create new user</Button>
        </>
      </FormRow>
    </form>
  );
}

export default SignUpForm;
