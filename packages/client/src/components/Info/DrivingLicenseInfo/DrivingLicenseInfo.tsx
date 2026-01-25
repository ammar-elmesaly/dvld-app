import { InfoRow } from "../../../helpers/info";
import Button from "../../Button/Button";
import styles from "./DrivingLicenseInfo.module.css";

interface DrivingLicenseInfoProps {
  dlAppId: number;
  licenseClass: string;
  passedTests: string;
}

export function DrivingLicenseInfo({ dlAppId, licenseClass, passedTests }: DrivingLicenseInfoProps) {
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
                disabled={true}
              >
                View License Info
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}