import { Button } from "../../Button/Button";
import styles from "./EditApplicationType.module.css";
import { ApplicationTypeDTO } from "@dvld/shared/src/dtos/applicationType.dto";

interface EditApplicationTypeProps {
  applicationType: ApplicationTypeDTO;
}

export function EditApplicationType({ applicationType }: EditApplicationTypeProps) {
  return (
    <form method="POST" onSubmit={onSubmit}>
      <div className={styles.editLayout}>
        <div className={styles.headerRow}>
          <h1>Edit Application Type</h1>
        </div>
        <div className={styles.formRow}>
          <label htmlFor='type_name'>Type Name:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-tag"></i>
            <input name="type_name" defaultValue={applicationType.type_name} type="text" required />
          </div>
        </div>

        <div className={styles.formRow}>
          <label htmlFor='type_fees'>Type Fees:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-coin"></i>
            <input name="type_fees" defaultValue={applicationType.type_fees} type="text" required />
          </div>
        </div>

        {
          applicationType.default_validity_length &&
          <div className={styles.formRow}>
            <label htmlFor='default_validity_length'>Default Validity Length (years):</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-calendar"></i>
              <input name="default_validity_length" defaultValue={applicationType.default_validity_length} type="number" min={1} step={1} max={10} required />
            </div>
          </div>
        }

      </div>
      <div className={styles.controls} >
        <Button
          color='success'
          iconLeft='floppy-fill'
          type='submit'
        >
          Save
        </Button>
      </div>
    </form>
  )
}

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  
  for (const [key, value] of formData) {
    console.log(`${key}: ${value}`);
  }
}