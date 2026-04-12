import { Routes, Route, Navigate } from 'react-router-dom';

import People from './ManagePeople/ManagePeople.js';
import ApplicationsDashboard from './ApplicationsDashboard/ApplicationsDashboard.js';
import ManageUsers from './ManageUsers/ManageUsers.js';
import LoginForm from './Forms/LoginForm/LoginForm.js';
import AccountSettings from './AccountSettings/AccountSettings.js';
import ManageApplicationTypes from './ManageApplicationTypes/ManageApplicationTypes.js';
import ManageTestTypes from './ManageTestTypes/ManageTestTypes.js';
import DrivingLicenseDashboard from './DrivingLicensesDashboard/DrivingLicenseDashboard.js';
import { WithNavLayout } from './withNavLayout.js';
import ManageLocalApplications from './ManageLocalApplications/ManageLocalApplications.js';
import ManageInternationalApplications from './ManageInternationalApplications/ManageInternationalApplications.js';
import ManageDrivers from './ManageDrivers/ManageDrivers.js';
import ManageDetainedLicenses from './ManageDetainedLicenses/ManageDetainedLicenses.js';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path='/login' element={<LoginForm />} />
          <Route element={<WithNavLayout />}>
            <Route path='/applications' element={<ApplicationsDashboard />} />
            <Route path='/people' element={<People />} />
            <Route path='/drivers' element={<ManageDrivers />} />
            <Route path='/users' element={<ManageUsers />} />
            <Route path='/account-settings' element={<AccountSettings />} />

            {/* Applications Dashboard Items */}
            <Route path='/local-driving-license-applications' element={<ManageLocalApplications />} />
            <Route path='/international-driving-license-applications' element={<ManageInternationalApplications />} />
            <Route path='/detained-licenses' element={<ManageDetainedLicenses />} />

            <Route path='/application-types' element={<ManageApplicationTypes />} />
            <Route path='/test-types' element={<ManageTestTypes />} />
            <Route path='/license-services' element={<DrivingLicenseDashboard />} />
          </Route>  
        </Routes>
    </>
  );
}

export default App
