import { ApplicationDTO } from '@dvld/shared';
import { InfoRow } from '../../../helpers/info.js';
import styles from './ApplicationBasicInfo.module.css';
import Button from '../../Button/Button.js';
import { useEffect, useState } from "react";
import Overlay from '../../Overlay/Overlay.js';
import PersonInfo from '../PersonInfo/PersonInfo.js';
import { PersonDTO } from '@dvld/shared';
import { getPersonById } from '../../../api/person/person.js';

interface ApplicationBasicInfoProps {
  application: ApplicationDTO;
  personId?: number;
}

export function ApplicationBasicInfo({ application, personId }: ApplicationBasicInfoProps) {
  const [viewPersonOpen, setViewPersonOpen] = useState(false);
  const [person, setPerson] = useState<PersonDTO | undefined>(undefined);

  useEffect(() => {
    if (!personId)
      return;
    
    getPersonById(personId).then(setPerson)
  }, [personId]);

  return (
    <section className={styles.form}>
      <h2 className={styles.sectionHeader}>Application Basic Info</h2>

      <div className={styles.mainLayout}>
        <div className={styles.fieldsContainer}>

          <div className={styles.splitRow}>
            <InfoRow label="ID:" icon="bi-hash" value={application.application_id.toString()} />
            <InfoRow label="Date:" icon="bi-calendar-event" value={application.application_date} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Status:" icon="bi-info-circle" value={application.status} />
            <InfoRow label="Status Date:" icon="bi-calendar-check" value={application.application_date} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Fees:" icon="bi-cash-stack" value={application.application_fees.toString()} />
            <InfoRow label="Created By:" icon="bi-person-badge" value={application.created_by_user_name} />
          </div>

          <div className={styles.formRow}>
            <label>Type:</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-tag"></i>
              <span>{application.application_type_name}</span>
            </div>
          </div>

          <div className={styles.formRow}>
            <label>Applicant:</label>
            <div className={styles.applicantActionRow}>
              <div className={styles.nameDisplay}>
                <i className="bi bi-person-fill"></i>
                <span>{application.full_name}</span>
              </div>
              <Button
                color="info"
                iconLeft="person-bounding-box"
                onClick={() => setViewPersonOpen(true)}
              >
                View Person Info
              </Button>
            </div>
          </div>

        </div>
      </div>

      <Overlay open={viewPersonOpen} onClose={() => setViewPersonOpen(false)}>
        <PersonInfo person={person} />
      </Overlay>
    </section>
  );
}