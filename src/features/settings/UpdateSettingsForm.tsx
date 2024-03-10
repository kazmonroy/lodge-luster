import { useForm } from 'react-hook-form';
import styles from '../../ui/styles/Form.module.css';
import FormRow from '../../ui/FormRow';
import { useSettings } from './hooks/useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './hooks/useUpdateSetting';
import { ChangeEvent } from 'react';
import { Settings } from '../../services/types/collection';

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const {
    register,
    formState: { errors },
  } = useForm({ defaultValues: settings });

  const { updateSetting, isUpdating } = useUpdateSetting();

  const handleuUpdate = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value } as Settings);
  };

  if (isLoading || isUpdating) return <Spinner />;

  return (
    <form className={`${styles.form} ${styles.regular}`}>
      <FormRow
        label='Min Booking Length'
        error={errors?.minBookingLength?.message}
      >
        <input
          type='number'
          id='minBookingLength'
          disabled={isUpdating}
          {...register('minBookingLength', {
            required: 'This field is required',
            onBlur: (e: ChangeEvent<HTMLInputElement>) =>
              handleuUpdate(e, 'minBookingLength'),
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
          disabled={isUpdating}
          {...register('maxBookingLength', {
            required: 'This field is required',
            onBlur: (e: ChangeEvent<HTMLInputElement>) =>
              handleuUpdate(e, 'maxBookingLength'),
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
          disabled={isUpdating}
          {...register('maxGuestsPerBooking', {
            required: 'This field is required',
            onBlur: (e: ChangeEvent<HTMLInputElement>) =>
              handleuUpdate(e, 'maxGuestsPerBooking'),
          })}
        />
      </FormRow>
      <FormRow label='Breaskfast price' error={errors?.breakfastPrice?.message}>
        <input
          type='number'
          id='breakfastPrice'
          disabled={isUpdating}
          {...register('breakfastPrice', {
            required: 'This field is required',
            onBlur: (e: ChangeEvent<HTMLInputElement>) =>
              handleuUpdate(e, 'breakfastPrice'),
          })}
        />
      </FormRow>
    </form>
  );
}

export default UpdateSettingsForm;
