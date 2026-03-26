import { PersonDTO } from '@dvld/shared/src/dtos/person.dto';
import { apiFetch } from '../../api/apiFetch';
import { baseUrl } from '../../api/urls';
import Button from '../Button/Button';
import PersonInformation from '../Info/PersonInfo/PersonInfo';

interface DeletePersonFormProps {
	person: PersonDTO;
	handleRefresh: () => void;
}

export default function DeletePersonForm({ person, handleRefresh }: DeletePersonFormProps) {
	return (
		<form onSubmit={(e) => onSubmit(e, person.id, handleRefresh)} method='POST'>
			<h1>Delete Person</h1>
			<PersonInformation person={person} />

			<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
				<Button color='error' iconLeft='trash-fill' type='submit'>
					Delete
				</Button>
			</div>
		</form>
	);
}

async function onSubmit(e: React.FormEvent<HTMLFormElement>, personId: number, handleRefresh: () => void) {
	e.preventDefault();

	const confirm = window.confirm('Are you sure to delete this person? This action cannot be undone.');

	if (!confirm) return;

	const res = await apiFetch(`${baseUrl}/person/delete/${personId}`, {
		method: 'DELETE'
	});

	const deletedPersonId = await res.json();

	alert(`Person with id: ${deletedPersonId} deleted successfully.`);
	handleRefresh();
}
