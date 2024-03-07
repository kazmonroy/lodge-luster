import styles from './styles/Form.module.css';

interface Props {
  id: string;
}
function FileInput({ id }: Props) {
  return (
    <input id={id} type='file' accept='image/*' className={styles.fileInput} />
  );
}

export default FileInput;
