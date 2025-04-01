import React, { useState} from 'react';

const Login= () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = { userName, password };

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setMessage('Login successful!');
            } else {
                setMessage(data.message || 'Invalid credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Failed to log in.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                type="userName"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            {token && <p>Logged in with token: {token}</p>}
        </div>
    );
};

export default Login;