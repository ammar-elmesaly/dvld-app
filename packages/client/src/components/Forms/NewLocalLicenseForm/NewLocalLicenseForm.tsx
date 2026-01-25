import { PersonDTO } from '@dvld/shared/src/dtos/person.dto';
import { getPersonById, getPersonByNationalId } from '../../../api/person/person';
import AddPersonForm from '../AddPersonForm/AddPersonForm';
import Button from '../../Button/Button';
import Filter from '../../Filter/Filter';
import Overlay from '../../Overlay/Overlay';
import PersonInformation from '../../Info/PersonInfo/PersonInfo';
import styles from './NewLocalLicenseForm.module.css';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../api/urls';
import { getAllApplicationTypes } from '../../../api/application/applicationType';
import { ApplicationTypeDTO } from '@dvld/shared/src/dtos/applicationType.dto';
import { LicenseClassDTO } from "@dvld/shared/src/dtos/licenseClass.dto";
import { getAllLicenseClasses } from '../../../api/license/licenseClass';
import { apiFetch } from '../../../api/apiFetch';
import { UserSession } from '../../../types/UserSession';
import { getCurrentUser } from '../../../api/user/user';

export default function NewLocalLicenseForm() {
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [addPersonOpen, setAddPersonOpen] = useState(false);
  const [person, setPerson] = useState<PersonDTO | undefined>(undefined);
  const [next, setNext] = useState(false);

  const [applicationTypes, setApplicationTypes] = useState<ApplicationTypeDTO[]>([]);
  const [licenseClasses, setLicenseClasses] = useState<LicenseClassDTO[]>([]);

  const [user, setUser] = useState<UserSession>({ username: "", userId: 0 });

  useEffect(() => {
      getAllApplicationTypes().then(setApplicationTypes);
  }, []);

  useEffect(() => {
      getAllLicenseClasses().then(setLicenseClasses);
  }, []);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);
  
  const localLicenseFees = applicationTypes.find(type => type.id === 1)?.type_fees;

  return (
    <>
      <form method='POST' onSubmit={(e) => onSubmit(e, user.userId, person?.id)} className={styles.form}>
        <div className={styles.headerRow}>
          <h1>New Local Driving License Application</h1>
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

        <div className={styles.licenseLayout} style={{display: next ? 'flex': 'none'}}>
          <div className={styles.formRow}>
            <label htmlFor='date'>Application Date:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-date"></i>
              <span>{ new Date().toDateString()}</span>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <label htmlFor="licenseClassId">License Class</label>

            <div className={styles.selectWrapper}>
              <i className="bi bi-collection-fill"></i>

              <select
                id="licenseClassId"
                name="licenseClassId"
                className={styles.select}
              >
                {licenseClasses.map((licenseClass, index) => (
                  <option
                    key={licenseClass.id ?? index}
                    value={licenseClass.id ?? index + 1}
                  >
                    {licenseClass.class_name}
                  </option>
                ))}
              </select>

              <i className={`bi bi-chevron-down ${styles.arrow}`} />
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='fees'>Application Fees:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-cash"></i>
              <span>{localLicenseFees}</span>
            </div>
          </div>

          <div className={styles.formRow}>
            <label htmlFor='fees'>Created By:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-person-fill"></i>
              <span>{ user.username }</span>
            </div>
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

async function onSubmit(e: React.FormEvent<HTMLFormElement>, userId: number, personId: number | undefined) {
  e.preventDefault();
  
  if (!personId) {
    alert('Error: please link a person first.');
    return;
  }

  const formData = new FormData(e.currentTarget);

  // quick client-side validation, but main validation will be on server
  if (formData.get('password') !== formData.get('confirmPassword')) {
    alert('Error: passwords must match.');
    return;
  }

  const data = Object.fromEntries(formData.entries());

  const payload = {
    ...data,
    personId,
    createdByUserId: userId
  }

  console.log(payload)

  const res = await apiFetch(`${baseUrl}/application/new/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include'
  });

  const application = await res.json();

  alert(`License application successfull with id: ${application.id}.`);
}