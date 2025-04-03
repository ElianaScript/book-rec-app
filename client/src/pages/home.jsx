import React from 'react';
import {Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


function Home() {
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
            <Text fontFamily=" 'Bebas Neue' , serif" fontSize="2xl" color="pink.800" mb={4}>
                Do you have novel idea?
            </Text>
            <Text fontFamily=" 'Bebas Neue' , serif" fontSize="2xl" color="pink.600" mb={6}>
                Write short stories daily, and take quizzes to see which book series to read next. Register or log into an existing account below!
            </Text>

        <Link to='/login'>
            <Button
                colorScheme="pink"
                size="lg"
                mb={4}
                _hover={{ bg: 'pink.600', color: 'white' }}
            >
                Login
            </Button>
        </Link>

        <Link to='/register'>
        <Button
        colorScheme="pink"
        size="lg"
        _hover={{ bg: 'pink.600', color: 'white' }}
        >
            Register
        </Button>
    </Link>
</Box>
);
}

export default Home;