import { UserDTO } from '@dvld/shared';
import { apiFetch } from '../../api/apiFetch.js';
import { baseUrl } from '../../api/urls.js';
import Button from '../Button/Button.js';
import UserInfo from '../Info/UserInfo/UserInfo.js';

interface DeleteUserFormProps {
	user: UserDTO;
	handleRefresh: () => void;
}

export default function DeleteUserForm({ user, handleRefresh }: DeleteUserFormProps) {
	return (
		<form onSubmit={(e) => onSubmit(e, user.id, handleRefresh)} method='POST'>
			<h1>Delete User</h1>
			<UserInfo user={user} />

			<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
				<Button color='error' iconLeft='trash-fill' type='submit'>
					Delete
				</Button>
			</div>
		</form>
	);
}

async function onSubmit(e: React.FormEvent<HTMLFormElement>, userId: number, handleRefresh: () => void) {
	e.preventDefault();

	const confirm = window.confirm('Are you sure to delete this user? This action cannot be undone.');

	if (!confirm) return;

	const res = await apiFetch(`${baseUrl}/user/delete/${userId}`, {
		method: 'DELETE'
	});

	const deletedUserId = await res.json();

	alert(`User with id: ${deletedUserId} deleted successfully.`);
	handleRefresh();
}
