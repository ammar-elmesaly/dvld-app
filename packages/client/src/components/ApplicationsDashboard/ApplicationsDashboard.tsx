import styles from './ApplicationsDashboard.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

export default function ApplicationsDashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Applications Dashboard</h1>
      <p className={styles.subtitle}>
        Choose a service to continue
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Driving License Services</h2>
          <p>Issue, renew, replace, and manage driving licenses.</p>
          <Button color="primary" onClick={() => navigate('/license-services')}>Open</Button>
        </div>

        <div className={styles.card}>
          <h2>Manage Application Types</h2>
          <p>Configure different application types.</p>
          <Button color="primary" onClick={() => navigate('/application-types')}>Open</Button>
        </div>

        <div className={styles.card}>
          <h2>Manage Test Types</h2>
          <p>Configure different test types.</p>
          <Button color="primary" onClick={() => navigate('/test-types')}>Open</Button>
        </div>
      </div>
    </div>
  );
}
