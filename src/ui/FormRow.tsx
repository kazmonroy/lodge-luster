import styles from './styles/Form.module.css';
import Label from './Label';
import { ReactNode } from 'react';

interface Props {
  label?: string;
  error?: string;
  children: JSX.Element | JSX.Element[];
  direction?: 'row' | 'vertical';
}
function FormRow({ label, error, children, direction = 'row' }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function hasProps(child: ReactNode): child is React.ReactElement<any> {
    return typeof child === 'object' && 'props' in child!;
  }

  return (
    <div className={direction === 'row' ? styles.formRow : styles.formVertical}>
      {label && (
        <Label
          htmlFor={hasProps(children) && children!.props.id}
          label={label}
        />
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormRow;
