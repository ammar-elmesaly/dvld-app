import { BrowserRouter, Routes, Route } from 'react-router-dom';

import People from './ManagePeople/ManagePeople';
import Applications from './Applications/Applications';
import ManageUsers from './ManageUsers/ManageUsers';
import LoginForm from './Forms/LoginForm/LoginForm';
import Nav from './Nav/Nav';
import AccountSettings from './AccountSettings/AccountSettings';
import ManageApplicationTypes from './ManageApplicationTypes/ManageApplicationTypes';

const loggedIn = true;  // temporary logged-in bool

function Drivers() {
  return <h1>Drivers Page</h1>;
}

function App() {
    if (!loggedIn) {
        return (
            <LoginForm />
        );
    }

    return (
        <>
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path='/applications' element={<Applications />} />
                <Route path='/people' element={<People />} />
                <Route path='/drivers' element={<Drivers/>} />
                <Route path='/users' element={<ManageUsers />} />
                <Route path='/account-settings' element={<AccountSettings/>} />
                
                {/* Applications Tab Items */}
                <Route path='/application-types' element={<ManageApplicationTypes />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App
