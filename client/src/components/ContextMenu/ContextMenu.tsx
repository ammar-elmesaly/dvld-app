import Button from '../Button/Button';
import styles from './ContextMenu.module.css';
import { RowActionDef } from '../../types/table';

interface ContextMenuProps<RowType, RowActionType> {
  row: RowType;
  rowActions: RowActionDef<RowType, RowActionType>[];
}

export default function ContextMenu<RowType, RowActionType>({ row, rowActions }: ContextMenuProps<RowType, RowActionType>) {
  return (
    <div className={styles.menu}>
      {rowActions.map(action => (
        <Button
          key={`${action.type}`}
          onClick={() => action.handler(row)}
        >
          {`${action.type}`}
        </Button>
      ))}
    </div>
  );
}
