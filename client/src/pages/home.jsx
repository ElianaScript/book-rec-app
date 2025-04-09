import React from 'react';
import { Box, Button, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
    const amazonAffiliateLink = 'https://www.amazon.com/dp/0307744434?tag=chaptersele03-20'; 

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
            <Text
                fontFamily="'Bebas Neue', serif"
                fontSize="5xl"
                fontWeight="extrabold"
                color="pink.800"
                mb={4}
                textAlign="center"
            >
                Got a <i>novel</i> idea?
            </Text>

            <Text
                fontFamily="'Bebas Neue', serif"
                fontSize="xl"
                color="pink.700"
                mb={6}
                textAlign="center"
            >
                Start your daily writing ritual. Explore thoughtful prompts, <br />
                take quizzes tailored to your reading soul, <br />
                and find stories worth falling into. <br /><br />
                Log in or register to begin your next chapter.
            </Text>

            <Box
                bg="pink.100"
                p={4}
                borderRadius="xl"
                boxShadow="md"
                maxW="md"
                textAlign="center"
                mb={6}
            >
                <Text fontFamily="'Bebas Neue', serif" fontSize="xl" color="pink.700" mb={2}>
                    📚 Book of the Week
                </Text>
                <Text fontWeight="bold" color="pink.800" mb={1}>
                    "The Night Circus" by Erin Morgenstern
                </Text>
                <Text fontSize="sm" color="pink.600" mb={3}>
                    A whimsical, mysterious tale of magic, love, and a circus that only appears at night. I'm obssesed!
                </Text>

                <ChakraLink
                    href={amazonAffiliateLink}
                    isExternal
                    _hover={{ textDecoration: 'none' }}
                >
                    <Button
                        colorScheme="pink"
                        size="sm"
                        variant="solid"
                        _hover={{ bg: 'pink.600' }}
                    >
                        Buy on Amazon
                    </Button>
                </ChakraLink>
            </Box>

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

            <Text
                fontSize="xs"
                color="pink.800"
                mt={8}
                textAlign="center"
                maxW="md"
                px={2}
            >
                As an Amazon Associate, we earn from qualifying purchases. Thanks for supporting your fellow book dev nerd, Eliana!
            </Text>
        </Box>
    );
}

export default Home;
