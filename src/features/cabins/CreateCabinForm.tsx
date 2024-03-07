import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';

import styles from '../../ui/styles/Form.module.css';
import { createCabin } from '../../services/apiCabins';
import { Cabin } from '../../services/types/collection';

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Cabin>();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    queryKey: ['cabins'],
    onSuccess: () => {
      queryClient.invalidateQueries(['cabins']);
      toast.success('cabin created!');
      reset();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const onSubmit: SubmitHandler<Cabin> = (data) => {
    const newCabin = {
      ...data,
      image:
        data.image?.length === 0
          ? 'https://wgjzrjfkwsremzyxnsxm.supabase.co/storage/v1/object/public/cabin-images/cabin-empty.png'
          : data.image,
    };
    mutate(newCabin);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.form} ${styles.regular}`}
    >
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <input
          type='text'
          id='name'
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label='Max capacity' error={errors?.maxCapacity?.message}>
        <input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be more than 1',
            },
          })}
        />
      </FormRow>
      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regular price should be more than 1',
            },
          })}
        />
      </FormRow>
      <FormRow label='Discount' error={errors?.discount?.message}>
        <input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value)! <= Number(getValues()!.regularPrice!) ||
              'Discount should be less than Regular Price',
          })}
        />
      </FormRow>
      <FormRow label='Description' error={errors?.description?.message}>
        <textarea id='description' {...register('description')} />
      </FormRow>
      <FormRow label='Cabin image' error={errors?.image?.message}>
        <input id='image' type='file' accept='image/*' {...register('image')} />
      </FormRow>

      <FormRow>
        <>
          <Button style='secondary' type='reset'>
            Cancel
          </Button>
          <Button disabled={isCreating}>create cabin</Button>
        </>
      </FormRow>
    </form>
  );
}

export default CreateCabinForm;
