import { UserDTO } from '@dvld/shared';
import styles from '../../Forms/Forms.module.css';
import { InfoRow } from '../../../helpers/info.js';

interface UserInfoProps {
  user: UserDTO;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <section className={styles.form}>
      <div className={styles.personIdRow}>
        <label>User ID:</label>
        <span>{user.id}</span>
      </div>

      <div className={styles.mainLayoutColumn}>
        <div className={styles.splitRow}>
          <InfoRow label="Username:" icon="bi-person-circle" value={user.username} />
          <InfoRow label="Status:" icon="bi-check-circle" value={user.isActive ? 'Active' : 'Inactive'} />
        </div>

        <div className={styles.splitRow}>
          <InfoRow label="Person ID:" icon="bi-person-vcard-fill" value={user.personId.toString()} />
          <InfoRow label="Person Name:" icon="bi-person-fill" value={user.personFullName} />
        </div>
      </div>
    </section>
  );
}

