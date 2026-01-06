import { Dispatch, SetStateAction, TableHTMLAttributes } from "react";
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
}

export default function Table<RowType, RowActionType>({ data, filterBy = '', filterValue = '', rowActions, openMenuRow, setOpenMenuRow, ...rest }: TableProps<RowType, RowActionType>) {
  const filteredData = filterData(data, filterBy, filterValue);

  if (filteredData.length === 0) {
    return <p>No data to show.</p>
  }

  const headers = Object.keys(data[0]);

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table} {...rest}>
          <thead>
            <tr>
              { rowActions && <th />}
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => {
              const rowKey = `${row.id ?? index}`;

              return (
                <tr key={rowKey} onContextMenu={(e) => {
                  if (!setOpenMenuRow) return;

                  e.stopPropagation();
                  e.preventDefault();
                  setOpenMenuRow(
                    openMenuRow === rowKey ? null : rowKey
                  );
                }}
                >
                  {rowActions &&
                    (
                    <td className={styles.actionCell}>
                      {openMenuRow === rowKey && (
                        <ContextMenu row={filteredData[index]} rowActions={rowActions} />
                        )}
                    </td> 
                    )
                  }
                  {headers.map((header) => (
                    <td key={header}>{String(row[header])}</td>
                  ))}
              </tr>
            )})}
          </tbody>

        </table>
      </div>
      <div># Records: {filteredData.length}</div>
    </>
  );
}

function filterData(data: Record<string, unknown>[], filterBy: string, filterValue: string) {
  if (!data) return [];

  try {
    const regex = new RegExp(filterValue, 'i');
    const filteredData = filterBy === '' ? data : data.filter(record => {
      return regex.test(`${record[filterBy]}`);
    });
    return filteredData;

  } catch (e) {
    return [];
  }

}