import styles from './LoginForm.module.css';
import Button from '../../Button/Button';
import { baseUrl } from '../../../api/urls';
import { apiFetch } from '../../../api/apiFetch';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget);

    const payload = Object.fromEntries(formData.entries());

    const res = await apiFetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok)
      navigate('/applications', { replace: true });
  }

  return (
    <form onSubmit={onSubmit} method='POST' className={styles.form}>
      <div className={styles.formRow}>
        <label>Username:</label>
        <div className={styles.inputGroup}>
          <i className="bi bi-person" />
          <input name="username" defaultValue="ammar1" type="text" required />
        </div>
      </div>

      <div className={styles.formRow}>
        <label>Password:</label>
        <div className={styles.inputGroup}>
          <i className="bi bi-key" />
          <input name="password" defaultValue="123" type="password" required />
        </div>
      </div>

      <div className={styles.checkboxRow}>
        <input type="checkbox" id="remember" name="rememberMe" />
        <label htmlFor="remember">Remember me</label>
      </div>

      <Button type="submit" color="primary">Login</Button>
    </form>
  );
}
export default LoginForm;
