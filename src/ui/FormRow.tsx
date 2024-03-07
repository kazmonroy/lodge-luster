import styles from './styles/Form.module.css';
import Label from './Label';

interface Props {
  label?: string;
  error?: string;
  children: JSX.Element;
}
function FormRow({ label, error, children }: Props) {
  return (
    <div className={styles.formRow}>
      {label && <Label htmlFor={children!.props.id} label={label} />}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormRow;
