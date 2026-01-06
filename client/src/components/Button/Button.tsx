import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconLeft?: string;
    iconRight?: string;
    icon?: string;
    color?: string;
    children?: ReactNode;
}


export function Button({
    iconLeft,
    iconRight,
    icon,
    className = '',
    color = '',
    children,
    ...rest
}: ButtonProps) {
    return (
        <button className={`${color} ${className} ${styles.button}`} {...rest}>
            {iconLeft && <i className={`bi bi-${iconLeft} ${styles.iconLeft}`} />}
            {/* if icon exists, don't render children */}
            { icon ? <i className={`bi bi-${icon}`}></i> : children }
            {iconRight && <i className={`bi bi-${iconRight} ${styles.iconRight}`} />}
        </button>
    );
}


export default Button;