import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Stack, Button } from '@chakra-ui/react';

function NavTabs() {
    return (
        <Box
            bg="pink.300"
            p={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="center"
        >
            <Text
                fontFamily=" 'Bebas Neue' , serif" 
                fontSize="3xl"
                color="pink.800"
                mb={4}
            >
                ୨⎯ novel idea ⎯୧
            </Text>

            <Stack direction="row" spacing={6}>
                <Link to='/'>
                <Button
                    fontFamily=" 'Bebas Neue' , serif" 
                    colorScheme="pink"
                    variant="link"
                    fontSize="xl"
                    color="pink.800"
                    _hover={{ color: 'pink.100' }}
                >
                    Home
                </Button>
            </Link>

            <Link to='/post'>
            <Button
                fontFamily=" 'Bebas Neue' , serif" 
                colorSceheme="pink"
                variant="link"
                fontSize="xl"
                color="pink.800"
                _hover={{ color: 'pink.100' }}
            >
                Post
            </Button>
        </Link>

        <Link to='/book'>
            <Button
                fontFamily=" 'Bebas Neue' , serif" 
                colorSceheme="pink"
                variant="link"
                fontSize="xl"
                color="pink.800"
                _hover={{ color: 'pink.100' }}
            >
                Book
            </Button>
        </Link>

        <Link to='/quiz'>
            <Button
                fontFamily=" 'Bebas Neue' , serif" 
                colorSceheme="pink"
                variant="link"
                fontSize="xl"
                color='pink.800'
                _hover={{ color: 'pink.100' }}
            >
                Quiz
            </Button>
        </Link>

        <Link to='/profile'>
            <Button
                fontFamily=" 'Bebas Neue' , serif" 
                colorSceheme="pink"
                variant="link"
                fontSize="xl"
                color="pink.800"
                _hover={{ color: 'pink.100' }}
            >
                Profile
            </Button>
        </Link>
     </Stack>
 </Box>
);
};

export default NavTabs;