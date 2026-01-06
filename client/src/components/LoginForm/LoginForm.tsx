import styles from './LoginForm.module.css';
import Button from '../Button/Button';

function LoginForm() {
    return (
        <form action="/api/login" method='POST' className={styles.form}>
            <div className={styles.formRow}>
                <label>Username:</label>
                <div className={styles.inputGroup}>
                    <i className="bi bi-person" />
                    <input name="username" type="text" required />
                </div>
            </div>

            <div className={styles.formRow}>
                <label>Password:</label>
                <div className={styles.inputGroup}>
                    <i className="bi bi-key" />
                    <input name="password" type="password" required />
                </div>
            </div>

            <div className={styles.checkboxRow}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
            </div>

            <Button type="submit" color="primary">Login</Button>
        </form>
    );
}

export default LoginForm;
