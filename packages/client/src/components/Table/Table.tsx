import { Dispatch, SetStateAction, TableHTMLAttributes, useState } from "react";
import styles from './Table.module.css';
import ContextMenu from "../ContextMenu/ContextMenu";
import { RowActionDef } from "../../types/table";

interface TableProps<RowType, RowActionType> extends TableHTMLAttributes<HTMLTableElement> {
  data: Record<string, unknown>[];
  filterBy?: string;
  filterValue?: string;
  rowActions?: RowActionDef<RowType, RowActionType>[];
  openMenuRow: string | null;
  setOpenMenuRow?: Dispatch<SetStateAction<string | null>>;
  ignoreColumns?: string[];
}

export default function Table<RowType, RowActionType>({
  data,
  filterBy = '',
  filterValue = '',
  rowActions,
  openMenuRow,
  setOpenMenuRow,
  ignoreColumns,
  ...rest
}: TableProps<RowType, RowActionType>) {

  const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const filteredData = filterData(data, filterBy, filterValue);

  if (!filteredData.length) return <p>No data to show.</p>;

  const headers = Object.keys(data[0]).filter(header => !ignoreColumns?.includes(header));
  
  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table} {...rest}>
          <thead>
            <tr>
              {rowActions && <th />}
              {headers.map(header =><th key={header}>{header}</th>)}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, index) => {
              const rowKey = `${row.id ?? index}`;

              const handleContextMenu = (e: React.MouseEvent<HTMLTableRowElement>) => {
                if (!setOpenMenuRow) return;
                e.preventDefault();
                e.stopPropagation();
                setOpenMenuRow(openMenuRow === rowKey ? null : rowKey);
                setMenuPosition({ x: e.clientX, y: e.clientY });
              };

              return (
                <tr key={rowKey} onContextMenu={handleContextMenu}>
                  {rowActions && (
                    <td className={styles.actionCell}>
                      {openMenuRow === rowKey && (
                        <ContextMenu
                          row={row as unknown as RowType}
                          rowActions={rowActions}
                          position={menuPosition}
                          onClose={() => setOpenMenuRow?.(null)}
                        />
                      )}
                    </td>
                  )}

                  {headers.map(header => (
                    <td key={header}>{String(row[header] ?? '')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div># Records: {filteredData.length}</div>
    </>
  );
}

// ---------------- Helper ----------------

function filterData(data: Record<string, unknown>[], filterBy: string, filterValue: string) {
  if (!data) return [];

  try {
    const regex = new RegExp(filterValue, 'i');
    if (!filterBy) return data;

    return data.filter(record => regex.test(String(record[filterBy] ?? '')));
  } catch {
    return [];
  }
}
