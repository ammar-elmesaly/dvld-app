import { Outlet } from 'react-router-dom';
import Nav from "./Nav/Nav";

export function WithNavLayout() {
    return (
        <>
          <Nav />
          < Outlet />
        </>
    );
}
