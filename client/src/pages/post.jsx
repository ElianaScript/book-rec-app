import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, VStack, Heading, Text, List, ListItem, Spinner } from '@chakra-ui/react';

function Post() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState('');
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const [updatePrompt, setUpdatePrompts] = useState('');
    const [deletePrompt, setDeletePrompt] = useState('');

useEffect(() => {
    const fetchPrompts = async () => {
        try {
            const response = await fetch('/api/prompts');
            if (!response.ok) throw new Error('Failed to fetch prompts');
            const data = await response.json();
            console.log(data)
            setPrompts(data);
        } catch (err) {
            setError('Error fetching prompts');
            console.error(err);
        } finally {
            setFetching(false);
        }
    };

    fetchPrompts();
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newPrompt = { title, description };

    try {
        const response = await fetch('/api/prompts', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(newPrompt),
        });

        if (!response.ok) throw new Error('Failed to post prompt');

            const data = await response.json();
            setPrompts((prevPrompts) => [data, ...prevPrompts]);
            setTitle('');
            setDescription('');
        } catch (err) {
            setError('Error posting prompt.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={8} bg="pink.300" minHeight="100vh" display="flex" flexDirection="column" alignItems="center">
            <Box bg="white" p={6} boxRedius="lg" boxShadow="lg" width="100%" maxWidth="500px">
                <Heading fontSize="2xl" color="pink.700" mb={4}>
                    Write your own prompt
                </Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <Input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            bg="white"
                            border="2px solid pink"
                            focusBorderColor="pink.400"
                            color="pink.700"
                        />
                        <Textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            bg="white"
                            border="2px solid pink"
                            focusBorderColor="pink.400"
                            color="pink.700"
                        />
                        <Button type="submit" colorScheme="pink" size="lg" isLoading={loading}>
                            Post Prompt
                        </Button>    
                   </VStack>
                </form>
            </Box>

            <Box mt={8} width="1--%" maxWidth="500px">
                <Heading fontSize="xl" color="pink.700">
                    Previous Prompts:
                </Heading>

                {fetching ? (
                    <Spinner mt={4} color="pink.500" />
                ) : prompts.length === 0 ? (
                    <Text mt={2}>No prompts available yet!</Text>
                ) : (
                    // <List mt={4} spacing={3}>
                    //     {prompts.map((prompt) => (
                    //         <ListItem key={prompt._id} p={4} borderWidth="1px" borderRadius="lg" bg="white">
                    //             <Heading fontSize="lg" color="pink.800">{prompt.title}</Heading>
                    //         </ListItem>
                    //     ))}
                    // </List>
                    <>
                    {
                        prompts.map(prompt => {
                            return (
                                <Box key={prompt._id} p={4} borderWidth="1px" borderRadius="lg" bg="white" mb={4}>
                                    <Heading fontSize="lg" color="pink.800">{prompt.title}</Heading>
                                    <Text mt={2} color="pink.600">{prompt.description}</Text>
                                </Box>
                            )
                        })
                    }
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Post;