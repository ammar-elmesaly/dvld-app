import styles from './AccountSettings.module.css';
import Button from '../Button/Button';

export default function AccountSettings() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Account Settings</h2>

      <section className={styles.card}>
        <h3 className={styles.sectionTitle}>Current User Info</h3>
        <p>Username: johndoe</p>
        <p>Email: john@example.com</p>
      </section>

      <section className={styles.card}>
        <h3 className={styles.sectionTitle}>Change Password</h3>
        <form className={styles.form}>
          <input type="password" placeholder="Current password" />
          <input type="password" placeholder="New password" />
          <input type="password" placeholder="Confirm new password" />
          <Button color="primary" type="submit">Update Password</Button>
        </form>
      </section>

      <section className={styles.card}>
        <h3 className={styles.sectionTitle}>Sign Out</h3>
        <Button color="error" type="button">
          Sign Out
        </Button>
      </section>
    </section>
  );
}
