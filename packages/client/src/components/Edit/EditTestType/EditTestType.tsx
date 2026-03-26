import { apiFetch } from "../../../api/apiFetch";
import { baseUrl } from "../../../api/urls";
import { Button } from "../../Button/Button";
import styles from "../../Forms/Forms.module.css";
import { TestTypeDTO } from "@dvld/shared/src/dtos/testType.dto";

interface EditTestTypeProps {
  testType: TestTypeDTO;
  handleRefresh: () => void;
}

export function EditTestType({ testType, handleRefresh }: EditTestTypeProps) {
  return (
    <form method="POST" onSubmit={(e) => onSubmit(e, testType.id, handleRefresh)} className={styles.form}>
      <div className={styles.mainLayoutColumn}>
        <div className={styles.headerRow}>
          <h1>Edit Test Type</h1>
        </div>
        <div className={styles.formRow}>
          <label htmlFor='type_name'>Type Name:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-tag"></i>
            <input name="typeName" defaultValue={testType.type_name} type="text" required />
          </div>
        </div>

        <div className={styles.formRow}>
          <label htmlFor='type_description'>Type Description:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-text-paragraph"></i>
            <textarea name="typeDescription" defaultValue={testType.type_description} className={styles.textArea} required />
          </div>
        </div>

        <div className={styles.formRow}>
          <label htmlFor='type_fees'>Type Fees:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-coin"></i>
            <input name="typeFees" defaultValue={testType.type_fees} type="text" required />
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

const onSubmit = async (e: React.FormEvent<HTMLFormElement>, testTypeId: number, handleRefresh: () => void) => {
  e.preventDefault();

  const confirm = window.confirm('Are you sure to update this test type?');
  if (!confirm)
    return;
  
  const formData = new FormData(e.currentTarget);

  const data = Object.fromEntries(formData.entries());

  const res = await apiFetch(`${baseUrl}/testType/edit/${testTypeId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(data)
  });

  const updatedTestTypeId = await res.json();

  alert(`Test type with id: ${updatedTestTypeId} updated successfully.`);
  handleRefresh();
};