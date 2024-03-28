import { ReactNode } from 'react';
import styles from './styles/Button.module.css';

interface Props {
  size?: 'small' | 'medium';
  style?: 'primary' | 'secondary' | 'text' | 'danger';
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: (e?: any) => void;
  icon?: JSX.Element;
}
function Button({
  size = 'small',
  style = 'primary',
  children,
  type,
  disabled,
  onClick,
  icon,
}: Props) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[size]} ${styles[style]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

export default Button;
