import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from './LoginForm/LoginForm';
import Button from './Button/Button';
import Nav from './Nav/Nav';

const loggedIn = true;  // temporary logged-in bool

function Applications() {
const [ count, setCount ] = useState(0);
  return (
    <>
        <h1>سبحان الله: {count}</h1>
        <Button onClick={() => setCount(count + 1)} color='success'>{count}</Button>
    </>
  );
}

function People() {
  return <h1>People Page</h1>;
}

function Users() {
  return <h1>Users Page</h1>;
}

function Drivers() {
  return <h1>Drivers Page</h1>;
}

function AccountSettings() {
  return <h1>Settings Page</h1>;
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
                <Route path='/people' element={<People/>} />
                <Route path='/drivers' element={<Drivers/>} />
                <Route path='/users' element={<Users/>} />
                <Route path='/account-settings' element={<AccountSettings/>} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App
