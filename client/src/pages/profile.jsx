import { useEffect, useState } from 'react';
import { getUserPrompts } from '../api/promptAPI';
import { Box, Heading, VStack, Text, Spinner, Button } from '@chakra-ui/react';
import { set } from 'mongoose';

const Profile = () => {
  const [prompts, setPrompts] = useState([]);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/auth/profile`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch profile');
        const userData = await response.json();
        setLoading(false);
        setUserData(userData);
        setPrompts(userData.prompts);
        setBooks(userData.books);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('/api/books/saved', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch saved books');
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching book", err);
        setBooks([]);
      }
    };

    fetchProfile();
    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete book");


      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };


  const handleUpdate = async (promptId) => {
    const updatedTitle = prompt("Enter new title:");
    const updatedDescription = prompt("Enter new description:");

    if (!updatedTitle || !updatedDescription) return;

    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: updatedTitle, description: updatedDescription }),
      });

      if (!response.ok) throw new Error('Failed to update prompt');

      const updatedPrompt = await response.json();
      setPrompts(prompts.map((prompt) => (prompt._id === promptId ? updatedPrompt : prompt)));
    } catch (error) {
      console.error("Error updating prompt:", error);
    }
  };

  const handleDelete = async (promptId) => {
    if (!window.confirm("Are you sure you want to delete this prompt?")) return;

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

  const favoriteBooks = books.filter((b) => b.category === "favorites");
  const toBeReadBooks = books.filter((b) => b.category === "toRead");

  return (
    <Box bg="pink.100" minH="100vh" p={6}>
      <Heading color="pink.800" size="xl" mb={6}>
        {userData.userName ? `Hello, ${userData.userName}!.𖥔 ݁ ˖   ✦    ‧₊˚ ⋅.𖥔 ݁ ˖   ✦    ‧₊˚ ⋅` : "Loading..."}
      </Heading>

      <Box mb={6}>
        <Heading size="md" color="pink.600">⋆Favorite Books⋆</Heading>
        {favoriteBooks.length > 0 ? (
          <ul>
            {favoriteBooks.map((book) => (
              <li key={book._id}>
                <Text as="span" fontWeight="bold" color="pink.700">
                  {book.title}
                </Text>{' '};
                <Text as="span" color="pink.800">
                  by {book.author}
                </Text>
                <Button
                  size="xs"
                  colorScheme="red"
                  ml={2}
                  onClick={() => handleDeleteBook(book._id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <Text color="gray.600">No favorite books saved.</Text>
        )}
      </Box>

      <Box mb={6}>
        <Heading size="md" color="pink.600">⋆To Be Read⋆</Heading>
        {toBeReadBooks.length > 0 ? (
          <ul>
            {toBeReadBooks.map((book) => (
              <li key={book._id}>
                <Text as="span" fontWeight="bold" color="pink.700">
                  {book.title}
                </Text>{' '};
                <Text as="span" color="pink.800">
                  by {book.author}
                </Text>
                <Button
                  size="xs"
                  colorScheme="red"
                  ml={2}
                  onClick={() => handleDeleteBook(book._id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <Text color="gray.600">No books in your TBR list.</Text>
        )}
      </Box>

      <Box borderBottom="1px solid #ccc" my={4} />

      <Heading color="pink.700" mb={4}>⋆Your Prompts⋆</Heading>
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
              <Heading fontSize="lg" color="pink.800">{prompt.title}</Heading>
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