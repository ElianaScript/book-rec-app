import { useEffect, useState } from 'react';
import { getUserPrompts } from '../api/promptAPI';
import { useParams } from 'react-router-dom';
import SavedBooks from '../components/SavedBooks';
import { Box, Heading, VStack, Text, Spinner, Button } from '@chakra-ui/react';

const Profile = () => {
  const { userId } = useParams();
  const [prompts, setPrompts] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/auth/profile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if(!response.ok) throw new Error ('Failed to fetch profile');

        const userData = await response.json();
        console.log(userData.userName);
        setUserName(userData.userName);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchPrompts = async () => {
      try {
        const userPrompts = await getUserPrompts(userId);
        setPrompts(userPrompts);
      } catch (error) {
        console.error("Error fetching user prompts:", error);
        setPrompts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchPrompts();
  }, [userId]);

  const handleUpdate = async (promptId) => {
    const updatedTitle = prompt("Enter new title:");
    updatedDescription = prompt("Enter new description:");

    if(!updatedTitle || !updatedDescription) return;

    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: updatedTitle, description: updatedDescription }),
        });

        if(!response.ok) throw new Error('Failed to update prompt');

        const updatedPrompt = await response.json();
        setPrompts(prompts.map((prompt) => (prompt._id === promptId ? updatedPrompt : prompt)));
      } catch (error) {
        console.error("Error updating prompt:", error);
      }
    };

    const handleDelete = async (promptId) => {
      if(!window.confirm("Are you sure you want to delete this prompt?")) return;

      try {
        const response = await fetch(`/api/prompts/${promptId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to delete prompt");

        setPrompts(prompts.filter((prompt) => prompt._id !== promptId));
      } catch (error) {
        console.error("Error deleting prompt:", error);
      }
    };

    return (
      <Box bg="pink.300" minH="100vh" p={6} textAlign="center" color="pink.700">
        <SavedBooks />
        <Heading color="pink.800" mb={4}>
          {userName ? `${userName}'s Profile` : "Loading..."}
        </Heading>
  
        {loading ? (
          <Spinner size="xl" color="pink.500" />
        ) : prompts.length > 0 ? (
          <VStack spacing={4} align="start">
            {prompts.map((prompt) => (
              <Box
                key={prompt._id}
                bg="white"
                p={4}
                borderRadius="lg"
                boxShadow="md"
                width="100%"
                maxW="600px"
                textAlign="left"
              >
                <Heading fontSize="lg" color="pink.800">
                  {prompt.title}
                </Heading>
                <Text color="gray.700">{prompt.description}</Text>
                <Button size="sm" colorScheme="pink" onClick={() => handleUpdate(prompt._id)} mt={2} mr={2}>
                  Update
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(prompt._id)} mt={2}>
                  Delete
                </Button>
              </Box>
            ))}
          </VStack>
        ) : (
          <Text fontSize="lg" color="pink.800">No prompts yet!</Text>
        )}
      </Box>
    );
  };
  
  export default Profile;