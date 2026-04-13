import styles from './AccountSettings.module.css';
import Button from '../Button/Button.js';
import { getCurrentUser, logout } from '../../api/user/user.js';
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
        <form className={styles.form}>
          <input name="currentPassword" type="password" placeholder="Current password" />
          <input name="newPassword" type="password" placeholder="New password" />
          <input name="confirmPassword" type="password" placeholder="Confirm new password" />
          <Button color="primary" type="submit">Update Password</Button>
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
