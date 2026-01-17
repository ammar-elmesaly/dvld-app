import styles from './DrivingLicenseDashboard.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import Overlay from '../Overlay/Overlay';
import NewLocalLicenseForm from '../Forms/NewLocalLicenseForm/NewLocalLicenseForm';

export default function DrivingLicenseDashboard() {
  const [localLicenseOpen, setLocalLicenseOpen] = useState(false);

  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.title}>Driving License Dashboard</h1>
      <p className={styles.subtitle}>
        Choose a service to continue
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>New Driving License</h2>
          <p>Issue driving licenses.</p>
          <Button color="info" style={{ marginBottom: '10px'}} onClick={() => setLocalLicenseOpen(true)}>Local License</Button>
          <Button color="info">International License</Button>
        </div>

        <div className={styles.card}>
          <h2>Renew Driving License</h2>
          <p></p>
          <Button color="info">Renew</Button>
        </div>

        <div className={styles.card}>
          <h2>Replacement for Lost or Damaged License</h2>
          <p></p>
          <Button color="info">Replace</Button>
        </div>

        <div className={styles.card}>
          <h2>Release Detained Driving License</h2>
          <p></p>
          <Button color="info">Release</Button>
        </div>

        <div className={styles.card}>
          <h2>Retake Test</h2>
          <p></p>
          <Button color="info">Retake</Button>
        </div>
      </div>
    </div>
    <Overlay open={localLicenseOpen} onClose={() => setLocalLicenseOpen(false)}>
      <NewLocalLicenseForm />
    </Overlay>
    </>
  );
}
