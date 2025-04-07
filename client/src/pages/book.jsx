import { Box, Button, Heading, VStack, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import BookSearch from "../components/BookSearch";

const Book = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookSelect = (book) => {
    if (!book) return;
    const selected = {
      title: book.title,
      author: book.author_name?.join(", ") || "Unknown Author",
      openLibraryId: book.key,
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : "https://via.placeholder.com/150",
    };
    setSelectedBook(selected);
  };

  const saveBook = async (category) => {
    if (!selectedBook) return;

    const bookToSave = {
      ...selectedBook,
      category,
    };

    const response = await fetch('/api/books/save', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(bookToSave),
    });

    if (response.ok) {
      alert(`Book saved to ${category}!`);
    } else {
      alert("Failed to save book :(");
    }
  };

  return (
    <Box bg="pink.300" minH="100vh" p={5} textAlign="center">
      <Heading fontSize="2xl" color="pink.600" mb={4}>Book Search</Heading>

      <BookSearch onBookSelect={handleBookSelect} />

      <VStack spacing={4} mt={5}>
        <Button
          colorScheme="pink"
          size="lg"
          _hover={{ bg: 'pink.600', color: 'white' }}
          onClick={() => saveBook("toRead")}
          isDisabled={!selectedBook}
        >
          To Be Read
        </Button>
        <Button
          colorScheme="pink"
          size="lg"
          _hover={{ bg: 'pink.600', color: 'white' }}
          onClick={() => saveBook("favorites")}
          isDisabled={!selectedBook}
        >
          Favorites
        </Button>
      </VStack>

      {selectedBook && (
        <Box mt={6} p={4} bg="white" borderRadius="md" boxShadow="md">
          <Image
            src={selectedBook.coverUrl}
            alt={selectedBook.title}
            boxSize="150px"
            mx="auto"
            mb={3}
          />
          <Text fontSize="lg" color="pink.700" fontWeight="bold">{selectedBook.title}</Text>
          <Text fontSize="md" color="pink.500">{selectedBook.author}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Book;
