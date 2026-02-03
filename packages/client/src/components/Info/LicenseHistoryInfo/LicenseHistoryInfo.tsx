import { PersonDTO } from "@dvld/shared/src/dtos/person.dto";
import styles from "./LicenseHistoryInfo.module.css";
import PersonInfo from "../PersonInfo/PersonInfo";
import Switch from "../../Switch/Switch";
import { useState } from "react";
import { LicenseDTO } from "@dvld/shared/src/dtos/license.dto";
import { InternationalLicenseDTO } from "@dvld/shared/src/dtos/internationalLicense.dto";
import ManageLocalLicensesTable from "../../Tables/ManageLocalLicenses";
import ManageInternationalLicensesTable from "../../Tables/ManageInternationalLicenses";

interface LicenseHistoryInfoProps {
  person?: PersonDTO;
  localLicenses: LicenseDTO[];
  internationalLicenses: InternationalLicenseDTO[];
}

export function LicenseHistoryInfo({ person, localLicenses, internationalLicenses }: LicenseHistoryInfoProps) {
  const [intLicenseOpen, setIntLicenseOpen] = useState(false);

  return (
    <section className={styles.form}>
      <h2 className={styles.sectionHeader}>License History Info</h2>

      <div className={styles.mainLayout}>
        <div className={styles.fieldsContainer}>
          <div className={styles.personInfoRow}>
            <PersonInfo person={person} />
          </div>
          <div className={styles.localInternationalRow}>
            <span className={`${styles.label} ${!intLicenseOpen ? styles.active : ''}`}>
              Local
            </span>
            <Switch
              id="license-type"
              isOn={intLicenseOpen}
              handleToggle={() => setIntLicenseOpen(!intLicenseOpen)}
            />
            <span className={`${styles.label} ${intLicenseOpen ? styles.active : ''}`}>
              International
            </span>
          </div>
          { 
            intLicenseOpen
            ? <ManageInternationalLicensesTable internationalLicenses={internationalLicenses} />
            : <ManageLocalLicensesTable licenses={localLicenses} />
          }
        </div>
      </div>
    </section>
  );
}