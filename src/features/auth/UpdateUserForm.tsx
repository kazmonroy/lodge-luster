import Button from '../../ui/Button';

import FormRow from '../../ui/FormRow';

function UpdateUserForm() {
  return (
    <form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <input value={email} disabled />
      </FormRow>

      <FormRow label='Full name'>
        <input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Avatar image'>
        <input
          id='image'
          type='file'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
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
