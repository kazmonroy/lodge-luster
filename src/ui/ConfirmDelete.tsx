import Button from './Button';
import FormRow from './FormRow';
import Row from './Row';

interface Props {
  onCloseModal?: () => void;
  onConfirm: () => void;
  itemName: string | number;
  disabled?: boolean;
}

function ConfirmDelete({ onCloseModal, onConfirm, itemName, disabled }: Props) {
  return (
    <div>
      <Row>
        <p>
          This will permanently delete {itemName}'s information. This action
          cannot be undone.
        </p>
      </Row>

      <FormRow>
        <>
          <Button style='secondary' onClick={onCloseModal} disabled={disabled}>
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
