import Button from '../../Button/Button';
import styles from '../Forms.module.css';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../api/urls';
import { apiFetch } from '../../../api/apiFetch';
import { getLicenseWithPersonById } from '../../../api/license/license';
import DriverLicenseInfo from '../../Info/DriverLicenseInfo/DriverLicenseInfo';
import { LicensePersonDTO } from '@dvld/shared/src/dtos/licensePerson.dto';
import { ApplicationTypeDTO } from '@dvld/shared/src/dtos/applicationType.dto';
import { getApplicationTypeByName } from '../../../api/application/applicationType';
import { UserSession } from '../../../types/UserSession';
import { getCurrentUser } from '../../../api/user/user';
import { LicenseClassDTO } from '@dvld/shared/src/dtos/licenseClass.dto';
import { ReplacementType } from '@dvld/shared/src/types/license';
import { getLicenseClassByName } from '../../../api/license/licenseClass';

export default function ReplaceLicenseForm() {
  // TODO: Replacement actually doesn't require full license payment (licenseClass.class_fees)
	const [filterValue, setFilterValue] = useState("");
	const [licenseWithPerson, setLicenseWithPerson] = useState<LicensePersonDTO | undefined>(undefined);
	const [licenseClass, setLicenseClass] = useState<LicenseClassDTO | undefined>(undefined);
	const [replacementType, setReplacementType] = useState<ReplacementType>(ReplacementType.Damaged);

	const [replaceDamagedApplicationType, setReplaceDamagedApplicationType] = useState<ApplicationTypeDTO | undefined>(undefined);
  const [replaceLostApplicationType, setReplaceLostApplicationType] = useState<ApplicationTypeDTO | undefined>(undefined);
	
  const [user, setUser] = useState<UserSession>({ username: "", userId: 0 });

	useEffect(() => {
		getApplicationTypeByName('REPLACE_DAMAGED_SERVICE').then(setReplaceDamagedApplicationType);
    getApplicationTypeByName('REPLACE_LOST_SERVICE').then(setReplaceLostApplicationType);
	}, []);

	useEffect(() => {
		getCurrentUser().then(setUser);
	}, []);

	return (
		<>
			<form method='POST' onSubmit={onSubmit} className={styles.form}>
				<div className={styles.headerRow}>
					<h1>Replace Driving License</h1>
				</div>

				<div className={styles.mainLayout}>
					<div className={styles.fieldsContainer}>
						<div className={styles.filterRow}>
							<div className={styles.inputGroup}>
								<input
									type='text'
									onChange={(e) => setFilterValue(e.target.value)}
									value={filterValue}
									placeholder='Enter license id'
								/>
							</div>
							<Button color='primary' icon='link' type='button'
								onClick={() => searchLicense(filterValue, setLicenseWithPerson, setLicenseClass)}
							/>
						</div>

						<div className={styles.licenseInfoRow}>
							{licenseWithPerson && <DriverLicenseInfo licenseWithPerson={licenseWithPerson} />}
						</div>

						{licenseWithPerson && (
							<>
								<div className={styles.tripleSplitRow}>
									<div className={styles.formRow}>
										<label htmlFor='replacement_fees'>R.L.App Fees:</label>
										<div className={styles.inputGroup}>
											<i className="bi bi-cash"></i>
											<span>
                        {
                          replacementType === ReplacementType.Damaged
                          ? replaceDamagedApplicationType?.type_fees
                          : replaceLostApplicationType?.type_fees
                        }
                      </span>
										</div>
									</div>

									<div className={styles.formRow}>
										<label htmlFor='license_fees'>License Fees:</label>
										<div className={styles.inputGroup}>
											<i className="bi bi-cash"></i>
											<span>{licenseClass?.class_fees}</span>
										</div>
									</div>

									<div className={styles.formRow}>
										<label htmlFor='total_fees'>Total Fees:</label>
										<div className={styles.inputGroup}>
											<i className="bi bi-cash"></i>
											<span>
												{
                        Number(
                          replacementType === ReplacementType.Damaged
                          ? replaceDamagedApplicationType?.type_fees
                          : replaceLostApplicationType?.type_fees
                        )
                        +
                        Number(licenseClass?.class_fees)}
											</span>
										</div>
									</div>
								</div>

								<div className={styles.formRow}>
									<label>Replacement For:</label>
									<div className={styles.radioGroup}>
										<label htmlFor='replacement_damaged'>
											<input
												id='replacement_damaged'
												type='radio'
												name='replacementType'
												value={ReplacementType.Damaged}
												checked={replacementType === ReplacementType.Damaged}
												onChange={() => setReplacementType(ReplacementType.Damaged)}
											/>
											Damaged License
										</label>
										<label htmlFor='replacement_lost'>
											<input
												id='replacement_lost'
												type='radio'
												name='replacementType'
												value={ReplacementType.Lost}
												checked={replacementType === ReplacementType.Lost}
												onChange={() => setReplacementType(ReplacementType.Lost)}
											/>
											Lost License
										</label>
									</div>
								</div>

								<div className={styles.formRow}>
									<label htmlFor='notes'>Notes:</label>
									<div className={styles.inputGroup}>
										<i className="bi bi-text-paragraph"></i>
										<textarea name="notes" className={styles.notesTextArea} />
									</div>
								</div>
							</>
						)}
					</div>
				</div>
				<div className={styles.controls}>
					<Button color='success' iconLeft='arrow-clockwise' type='submit'>
						Replace
					</Button>
				</div>
			</form>
		</>
	);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!licenseWithPerson) {
			alert('Error: Please link a license first');
			return;
		}

		const confirm = window.confirm("Are you sure to replace license?");

		if (!confirm) return;

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());

		const payload = {
			...data,
			createdByUserId: user.userId,
			licenseId: licenseWithPerson.license.id,
			replacementType,
		};

		const res = await apiFetch(`${baseUrl}/license/replace`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
			credentials: 'include'
		});

		const replacedLicenseId = await res.json();
		alert(`License replaced successfully with new license id: ${replacedLicenseId}.`);
	}
}

async function searchLicense(
	filterValue: string,
	setLicenseWithPerson: React.Dispatch<LicensePersonDTO | undefined>,
	setLicenseClass: React.Dispatch<LicenseClassDTO | undefined>
) {
	const licenseId = Number(filterValue);

	if (!Number.isInteger(licenseId)) {
		alert('Error: Id must be a number');
		return;
	}

	const licenseWithPerson: LicensePersonDTO = await getLicenseWithPersonById(licenseId);
	const licenseClass = await getLicenseClassByName(licenseWithPerson.license.license_system_name);

	setLicenseWithPerson(licenseWithPerson);
	setLicenseClass(licenseClass);
}
