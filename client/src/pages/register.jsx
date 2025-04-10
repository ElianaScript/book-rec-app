import React, { useState } from 'react';
import { Box, Button, Input, Heading, Text, VStack } from '@chakra-ui/react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
    
        const userData = { email, userName, password };
    
        try {
            const response = await fetch('/api/auth/register', {
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
                setMessage('Thanks for registering! Log in to begin your adventure!');
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
                boxShadow="lg"
                width="100%"
                maxWidth="400px"
                textAlign="center"
            >
                <Heading fontSize="2xl" color="pink.700" mb={4}>
                    Register
                </Heading>

                <form onSubmit={handleRegister}>
                    <VStack spacing={4}>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            bg="white"
                            border="2px solid pink"
                            focusBorderColor="pink.400"
                            color="pink.700"
                        />
                        <Input
                            type="text"
                            placeholder="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            bg="white"
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
                            focusborderColor="pink.400"
                            color="pink.700"
                        />
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            _hover={{ bg: 'pink.600', color: 'white' }}
                        >
                            Register
                        </Button>
                    </VStack>
                </form>

                {message && (
                    <Text mt={4} color={message.includes('succesful') ? 'green.500' : 'red.500'}>
                        {message}
                    </Text>
                )}
            </Box>
        </Box>
    );
};

export default Register;