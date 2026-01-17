import { BrowserRouter, Routes, Route } from 'react-router-dom';

import People from './ManagePeople/ManagePeople';
import ApplicationsDashboard from './ApplicationsDashboard/ApplicationsDashboard';
import ManageUsers from './ManageUsers/ManageUsers';
import LoginForm from './Forms/LoginForm/LoginForm';
import Nav from './Nav/Nav';
import AccountSettings from './AccountSettings/AccountSettings';
import ManageApplicationTypes from './ManageApplicationTypes/ManageApplicationTypes';
import ManageTestTypes from './ManageTestTypes/ManageTestTypes';
import DrivingLicenseDashboard from './DrivingLicensesDashboard/DrivingLicenseDashboard';

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
                <Route path='/applications' element={<ApplicationsDashboard />} />
                <Route path='/people' element={<People />} />
                <Route path='/drivers' element={<Drivers/>} />
                <Route path='/users' element={<ManageUsers />} />
                <Route path='/account-settings' element={<AccountSettings/>} />
                
                {/* Applications Dashboard Items */}
                <Route path='/application-types' element={<ManageApplicationTypes />} />
                <Route path='/test-types' element={<ManageTestTypes />} />
                <Route path='/license-services' element={<DrivingLicenseDashboard />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App
