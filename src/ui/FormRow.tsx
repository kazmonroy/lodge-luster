import styles from './styles/Form.module.css';
import Label from './Label';

interface Props {
  label?: string;
  error?: string;
  children: JSX.Element;
  direction?: 'row' | 'vertical';
}
function FormRow({ label, error, children, direction = 'row' }: Props) {
  return (
    <div className={direction === 'row' ? styles.formRow : styles.formVertical}>
      {label && <Label htmlFor={children!.props.id} label={label} />}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormRow;
