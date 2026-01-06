import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Overlay.module.css";

interface OverlayProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Overlay({ open, onClose, children }: OverlayProps) {
    if (!open) return null;

    return createPortal(
        <div className={styles.overlayBackdrop} onClick={onClose}>
            <div
                className={styles.overlayWindow}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}
