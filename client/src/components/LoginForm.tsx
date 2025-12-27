import '../styles/forms/global.css';
import Button from './ui/Button';

function LoginForm() {
    return (
        <form action="/api/login">

            <div className="form-row">
                <label>Username:</label>
                <div className="input-group">
                    <i className="bi bi-person" />
                    <input name="username" type="text" required />
                </div>
            </div>

            <div className="form-row">
                <label>Password:</label>
                <div className="input-group">
                    <i className="bi bi-key" />
                    <input name="password" type="password" required />
                </div>
            </div>

            <div className="checkbox-row">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
            </div>

            <Button type="submit" color="primary">Login</Button>
        </form>
    );
}

export default LoginForm;
