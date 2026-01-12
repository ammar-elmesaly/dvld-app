import { getPersonById } from '../../api/person/person';
import Button from '../Button/Button';
import Filter from '../Filter/Filter';
import PersonInformation from '../PersonInformation/PersonInformation';
import styles from './AddUserForm.module.css';
import { useState } from 'react';

export default function AddUserForm() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [person, setPerson] = useState(undefined);

  return (
    <form action='/user/new' method='POST' className={styles.form}>
      <div className={styles.headerRow}>
        <h1>Add New User</h1>
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.fieldsContainer}>
          <div className={styles.filterRow}>
            <Filter
            options={['id', 'username']}
            filterBy={filterBy}
            filterValue={filterValue}
            setFilterBy={setFilterBy}
            setFilterValue={setFilterValue}
            />
            <Button color='primary' icon='search' type='button'
            onClick={() => searchPerson(filterBy, filterValue, setPerson)}
            />
            <Button color='success' icon='link' type='button' />
          </div>
          <div className={styles.personInfoRow}>
            <PersonInformation person={person}/>
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <Button color='success' iconLeft='floppy-fill'>Save</Button>
      </div>
    </form>
  );
}

async function searchPerson(
  filterBy: string,
  filterValue: string,
  setPerson: React.Dispatch<React.SetStateAction<undefined>>
) {
  switch (filterBy) {
    case "id": {
      const personId = Number(filterValue);

      if (!Number.isInteger(personId))
        break;

      try {
        const person = await getPersonById(personId);
        setPerson(person);

      } catch (err) {
        alert(err);
      }

      break;
    }

    default:
      alert('Invalid filter by option.');
      break;
  }
}