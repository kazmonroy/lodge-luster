import styles from './styles/FormHeader.module.css';

interface Props {
  header: string;
  description: string;
}

function FormHeader({ header, description }: Props) {
  return (
    <div className={styles.formHeader}>
      <h4>{header}</h4>
      <p>{description}</p>
    </div>
  );
}

export default FormHeader;
