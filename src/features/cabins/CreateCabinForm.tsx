import { useForm, SubmitHandler } from 'react-hook-form';
import { Cabin } from '../../services/types/collection';
import { useCreateCabin } from './hooks/useCreateCabin';
import { useEditCabin } from './hooks/useEditCabin';
import toast from 'react-hot-toast';

import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import styles from '../../ui/styles/Form.module.css';

interface Props {
  cabinToEdit?: Cabin;
  onCloseModal?: () => void;
}

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }: Props) {
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

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const onSubmit: SubmitHandler<Cabin> = (data) => {
    const imgUpload =
      typeof data.image === 'string' ? data.image : data.image![0];

    if (isEditSession) {
      editCabin(
        { newCabin: { ...data, image: imgUpload }, id: editId },
        {
          onSuccess: () => {
            toast.success(`Cabin ${cabinToEdit.name} successfully edited!`);
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: imgUpload },
        {
          onSuccess: () => {
            toast.success('Cabin successfully created!');
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  const isUpdating = isEditing || isCreating;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.form} ${
        onCloseModal ? styles.modal : styles.regular
      }`}
    >
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <input
          type='text'
          id='name'
          disabled={isUpdating}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label='Max capacity' error={errors?.maxCapacity?.message}>
        <input
          type='number'
          id='maxCapacity'
          disabled={isUpdating}
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
          disabled={isUpdating}
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
          disabled={isUpdating}
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
          disabled={isUpdating}
          {...register('description')}
        />
      </FormRow>
      <FormRow label='Cabin image' error={errors?.image?.message}>
        <input
          id='image'
          disabled={isUpdating}
          type='file'
          accept='image/*'
          {...register('image')}
        />
      </FormRow>

      <FormRow>
        <>
          <Button style='secondary' type='reset' onClick={onCloseModal}>
            Cancel
          </Button>
          <Button disabled={isUpdating}>
            {isEditSession ? 'Save changes' : 'Create cabin'}
          </Button>
        </>
      </FormRow>
    </form>
  );
}

export default CreateCabinForm;
