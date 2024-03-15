import Button from './Button';
import FormRow from './FormRow';
import Row from './Row';

interface Props {
  onCloseModal?: () => void;
  onConfirm: () => void;
  cabinName: string;
}

function ConfirmDelete({ onCloseModal, onConfirm, cabinName }: Props) {
  return (
    <div>
      <Row>
        <p>
          This will permanently delete {cabinName}'s information. This action
          cannot be undone.
        </p>
      </Row>

      <FormRow>
        <>
          <Button style='secondary' onClick={onCloseModal}>
            Cancel
          </Button>
          <Button style='danger' onClick={onConfirm}>
            Delete
          </Button>
        </>
      </FormRow>
    </div>
  );
}

export default ConfirmDelete;
