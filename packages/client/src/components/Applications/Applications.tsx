import styles from './Applications.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

export default function Applications() {
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
          <Button color="primary">Open</Button>
        </div>

        <div className={styles.card}>
          <h2>Manage Applications</h2>
          <p>Review, approve, or reject submitted applications.</p>
          <Button color="primary">Open</Button>
        </div>

        <div className={styles.card}>
          <h2>Detain Licenses</h2>
          <p>Detain or release licenses according to violations.</p>
          <Button color="primary">Open</Button>
        </div>

        <div className={styles.card}>
          <h2>Manage Application Types</h2>
          <p>Create and configure different application categories.</p>
          <Button color="primary" onClick={() => navigate('/application-types')}>Open</Button>
        </div>
      </div>
    </div>
  );
}
