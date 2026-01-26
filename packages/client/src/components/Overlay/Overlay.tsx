import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Overlay.module.css";

interface OverlayProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    zindex?: number;
    maxHeight?: string;
}

export default function Overlay({ open, onClose, children, zindex = 9999, maxHeight = '90vh' }: OverlayProps) {
    if (!open) return null;

    return createPortal(
        <div className={styles.overlayBackdrop} style={{zIndex: zindex }} onClick={onClose}>
            <div
                className={styles.overlayWindow}
                style={{ maxHeight }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}
