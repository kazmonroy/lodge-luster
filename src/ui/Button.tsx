import { ReactNode } from 'react';
import styles from './styles/Button.module.css';

interface Props {
  size?: 'small' | 'medium';
  style?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: () => void;
}
function Button({
  size = 'small',
  style = 'primary',
  children,
  type,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[size]} ${styles[style]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
