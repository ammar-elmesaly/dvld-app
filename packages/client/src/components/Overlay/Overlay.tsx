import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Overlay.module.css";

interface OverlayProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    zindex?: number;
}

export default function Overlay({ open, onClose, children, zindex = 9999 }: OverlayProps) {
    if (!open) return null;

    return createPortal(
        <div className={styles.overlayBackdrop} style={{zIndex: zindex}} onClick={onClose}>
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
