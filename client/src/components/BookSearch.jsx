import { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";

const BookSearch = ({ onBookSelect }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    if (!query) return;
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=10`
    );
    const data = await response.json();
    setBooks(data.docs);
  };

  return (
    <Box maxW="600px" mx="auto" p={4} color="pink.700">
      <VStack spacing={4} align="stretch">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter book title or author..."
          outline="solid"
          outlineColor="pink.700"
          _focus={{ outlineColor: "pink.500" }}
          borderColor="pink.700"
          _placeholder={{ color: "pink.700" }}
          borderWidth="2px"
          borderRadius="md"
          boxShadow="sm"
          _hover={{ borderColor: "pink.500" }}
          _active={{ borderColor: "pink.500" }}
          size="lg"
          fontSize="lg"
          color="pink.700"
        />
        <Button colorScheme="teal" onClick={searchBooks}>
          Search
        </Button>

        {books.map((book) => (
          <Box
            key={book.key}
            bg="gray.100"
            p={4}
            borderRadius="md"
            boxShadow="sm"
          >
            <Heading size="sm" mb={2}>
              {book.title}
            </Heading>
            <Text fontSize="sm" color="gray.600">
              by {book.author_name?.join(", ") || "Unknown author"}
            </Text>
            <Button
              size="sm"
              colorScheme="teal"
              mt={2}
              onClick={() => onBookSelect(book)}
            >
              Save
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default BookSearch;
