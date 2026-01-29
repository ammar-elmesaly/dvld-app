import { apiFetch } from "../../../api/apiFetch";
import { baseUrl } from "../../../api/urls";
import Button from "../../Button/Button";
import styles from "./IssueDrivingLicenseForm.module.css";

export function IssueDrivingLicenseForm() {
  return (
    <form onSubmit={onSubmit} method='POST'>
      <div className={styles.formRow}>
        <label htmlFor='test_notes'>Notes:</label>
        <div className={styles.inputGroup}>
          <i className="bi bi-text-paragraph"></i>
          <textarea className={styles.textArea} name="issueNotes" />
        </div>
      </div>
      <div className={styles.controls}>
        <Button
          color='success'
          iconLeft='floppy-fill'
          type='submit'
        >
          Issue
        </Button>
      </div>
    </form>
  );
}

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const confirm = window.confirm("Are you sure to issue license? This can't be modified later.");

  if (!confirm)
    return;

  const formData = new FormData(e.currentTarget);

  const data = Object.fromEntries(formData.entries());

  const payload = {
    ...data,
  };

  const res = await apiFetch(`${baseUrl}/license/issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include'
  });

  const drivingLicenseId = await res.json();
  alert(`License issued successfully with id: ${drivingLicenseId}.`);
}