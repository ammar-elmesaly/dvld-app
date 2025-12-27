import styles from './People.module.css';
import Table from '../Table/Table';
import Button from '../Button/Button';

const data = [
    {
        name: 'Ammar',
        age: 21,
        gender: 'male',
        salary: 4200,
        isActive: true,
        id: 7
    },

    {
        name: 'Ahmed',
        age: 23,
        gender: 'male',
        salary: 2000,
        isActive: false,
        id: 8
    },

    {
        name: 'Salma',
        age: 40,
        gender: 'female',
        salary: 2300,
        isActive: true,
        id: 9
    },

    {   
        name: 'Salma',
        age: 40,
        gender: 'female',
        salary: 2300,
        isActive: true,
        id: 10
    },

    {
        name: 'Salma',
        age: 40,
        gender: 'female',
        salary: 2300,
        isActive: true,
        id: 11
    },

    {
        name: 'Salma',
        age: 40,
        gender: 'female',
        salary: 2300,
        isActive: true,
        id: 12
    }
]

export default function People() {
    return (
        <section className={styles.section}>
        <div className={styles.headerRow}>
            <div className={styles.h1Wrapper}>
                <h1 className={styles.h1}><i className='bi bi-people-fill'></i> Manage People</h1>
            </div>

            <div className={styles.controls}>
                <span>Filter by:</span>
                <select>
                    <option value="">None</option>
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="gender">Gender</option>
                    <option value="salary">Salary</option>
                </select>
                <Button color='success' iconLeft="person-fill-add">Add a user</Button>
            </div>
        </div>

        <Table data={data} />
        
        </section>


    );
}