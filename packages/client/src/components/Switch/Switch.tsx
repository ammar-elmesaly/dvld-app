import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import styles from './Switch.module.css';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  isOn: boolean;
  handleToggle: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  iconLeft?: string;
  iconRight?: string;
  inline?: boolean;
}

export function Switch({
  isOn,
  handleToggle,
  id,
  label,
  disabled = false,
  iconLeft,
  iconRight,
  className = '',
  color = '',
  inline = false,
  ...rest
}: SwitchProps) {
  return (
    <label className={`${styles.switch} ${className} ${disabled ? styles.disabled : ''}`} htmlFor={id} style={{ display: inline ? 'inline' : 'block' }}>
      {iconLeft && <i className={`bi bi-${iconLeft} ${styles.iconLeft}`} />}
      {label && <span className={styles.label}>{label}</span>}

      <input
        className={`${styles.input} ${color}`}
        id={id}
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
        disabled={disabled}
        {...rest}
      />
      <span className={styles.slider} />

      {iconRight && <i className={`bi bi-${iconRight} ${styles.iconRight}`} />}
    </label>
  );
}

export default Switch;