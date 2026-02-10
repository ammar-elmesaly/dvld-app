import { useEffect, useState } from "react";
import { InfoRow } from "../../../helpers/info";
import Button from "../../Button/Button";
import Overlay from "../../Overlay/Overlay";
import DriverLicenseInfo from "../DriverLicenseInfo/DriverLicenseInfo";
import styles from "./DrivingLicenseInfo.module.css";
import { LicensePersonDTO } from "@dvld/shared/src/dtos/licensePerson.dto";
import { getLicenseWithPersonById } from "../../../api/license/license";

interface DrivingLicenseInfoProps {
  dlAppId: number;
  licenseClass: string;
  passedTests: string;
  licenseId?: number;
}

export function DrivingLicenseInfo({ dlAppId, licenseClass, passedTests, licenseId}: DrivingLicenseInfoProps) {
  const [licenseInfoOpen, setLicenseInfoOpen] = useState(false);
  const [licenseWithPerson, setLicenseWithPerson] = useState<LicensePersonDTO | undefined>(undefined);

  useEffect(() => {
    if (!licenseId) return;
    getLicenseWithPersonById(licenseId).then(setLicenseWithPerson);
  },
  [licenseId]);

  return (
    <section className={styles.form}>
      <h2 className={styles.sectionHeader}>Driving License Application Info</h2>

      <div className={styles.mainLayout}>
        <div className={styles.fieldsContainer}>

          <div className={styles.splitRow}>
            <InfoRow label="D.L.App ID:" icon="bi-hash" value={dlAppId.toString()} />
            <InfoRow label="Applied For:" icon="bi-file-earmark-text" value={licenseClass} />
          </div>

          <div className={styles.splitRow}>
            <InfoRow label="Passed Tests:" icon="bi-clipboard-check" value={passedTests} />

            <div className={styles.formRow}>
              <span>Info: </span>
              <Button
                iconLeft="card-text"
                disabled={!licenseWithPerson}
                color='info'
                onClick={() => setLicenseInfoOpen(true)}
              >
                View License Info
              </Button>
            </div>
          </div>

        </div>
      </div>
      {
        licenseWithPerson &&
        <Overlay open={licenseInfoOpen} onClose={() => setLicenseInfoOpen(false)} >
          <DriverLicenseInfo licenseWithPerson={licenseWithPerson} />
        </Overlay>
      }
    </section>
  );
}