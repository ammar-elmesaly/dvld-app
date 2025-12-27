import { ButtonHTMLAttributes } from "react";
import styles from './Table.module.css';

interface TableProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    data: Record<string, unknown>[];
}

export default function Table({ data }: TableProps) {

    if (!data || data.length === 0) {
        return <p>No data available</p>;
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
                    {data.map((row, index) => (
                        <tr key={`${row.id || index}`}>
                            {headers.map((header) => (
                                <td key={header}>{`${row[header]}`}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div># Records: {data.length}</div>
        </>
    );
}
