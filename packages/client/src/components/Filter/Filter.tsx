import { Dispatch, SetStateAction } from 'react';
import styles from './Filter.module.css';

interface FilterProps {
    options: string[];
    filterBy: string;
    filterValue: string;
    setFilterBy: Dispatch<SetStateAction<string>>;
    setFilterValue: Dispatch<SetStateAction<string>>;
    ignoreOptions?: string[];
}


/**
 * Filter is a controlled UI component used to build reusable filtering logic.
 *
 * - `options`: List of available fields to filter by.
 * - `filterBy`: The currently selected field used for filtering.
 * - `filterValue`: The current value entered in the filter input. This state
 *   persists even when the input is mounted or unmounted.
 * - `setFilterBy`: State setter used to update the selected filter field.
 * - `setFilterValue`: State setter used to update the filter input value.
 *
 * Both `filterBy` and `filterValue` should be managed via separate `useState`
 * hooks in the parent component. These values can then be passed to any other
 * component (e.g. a `Table`) to perform the actual filtering logic.
 */
export default function Filter({ options, filterBy, filterValue, ignoreOptions, setFilterBy, setFilterValue }: FilterProps) {

    const onChangeFilterBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterBy(event.target.value);
    }

    const onChangeFilterValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
    }

    const optionsFiltered = options.filter(option => !ignoreOptions?.includes(option));

    return (
        <div className='filterWrapper'>
            <span>Filter by:</span>
            <select className={styles.select} defaultValue="" onChange={onChangeFilterBy}>
                <option key="" value="">none</option>
                {optionsFiltered.map(option => (<option key={option} value={option}>{option}</option>))}
            </select>
            {
            filterBy !== '' &&
            <input className={styles.input} type="text" value={filterValue} onChange={onChangeFilterValue} placeholder='Find (regex is supported)'/>
            }
        </div>
    );
}