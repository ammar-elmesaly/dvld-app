import { Routes, Route, Navigate } from 'react-router-dom';

import People from './ManagePeople/ManagePeople';
import ApplicationsDashboard from './ApplicationsDashboard/ApplicationsDashboard';
import ManageUsers from './ManageUsers/ManageUsers';
import LoginForm from './Forms/LoginForm/LoginForm';
import AccountSettings from './AccountSettings/AccountSettings';
import ManageApplicationTypes from './ManageApplicationTypes/ManageApplicationTypes';
import ManageTestTypes from './ManageTestTypes/ManageTestTypes';
import DrivingLicenseDashboard from './DrivingLicensesDashboard/DrivingLicenseDashboard';
import { WithNavLayout } from './withNavLayout';
import ManageLocalApplications from './ManageLocalApplications/ManageLocalApplications';
import ManageInternationalApplications from './ManageInternationalApplications/ManageInternationalApplications';
import ManageDrivers from './ManageDrivers/ManageDrivers';
import ManageDetainedLicenses from './ManageDetainedLicenses/ManageDetainedLicenses';

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
