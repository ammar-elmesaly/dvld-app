import { apiFetch } from "../../../api/apiFetch";
import { baseUrl } from "../../../api/urls";
import { Button } from "../../Button/Button";
import styles from "../../Forms/Forms.module.css";
import { ApplicationTypeDTO } from '@dvld/shared';

interface EditApplicationTypeProps {
  applicationType: ApplicationTypeDTO;
  handleRefresh: () => void;
}

export function EditApplicationType({ applicationType, handleRefresh }: EditApplicationTypeProps) {
  return (
    <form method="POST" onSubmit={(e) => onSubmit(e, applicationType.id, handleRefresh)} className={styles.form}>
      <div className={styles.mainLayoutColumn}>
        <div className={styles.headerRow}>
          <h1>Edit Application Type</h1>
        </div>
        <div className={styles.formRow}>
          <label htmlFor='type_name'>Type Name:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-tag"></i>
            <input name="typeName" defaultValue={applicationType.type_name} type="text" required />
          </div>
        </div>

        <div className={styles.formRow}>
          <label htmlFor='type_fees'>Type Fees:</label>
          <div className={styles.inputGroup}>
            <i className="bi bi-coin"></i>
            <input name="typeFees" defaultValue={applicationType.type_fees} type="text" required />
          </div>
        </div>

        {
          applicationType.default_validity_length &&
          <div className={styles.formRow}>
            <label htmlFor='default_validity_length'>Default Validity Length (years):</label>
            <div className={styles.inputGroup}>
              <i className="bi bi-calendar"></i>
              <input name="defaultValidityLength" defaultValue={applicationType.default_validity_length} type="number" min={1} step={1} max={10} required />
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

const onSubmit = async (e: React.FormEvent<HTMLFormElement>, applicationTypeId: number, handleRefresh: () => void) => {
  e.preventDefault();

  const confirm = window.confirm('Are you sure to update this application type?');
  if (!confirm) return;
  
  const formData = new FormData(e.currentTarget);

  const data = Object.fromEntries(formData.entries());

  const res = await apiFetch(`${baseUrl}/applicationType/edit/${applicationTypeId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(data)
  });

  const updatedApplicationTypeId = await res.json();

  alert(`Application type with id: ${updatedApplicationTypeId} updated successfully.`);
  handleRefresh();
};