import styles from './styles/Form.module.css';

interface Props {
  id: string;
  disabled?: boolean;
}
function Textarea({ id, disabled = false }: Props) {
  return (
    <textarea
      id={id}
      disabled={disabled}
      className={styles.textarea}
    ></textarea>
  );
}

export default Textarea;
