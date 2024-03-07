import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Cabin } from '../../services/types/collection';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import styles from '../../ui/styles/Form.module.css';

interface Props {
  cabinToEdit: Cabin | {};
}

function CreateCabinForm({ cabinToEdit = {} }: Props) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Cabin>({
    defaultValues: isEditSession ? editValues : {},
  });
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    queryKey: ['cabins'],
    onSuccess: () => {
      queryClient.invalidateQueries(['cabins']);
      toast.success('New cabin successfully created!');
      reset();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const onSubmit: SubmitHandler<Cabin> = (data) => {
    mutate({ ...data, image: data.image![0]! });
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
          disabled={isCreating}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label='Max capacity' error={errors?.maxCapacity?.message}>
        <input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
        <textarea
          id='description'
          disabled={isCreating}
          {...register('description')}
        />
      </FormRow>
      <FormRow label='Cabin image' error={errors?.image?.message}>
        <input
          id='image'
          disabled={isCreating}
          type='file'
          accept='image/*'
          {...register('image')}
        />
      </FormRow>

      <FormRow>
        <>
          <Button style='secondary' type='reset'>
            Cancel
          </Button>
          <Button disabled={isCreating}>
            {isEditSession ? 'Save changes' : 'Create cabin'}
          </Button>
        </>
      </FormRow>
    </form>
  );
}

export default CreateCabinForm;
