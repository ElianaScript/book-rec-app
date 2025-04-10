import React, { useState} from 'react';
import {Box, Button, Input, Heading, Text, VStack } from '@chakra-ui/react';

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
        <Box
            p={8}
            bg="pink.300"
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                bg="white"
                p={6}
                borderRadius="lg"
                width="100%"
                maxWidth="400px"
                textAlign="center"
            >
                <Heading fontSize="2xl" color="pink.700" mb={4}>
                    Login
                </Heading>

                <form onSubmit={handleLogin}>
                    <VStack spacing={4}>
                        <Input
                            type="text"
                            placeholder="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            requiredbg="white"
                            border="2px solid pink"
                            focusBorderColor="pink.400"
                            color="pink.700"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            bg="white"
                            border="2px solid pink"
                            focusBorderColor="pink.400"
                            color="pink.700"
                        />
                        <Button
                            type="submit"
                            colorScheme="pink"
                            size="lg"
                            _hover={{ bg: 'pink.600', color:'white' }}
                        >
                            Login
                        </Button>
                    </VStack>
            </form>

            {message && (
                <Text mt={4} color={message.includes('successful') ? 'green.500' : 'red.500'}>
                    {message}
                </Text>
            )}
            

            {token && (
                <Text mt={2} fontSize="sm" color="gray.600">
                    Welcome back!
                </Text>
            )}
        </Box>
    </Box>
);
};

export default Login;
