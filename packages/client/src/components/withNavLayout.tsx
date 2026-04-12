import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav.js';

export function WithNavLayout() {
    return (
        <>
          <Nav />
          < Outlet />
        </>
    );
}
