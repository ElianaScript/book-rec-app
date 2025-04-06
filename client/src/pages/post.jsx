import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, VStack, Heading, Text, List, ListItem, Spinner } from '@chakra-ui/react';

function Post() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

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

            await response.json();
            setTitle('');
            setDescription('');
            setSuccess('Prompt posted successfully!');
        } catch (err) {
            setError('Error posting prompt.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={8} bg="pink.300" minHeight="100vh" display="flex" flexDirection="column" alignItems="center">
            <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" width="100%" maxWidth="500px">
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
                        {error && <Text color="red.500">{error}</Text>}
                        {success && <Text color="green.600">{success}</Text>}
                    </VStack>
                </form>
            </Box>
        </Box>
    );
};

export default Post;