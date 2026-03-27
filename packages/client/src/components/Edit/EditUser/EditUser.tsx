import { UserDTO } from '@dvld/shared/src/dtos/user.dto';
import { apiFetch } from '../../../api/apiFetch';
import { baseUrl } from '../../../api/urls';
import Button from '../../Button/Button';
import styles from '../../Forms/Forms.module.css';

interface EditUserProps {
	user: UserDTO;
	handleRefresh: () => void;
}

export default function EditUser({ user, handleRefresh }: EditUserProps) {
	return (
		<form onSubmit={(e) => onSubmit(e, user.id, handleRefresh)} method='POST' className={styles.form}>
			<div className={styles.headerRow}>
				<h1>Edit User</h1>
			</div>

			<div className={styles.mainLayoutColumn}>
				<div className={styles.formRow}>
					<label>User ID:</label>
					<div className={styles.inputGroup}>
						<i className='bi bi-hash'></i>
						<span>{user.id}</span>
					</div>
				</div>

				<div className={styles.formRow}>
					<label>Username:</label>
					<div className={styles.inputGroup}>
						<i className='bi bi-person-circle'></i>
						<span>{user.username}</span>
					</div>
				</div>

				<div className={styles.activeRow}>
					<label htmlFor='isActive'>Is Active:</label>
					<input id='isActive' name='isActive' type='checkbox' defaultChecked={user.isActive} />
				</div>
			</div>

			<div className={styles.controls}>
				<Button color='success' iconLeft='floppy-fill' type='submit'>
					Save
				</Button>
			</div>
		</form>
	);
}

async function onSubmit(e: React.FormEvent<HTMLFormElement>, userId: number, handleRefresh: () => void) {
	e.preventDefault();

	const confirm = window.confirm('Are you sure to update this user?');
	if (!confirm) return;

	const formData = new FormData(e.currentTarget);
	const payload = {
		isActive: formData.has('isActive')
	};

	const res = await apiFetch(`${baseUrl}/user/edit/${userId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	const updatedUserId = await res.json();
	alert(`User with id: ${updatedUserId} updated successfully.`);
	handleRefresh();
}
