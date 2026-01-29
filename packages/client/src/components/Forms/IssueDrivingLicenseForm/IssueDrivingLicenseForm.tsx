import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/apiFetch";
import { baseUrl } from "../../../api/urls";
import { getCurrentUser } from "../../../api/user/user";
import Button from "../../Button/Button";
import styles from "./IssueDrivingLicenseForm.module.css";
import { UserSession } from "../../../types/UserSession";

interface IssueDrivingLicenseProps {
  personId: number;
  licenseClassId: number;
  applicationId: number;
  handleRefresh: () => void;
}
export function IssueDrivingLicenseForm({ personId, licenseClassId, applicationId, handleRefresh }: IssueDrivingLicenseProps) {
  const [user, setUser] = useState<UserSession>({ username: "", userId: 0 });

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <form onSubmit={onSubmit} method='POST'>
      <div className={styles.formRow}>
        <label htmlFor='notes'>Notes:</label>
        <div className={styles.inputGroup}>
          <i className="bi bi-text-paragraph"></i>
          <textarea className={styles.textArea} name="notes" />
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const confirm = window.confirm("Are you sure to issue license? This can't be modified later.");

    if (!confirm)
      return;

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      createdByUserId: user.userId,
      personId,
      licenseClassId,
      applicationId,
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
    handleRefresh();
  }
}