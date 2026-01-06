import Button from '../Button/Button';
import styles from './ContextMenu.module.css';
import { RowActionDef } from '../../types/table';
import { useEffect, useRef } from 'react';

interface ContextMenuProps<RowType, RowActionType> {
  row: RowType;
  rowActions: RowActionDef<RowType, RowActionType>[];
  onClose: () => void;
}

export default function ContextMenu<RowType, RowActionType>({ row, rowActions, onClose }: ContextMenuProps<RowType, RowActionType>) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

  
  return (
    <div ref={menuRef} className={styles.menu}>
      {rowActions.map(action => (
        <Button
          key={`${action.type}`}
          onClick={() => {
            action.handler(row);
            onClose();
          }}
        >
          {`${action.type}`}
        </Button>
      ))}
    </div>
  );
}
