import { TableHTMLAttributes } from "react";
import styles from './Table.module.css';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    data: Record<string, unknown>[];
    filterBy: string;
    filterValue: string;
}

export default function Table({ data, filterBy = '', filterValue = ''}: TableProps) {
    const filteredData = filterData(data, filterBy, filterValue);

    if (filteredData.length === 0) {
        return <p>No data to show.</p>
    }
    
    const headers = Object.keys(data[0]);

    return (
        <>
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={`${row.id || index}`}>
                            {headers.map((header) => (
                                <td key={header}>{`${row[header]}`}</td>
                            ))}
                        </tr>
                    ))}
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