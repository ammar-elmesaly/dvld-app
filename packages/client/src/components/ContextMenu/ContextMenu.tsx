import { RowActionDef } from '../../types/table';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import styles from './ContextMenu.module.css';

interface ContextMenuProps<RowType, RowActionType> {
  row: RowType;
  rowActions: RowActionDef<RowType, RowActionType>[];
  onClose: () => void;
  position: { x: number; y: number };
}

export default function ContextMenu<RowType, RowActionType>({
  row,
  rowActions,
  onClose,
  position
}: ContextMenuProps<RowType, RowActionType>) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: position.x, y: position.y });

  useLayoutEffect(() => {
    if (!menuRef.current) return;

    const { offsetWidth, offsetHeight } = menuRef.current;
    const { innerWidth, innerHeight } = window;

    let newX = position.x;
    let newY = position.y;

    // Check if menu overflows the right edge
    if (position.x + offsetWidth > innerWidth) {
      newX = position.x - offsetWidth;
    }

    // Check if menu overflows the bottom edge
    if (position.y + offsetHeight > innerHeight) {
      newY = position.y - offsetHeight;
    }
    
    // Safety check: ensure it doesn't go off the top/left either
    newX = Math.max(5, newX); 
    newY = Math.max(5, newY);

    setCoords({ x: newX, y: newY });
  }, [position]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Using ref instead of ID for better React practices
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return createPortal(
    <div
      ref={menuRef}
      className={styles.menu}
      style={{ 
        top: coords.y, 
        left: coords.x,
        position: 'fixed', // Ensure it's fixed relative to viewport
        visibility: menuRef.current ? 'visible' : 'hidden' // Hide until measured
      }}
    >
      {rowActions.map(action => {
        const isBtnDisabled = action.isDisabled ? action.isDisabled(row) : false;
        return (
          <Button
            key={`${action.type}`}
            disabled={isBtnDisabled}
            onClick={() => {
              if (isBtnDisabled) return;
              action.handler(row);
              onClose();
            }}
          >
            {`${action.type}`}
          </Button>
        );
      })}
    </div>,
    document.body
  );
}