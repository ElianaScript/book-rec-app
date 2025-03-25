import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Submitting login...')
        try {
            const { data } = await axios.post('http://localhost:5173/api/auth/login', { email, password });
            setToken(data.token);
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5173/api/auth/register', { email, password });
            setToken(data.token);
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error('Error registering', error);
        }
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <div>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            
            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>

            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
            </button>

            {token && (
                <div>
                    <p>Logged in successfully!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Auth;
