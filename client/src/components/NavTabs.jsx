import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Stack, Button } from '@chakra-ui/react';

function NavTabs() {
    return (
        <Box
            bg="pink.200"
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
                novel idea
            </Text>

            <Stack direction="row" spacing={6}>
                <Link to='/'>
                <Button
                    colorScheme="pink"
                    variant="link"
                    fontSize="xl"
                    _hover={{ color: 'pink.600' }}
                >
                    Home
                </Button>
            </Link>

            <Link to='/post'>
            <Button
                colorSceheme="pink"
                variant="link"
                fontSize="xl"
                _hover={{ color: 'pink.600' }}
            >
                Post
            </Button>
        </Link>

        <Link to='/book'>
            <Button
                colorSceheme="pink"
                variant="link"
                fontSize="xl"
                _hover={{ color: 'pink.600' }}
            >
                Book
            </Button>
        </Link>

        <Link to='/quiz'>
            <Button
                colorSceheme="pink"
                variant="link"
                fontSize="xl"
                _hover={{ color: 'pink.600' }}
            >
                Quiz
            </Button>
        </Link>

        <Link to='/profile'>
            <Button
                colorSceheme="pink"
                variant="link"
                fontSize="xl"
                _hover={{ color: 'pink.600' }}
            >
                Profile
            </Button>
        </Link>
     </Stack>
 </Box>
);
};

export default NavTabs;