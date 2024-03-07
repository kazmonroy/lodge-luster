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
      <FormRow label='Cabin name'>
        <input type='text' id='name' {...register('name')} />
      </FormRow>
      <FormRow label='Max capacity'>
        <input type='number' id='maxCapacity' {...register('maxCapacity')} />
      </FormRow>
      <FormRow label='Regular price'>
        <input type='number' id='regularPrice' {...register('regularPrice')} />
      </FormRow>
      <FormRow label='Discount'>
        <input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount')}
        />
      </FormRow>
      <FormRow label='Description'>
        <textarea id='description' {...register('description')} />
      </FormRow>
      <FormRow label='Cabin image'>
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
