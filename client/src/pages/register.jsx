import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
    
        const userData = { email, userName, password };
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                setMessage('Registration successful! Please log in.');
                return data;
            } else {
                const text = await response.text();
                console.error('Unexpected response', text);
                setMessage('Received non-JSON response' + text);
            }
        } catch (error) {
            console.error('Error during registration', error);
            setMessage('Failed to register.');

        }
    };
    

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type= "text"
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
                <button type="submit">Register</button>
                </form>
                {message && <p>{message}</p>}
        </div>
    );
};

export default Register;