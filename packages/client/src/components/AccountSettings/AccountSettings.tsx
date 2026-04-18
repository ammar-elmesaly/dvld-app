import styles from './AccountSettings.module.css';
import formStyles from '../Forms/Forms.module.css';
import Button from '../Button/Button.js';
import { getCurrentUser, logout } from '../../api/user/user.js';
import { apiFetch } from '../../api/apiFetch.js';
import { baseUrl } from '../../api/urls.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserSession } from '../../types/UserSession.js';

export default function AccountSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserSession | undefined>(undefined);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Account Settings</h2>

      <section className={styles.card}>
        <h3 className={styles.sectionTitle}>Current User Info</h3>
        <p>Id: {user?.userId}</p>
        <p>Username: {user?.username}</p>
      </section>

      <section className={styles.card}>
        <h3 className={styles.sectionTitle}>Change Password</h3>
        <form
          method='PUT'
          onSubmit={onSubmit}
          className={styles.form}
        >
          <div className={formStyles.formRow}>
            <label htmlFor='currentPassword'>Current:</label>
            <div className={formStyles.inputGroup}>
              <i className="bi bi-shield-lock"></i>
              <input id='currentPassword' name="currentPassword" type="password" required />
            </div>
          </div>

          <div className={formStyles.formRow}>
            <label htmlFor='newPassword'>New:</label>
            <div className={formStyles.inputGroup}>
              <i className="bi bi-key"></i>
              <input id='newPassword' name="newPassword" type="password" minLength={3} maxLength={255} required />
            </div>
          </div>

          <div className={formStyles.formRow}>
            <label htmlFor='confirmPassword'>Confirm:</label>
            <div className={formStyles.inputGroup}>
              <i className="bi bi-check-circle"></i>
              <input id='confirmPassword' name="confirmPassword" type="password" minLength={3} maxLength={255} required />
            </div>
          </div>

          <div className={formStyles.controls}>
            <Button color="primary" iconLeft='floppy-fill' type="submit">
              Update Password
            </Button>
          </div>
        </form>
      </section>

      <section className={styles.card}>
        <h3 className={styles.sectionTitle}>Sign Out</h3>
        <Button onClick={async () => {
            const code = await logout();
            
            if (code === 204)
              navigate('/login');
          }
        } color="error" type="button">
          Sign Out
        </Button>
      </section>
    </section>
  );
}

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  // quick client-side validation, but main validation will be on server
  if (formData.get('newPassword') !== formData.get('confirmPassword')) {
    alert('Error: passwords must match.');
    return;
  }

  const payload = {
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const res = await apiFetch(`${baseUrl}/user/changePassword`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const userId = await res.json();
  alert(`Password changed successfully for user id: ${userId}.`);
  e.currentTarget.reset();
}
