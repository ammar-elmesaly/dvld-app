import { Dispatch, SelectHTMLAttributes, SetStateAction } from 'react';
import styles from './Filter.module.css';

interface FilterProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: string[];
    filterBy: string;
    setFilterBy: Dispatch<SetStateAction<string>>;
    setFilterValue: Dispatch<SetStateAction<string>>;
}

export default function Filter({ options, filterBy, setFilterBy, setFilterValue }: FilterProps) {

    const onChangeFilterBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterBy(event.target.value);
    }

    const onChangeFilterValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
    }

    return (
        <div className='filterWrapper'>
            <span>Filter by:</span>
            <select className={styles.select} defaultValue="" onChange={onChangeFilterBy}>
                <option key="" value="">none</option>
                {options.map(option => (<option key={option} value={option}>{option}</option>))}
            </select>
            {
            filterBy !== '' &&
            <input className={styles.input} onChange={onChangeFilterValue} placeholder='Find (regex is supported)'/>
            }
        </div>
    );
}