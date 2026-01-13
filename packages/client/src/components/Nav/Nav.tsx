import styles from './Nav.module.css';
import { NavLink, type NavLinkProps } from 'react-router-dom';

const navLinkStyles: NavLinkProps['style'] = ({ isActive }) => ({
    backgroundColor: isActive ? 'var(--primary-bg)' : undefined,
});

function Nav() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <NavLink to="/applications" style={navLinkStyles}>
                    <i className="bi bi-window-stack" /> Applications
                </NavLink>
                <NavLink to="/people" style={navLinkStyles}>
                    <i className="bi bi-people-fill" /> People
                </NavLink>
                <NavLink to="/drivers" style={navLinkStyles}>
                    <i className="bi bi-car-front" /> Drivers
                </NavLink>
                <NavLink to="/users" style={navLinkStyles}>
                    <i className="bi bi-person-bounding-box" /> Users
                </NavLink>
                <NavLink to="/account-settings" style={navLinkStyles}>
                    <i className="bi bi-gear" /> Account Settings
                </NavLink>
            </ul>
        </nav>
    );
}

export default Nav;
