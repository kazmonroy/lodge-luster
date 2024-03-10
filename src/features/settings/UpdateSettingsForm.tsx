import { useForm } from 'react-hook-form';
import styles from '../../ui/styles/Form.module.css';
import FormRow from '../../ui/FormRow';
import { useSettings } from './hooks/useSettings';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const {
    register,
    formState: { errors },
  } = useForm({ defaultValues: settings });

  console.log('settings', settings);

  if (isLoading) return <Spinner />;

  return (
    <form className={`${styles.form} ${styles.regular}`}>
      <FormRow
        label='Min Booking Length'
        error={errors?.minBookingLength?.message}
      >
        <input
          type='number'
          id='minBookingLength'
          {...register('minBookingLength', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow
        label='Max Booking Length'
        error={errors?.minBookingLength?.message}
      >
        <input
          type='number'
          id='maxBookingLength'
          {...register('maxBookingLength', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow
        label='Max Guests per Booking'
        error={errors?.maxGuestsPerBooking?.message}
      >
        <input
          type='number'
          id='maxGuestsPerBooking'
          {...register('maxGuestsPerBooking', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label='Breaskfast price' error={errors?.breakfastPrice?.message}>
        <input
          type='number'
          id='breakfastPrice'
          {...register('breakfastPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>
    </form>
  );
}

export default UpdateSettingsForm;
