import { useEffect, useMemo, useState } from 'react';
import { PersonDTO } from '@dvld/shared';
import { CountryDTO } from '@dvld/shared';
import { apiFetch } from '../../../api/apiFetch';
import { getAllCountries } from '../../../api/country/country';
import { baseUrl, uploadUrl } from '../../../api/urls';
import { toInputDate, yearsAgo } from '../../../helpers/date';
import Button from '../../Button/Button';
import styles from '../../Forms/Forms.module.css';

interface EditPersonProps {
	person: PersonDTO;
	handleRefresh: () => void;
}

export default function EditPerson({ person, handleRefresh }: EditPersonProps) {
	const minBirthdate = yearsAgo(100);
	const maxBirthdate = yearsAgo(18);

	const minDateString = toInputDate(minBirthdate);
	const maxDateString = toInputDate(maxBirthdate);
	const personBirthDate = toInputDate(new Date(person.date_of_birth));

	const [countries, setCountries] = useState<CountryDTO[]>([]);
	const [selectedCountryId, setSelectedCountryId] = useState<number | ''>('');

	useEffect(() => {
		getAllCountries().then(setCountries);
	}, []);

	useEffect(() => {
		if (!countries.length) return;

		const country = countries.find((countryItem) => countryItem.country_name === person.national_country);
		setSelectedCountryId(country?.id ?? countries[0]?.id ?? '');
	}, [countries, person.national_country]);

	const imageSrc = useMemo(() => {
		if (person.personal_photo) return `${uploadUrl}/${person.personal_photo}`;
		return '../../assets/palestine.jpeg';
	}, [person.personal_photo]);

	return (
		<form
			onSubmit={(e) => onSubmit(e, person.id, handleRefresh)}
			method='POST'
			encType='multipart/form-data'
			className={styles.form}
		>
			<div className={styles.headerRow}>
				<h1>Edit Person</h1>
			</div>

			<div className={styles.personIdRow}>
				<label>Person ID:</label>
				<span>{person.id}</span>
			</div>

			<div className={styles.mainLayout}>
				<div className={styles.fieldsContainer}>
					<div className={styles.formRow}>
						<label htmlFor='full name'>Name:</label>
						<div className={styles.nameGrid}>
							<div className={styles.inputGroup}>
								<i className='bi bi-person' />
								<input name='firstName' type='text' defaultValue={person.first_name} placeholder='First' required />
							</div>
							<div className={styles.inputGroup}>
								<input name='secondName' type='text' defaultValue={person.second_name} placeholder='Second' required />
							</div>
							<div className={styles.inputGroup}>
								<input name='thirdName' type='text' defaultValue={person.third_name} placeholder='Third' required />
							</div>
							<div className={styles.inputGroup}>
								<input name='lastName' type='text' defaultValue={person.last_name} placeholder='Last' required />
							</div>
						</div>
					</div>

					<div className={styles.splitRow}>
						<div className={styles.formRow}>
							<label htmlFor='national number'>National No:</label>
							<div className={styles.inputGroup}>
								<i className='bi bi-person-vcard-fill'></i>
								<input name='nationalId' type='text' defaultValue={person.national_id} required />
							</div>
						</div>
						<div className={styles.formRow}>
							<label htmlFor='date of birth'>Date Of Birth:</label>
							<div className={styles.inputGroup}>
								<i className='bi bi-calendar3'></i>
								<input name='dateOfBirth' type='date' min={minDateString} max={maxDateString} defaultValue={personBirthDate} required />
							</div>
						</div>
					</div>

					<div className={styles.splitRow}>
						<div className={styles.formRow}>
							<label htmlFor='gender'>Gender:</label>
							<div className={styles.radioGroup}>
								<label htmlFor='male'>
									<input type='radio' name='gender' value='M' defaultChecked={person.gender === 'M'} required /> Male
								</label>
								<label htmlFor='female'>
									<input type='radio' name='gender' value='F' defaultChecked={person.gender === 'F'} required /> Female
								</label>
							</div>
						</div>
						<div className={styles.formRow}>
							<label htmlFor='phone number'>Phone:</label>
							<div className={styles.inputGroup}>
								<i className='bi bi-telephone'></i>
								<input name='phoneNumber' type='text' defaultValue={person.phone_number} required />
							</div>
						</div>
					</div>

					<div className={styles.splitRow}>
						<div className={styles.formRow}>
							<label htmlFor='email'>Email:</label>
							<div className={styles.inputGroup}>
								<i className='bi bi-envelope'></i>
								<input name='email' type='email' defaultValue={person.email ?? ''} />
							</div>
						</div>
						<div className={styles.formRow}>
							<label htmlFor='nationalCountryId'>Country</label>

							<div className={styles.selectWrapper}>
								<i className='bi bi-globe'></i>

								<select
									id='nationalCountryId'
									name='nationalCountryId'
									className={styles.select}
									value={selectedCountryId}
									onChange={(e) => setSelectedCountryId(Number(e.target.value))}
								>
									{countries.map((country) => (
										<option key={country.id} value={country.id}>
											{country.country_name}
										</option>
									))}
								</select>

								<i className={`bi bi-chevron-down ${styles.arrow}`} />
							</div>
						</div>
					</div>

					<div className={styles.formRow}>
						<label htmlFor='address'>Address:</label>
						<div className={styles.inputGroup}>
							<i className='bi bi-geo-alt'></i>
							<textarea name='address' rows={3} defaultValue={person.address} className={styles.addressTextarea}></textarea>
						</div>
					</div>
				</div>

				<div className={styles.imageColumn}>
					<div className={styles.imageBox}>
						<img src={imageSrc} alt='person photo'></img>
					</div>
					<div className={styles.imageLinkContainer}>
						<input name='personalImage' type='file' className={styles.imageLink} accept='.jpg,.png'></input>
					</div>
				</div>
			</div>

			<div className={styles.controls}>
				<Button color='success' iconLeft='floppy-fill'>Save</Button>
			</div>
		</form>
	);
}

const onSubmit = async (e: React.FormEvent<HTMLFormElement>, personId: number, handleRefresh: () => void) => {
	e.preventDefault();

  const confirm = window.confirm('Are you sure to update this person?');
  if (!confirm)
    return;
  
	const formData = new FormData(e.currentTarget);
	formData.append('personId', personId.toString());

	const res = await apiFetch(`${baseUrl}/person/edit`, {
		method: 'PUT',
		body: formData
	});

	const updatedPersonId = await res.json();

	alert(`Person with id: ${updatedPersonId} updated successfully.`);
	handleRefresh();
};
