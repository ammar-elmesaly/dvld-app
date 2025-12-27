import '../styles/App.css';
import { useState } from 'react';
import LoginForm from './LoginForm';
import Button from './ui/Button';

const loggedIn = false;  // temporary logged-in bool

function App() {
    const [ count, setCount ] = useState(0);

    if (!loggedIn) {
        return (
            <LoginForm />
        );
    }

    return (
        <>
            <h1>I love pizza</h1>
            <Button onClick={() => setCount(count + 1)} color='success'>{count}</Button>
        </>
    );
}

export default App
