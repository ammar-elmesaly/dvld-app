import styles from './DrivingLicenseDashboard.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import Overlay from '../Overlay/Overlay';
import NewLocalLicenseForm from '../Forms/NewLocalLicenseForm/NewLocalLicenseForm';
import { useNavigate } from 'react-router-dom';
import IssueInternationalLicenseForm from '../Forms/IssueInternationalLicenseForm/IssueInternationalLicenseForm';
import RenewDrivingLicenseForm from '../Forms/RenewDrivingLicenseForm/RenewDrivingLicenseForm';
import ReplaceLicenseForm from '../Forms/ReplaceLicenseForm/ReplaceLicenseForm';

export default function DrivingLicenseDashboard() {
  const navigate = useNavigate();
  const [localLicenseOpen, setLocalLicenseOpen] = useState(false);
  const [internationalLicenseOpen, setInternationalLicenseOpen] = useState(false);
  const [renewLicenseOpen, setRenewLicenseOpen] = useState(false);
  const [replaceLicenseOpen, setReplaceLicenseOpen] = useState(false);

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
          <div className={styles.controls}>
            <Button color="info" onClick={() => setLocalLicenseOpen(true)}>Local</Button>
            <Button color="info" onClick={() => setInternationalLicenseOpen(true)}>International</Button>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Manage Driving License Applications</h2>
          <p>Review, approve, or reject driving license applications.</p>
          <div className={styles.controls}>
            <Button color="info" onClick={() => navigate('/local-driving-license-applications')}>Local</Button>
            <Button color="info" onClick={() => navigate('/international-driving-license-applications') }>International</Button>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Renew Driving License</h2>
          <p></p>
          <div className={styles.controls}>
            <Button color="info" onClick={() => setRenewLicenseOpen(true)}>Renew</Button>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Replacement for Lost or Damaged License</h2>
          <p></p>
          <div className={styles.controls}>
            <Button color="info" onClick={() => setReplaceLicenseOpen(true)}>Replace</Button>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Release Detained Driving License</h2>
          <p></p>
          <div className={styles.controls}>
            <Button color="info">Release</Button>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Retake Test</h2>
          <p></p>
          <div className={styles.controls}>
            <Button color="info">Retake</Button>
          </div>
        </div>
      </div>
    </div>
    <Overlay open={localLicenseOpen} onClose={() => setLocalLicenseOpen(false)}>
      <NewLocalLicenseForm />
    </Overlay>

    <Overlay open={internationalLicenseOpen} onClose={() => setInternationalLicenseOpen(false)}>
      <IssueInternationalLicenseForm />
    </Overlay>

    <Overlay open={renewLicenseOpen} onClose={() => setRenewLicenseOpen(false)}>
      <RenewDrivingLicenseForm />
    </Overlay>

    <Overlay open={replaceLicenseOpen} onClose={() => setReplaceLicenseOpen(false)}>
      <ReplaceLicenseForm />
    </Overlay>
    </>
  );
}
