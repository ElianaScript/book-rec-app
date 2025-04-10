import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Button
            onClick={handleLogout}
            colorScheme="pink"
            size="lg"
            _hover={{ bg: 'pink.600', color: 'white' }}
        >
            Logout
        </Button>
    );
}

export default LogoutButton;