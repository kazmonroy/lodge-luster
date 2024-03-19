import styles from './styles/Checkbox.module.css';

interface Props {
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
  id: string;
  children: JSX.Element;
}

function Checkbox({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}: Props) {
  return (
    <div className={styles.checkbox}>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ''}>{children}</label>
    </div>
  );
}

export default Checkbox;
