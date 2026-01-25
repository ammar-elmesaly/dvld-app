import styles from "../components/Forms/AddPersonForm/AddPersonForm.module.css";

export function InfoRow({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div className={styles.formRow}>
      <label>{label}</label>
      <div className={styles.inputGroup}>
        {icon && <i className={`bi ${icon}`} />}
        <span>{value}</span>
      </div>
    </div>
  );
}

export function InfoBox({
  value,
  icon
}: {
  value: string;
  icon?: string;
}) {
  return (
    <div className={styles.inputGroup}>
      {icon && <i className={`bi ${icon}`} />}
      <span>{value}</span>
    </div>
  );
}

