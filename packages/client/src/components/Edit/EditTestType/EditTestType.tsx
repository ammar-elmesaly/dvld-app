import { Button } from "../../Button/Button";
import styles from "./EditTestType.module.css";
import { TestTypeDTO } from "@dvld/shared/src/dtos/testType.dto";

interface EditTestTypeProps {
  testType: TestTypeDTO;
}

export function EditTestType({ testType }: EditTestTypeProps) {
  return (
    <form method="POST" onSubmit={onSubmit}>
      <div className={styles.editLayout}>
        <div className={styles.headerRow}>
          <h1>Edit Test Type</h1>
        </div>
        <div className={styles.formRow}>
          <label htmlFor='type_name'>Type Name:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-tag"></i>
            <input name="type_name" defaultValue={testType.type_name} type="text" required />
          </div>
        </div>

        <div className={styles.formRow}>
          <label htmlFor='type_description'>Type Description:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-text-paragraph"></i>
            <textarea name="type_description" defaultValue={testType.type_description} className={styles.descriptionTextArea} required />
          </div>
        </div>

        <div className={styles.formRow}>
          <label htmlFor='type_fees'>Type Fees:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-coin"></i>
            <input name="type_fees" defaultValue={testType.type_fees} type="text" required />
          </div>
        </div>

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