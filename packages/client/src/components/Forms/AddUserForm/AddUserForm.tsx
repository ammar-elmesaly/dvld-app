import { PersonDTO } from '@dvld/shared/src/dtos/person.dto';
import { getPersonById, getPersonByNationalId } from '../../../api/person/person';
import AddPersonForm from '../AddPersonForm/AddPersonForm';
import Button from '../../Button/Button';
import Filter from '../../Filter/Filter';
import Overlay from '../../Overlay/Overlay';
import PersonInformation from '../../Info/PersonInfo/PersonInfo';
import styles from './AddUserForm.module.css';
import { useState } from 'react';
import { baseUrl } from '../../../api/urls';
import { apiFetch } from '../../../api/apiFetch';

export default function AddUserForm() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [addPersonOpen, setAddPersonOpen] = useState(false);
  const [person, setPerson] = useState<PersonDTO | undefined>(undefined);
  const [next, setNext] = useState(false);

  return (
    <>
      <form method='POST' onSubmit={onSubmit} className={styles.form}>
        <div className={styles.headerRow}>
          <h1>Add New User</h1>
        </div>

        <div className={styles.mainLayout} style={{display: next ? 'none': 'flex'}}>
          <div className={styles.fieldsContainer}>
            <div className={styles.filterRow}>
              <Filter
                options={['id', 'nationalId']}
                filterBy={filterBy}
                filterValue={filterValue}
                setFilterBy={setFilterBy}
                setFilterValue={setFilterValue}
              />
              <Button color='primary' icon='link' type='button'
                onClick={() => searchPerson(filterBy, filterValue, setPerson)}
              />
              <Button color='success' icon="person-fill-add" type='button' onClick={() => setAddPersonOpen(true)} />
            </div>
            <div className={styles.personInfoRow}>
              <PersonInformation person={person} />
            </div>
          </div>
        </div>
        <div className={styles.loginInfoLayout} style={{display: next ? 'flex': 'none'}}>
          <input name="personId" type='hidden' value={person?.id ?? ""}></input>
          <div className={styles.formRow}>
            <label htmlFor='username'>Username:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-person"></i>
              <input name="username" type="text" required />
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='password'>Password:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-key"></i>
              <input name="password" type="password" required />
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='confirm_password'>Confirm:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-check-circle"></i>
              <input name="confirmPassword" type="password" required />
            </div>
          </div>

          <div className={styles.activeRow}>
            <label htmlFor='is_active'>Is active:</label>
            <input name="isActive" type="checkbox" />
          </div>
        </div>
        <div className={styles.controls} >
          <Button
          style={{display: next ? 'none' : 'block'}}
          color='success'
          type='button'
          iconLeft='arrow-right' onClick={() => {
            if (!person) {
              alert('Error: please link a person first.');
              return;
            }
            setNext(true)
          }}>
            Next
          </Button>

          <Button
          style={{display: next ? 'block' : 'none'}}
          color='secondary'
          type='button'
          iconLeft='arrow-left' onClick={() => setNext(false)}>
            Previous
          </Button>

          <Button
          color='success'
          iconLeft='floppy-fill'
          type='submit'
          style={{display: next ? 'block' : 'none'}}>
            Save
          </Button>
        </div>
      </form>
      <Overlay zindex={20000} open={addPersonOpen} onClose={() => setAddPersonOpen(false)}>
        <AddPersonForm />
      </Overlay>
    </>
  );
}

async function searchPerson(
  filterBy: string,
  filterValue: string,
  setPerson: React.Dispatch<React.SetStateAction<PersonDTO | undefined>>
) {
  switch (filterBy) {
    case "id": {
      const personId = Number(filterValue);

      if (!Number.isInteger(personId)) {
        alert('Error: Id must be a number');
        break;
      }

      const person = await getPersonById(personId);
      setPerson(person);

      break;
    }

    case "nationalId": {
      const nationalId = Number(filterValue);
      
      if (!Number.isInteger(nationalId)) {
        alert('National Id has to be a number.');
        break;
      }

      const person = await getPersonByNationalId(nationalId);
      setPerson(person);

      break;
    }
    default:
      alert('Error: Invalid filter by option.');
      break;
  }
}

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  // quick client-side validation, but main validation will be on server
  if (formData.get('password') !== formData.get('confirmPassword')) {
    alert('Error: passwords must match.');
    return;
  }

  const data = Object.fromEntries(formData.entries());

  const payload = {
    ...data,
    isActive: formData.has("isActive"),
  };

  const res = await apiFetch(`${baseUrl}/user/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include'
  });

  const userId = await res.json();

  alert(`User registered successfully with id: ${userId}.`);
}