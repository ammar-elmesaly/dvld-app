import { InfoRow } from "../../../helpers/info"
import styles from "./RetakeTestInfo.module.css";

interface RetakeTestInfoProps {
  retakeTestFees: number | undefined;
  testTypeFees: number | undefined;
}

export function RetakeTestInfo({ retakeTestFees = 0, testTypeFees = 0 }: RetakeTestInfoProps) {
  return (
    <section className={styles.form}>
      <h2 className={styles.sectionHeader}>Retake Test Info</h2>

      <div className={styles.mainLayout}>
        <div className={styles.fieldsContainer}>

          <div className={styles.splitRow}>
            <InfoRow label="R.App.Fees:" icon="bi-cash" value={retakeTestFees.toString()} />
            <InfoRow label="Total Fees:" icon="bi-cash" value={(Number(testTypeFees) + Number(retakeTestFees)).toString()} />
          </div>
        </div>
      </div>
    </section>
  );
}