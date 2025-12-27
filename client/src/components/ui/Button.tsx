import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconLeft?: string;
  iconRight?: string;
  color?: string;
  children: ReactNode;
}


export function Button({
  iconLeft,
  iconRight,
  className = '',
  color = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`${color} ${className}`} {...rest}>
      {iconLeft && <i className={`bi bi-${iconLeft}`} />}
      {children}
      {iconRight && <i className={`bi bi-${iconRight}`} />}
    </button>
  );
}


export default Button;