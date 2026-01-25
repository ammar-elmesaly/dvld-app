import { RowActionDef } from '../../types/table';
import { useEffect } from 'react';
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const menu = document.getElementById('context-menu-portal');
      if (menu && !menu.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return createPortal(
    <div
      id="context-menu-portal"
      className={styles.menu}
      style={{ top: position.y, left: position.x }}
    >
      {rowActions.map(action => {
        // Calculates disabled state using a predicate defined in RowActionDef
        const isBtnDisabled = action.isDisabled ? action.isDisabled(row) : false;

        return (
          <Button
            key={`${action.type}`}
            disabled={isBtnDisabled}
            onClick={() => {
              if (isBtnDisabled) return;  // just to be safe :)
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
