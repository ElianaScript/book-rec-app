import { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Heading,
  Link as ChakraLink,
  HStack,
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

        <Button
          colorScheme="pink.100"
          size="sm"
          variant="solid"
          _hover={{ bg: 'pink.600', color: "white" }}
          onClick={searchBooks}
        >
          Search
        </Button>

        {books.map((book) => {
          const isbn13 = book.isbn?.find((id) => id.length === 13);
          const isbn10 = book.isbn?.find((id) => id.length === 10);
          const isbn = isbn13 || isbn10;

          const amazonLink = isbn
            ? `https://www.amazon.com/dp/${isbn}?tag=chaptersele03-20`
            : `https://www.amazon.com/s?k=${encodeURIComponent(
              book.title + " " + (book.author_name?.[0] || "")
            )}&tag=chaptersele03-20`;

          return (
            <Box
              key={book.key}
              bg="pink.100"
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


              <HStack mt={2} spacing={3}>
                <Button
                  size="sm"
                  colorScheme="pink"
                  onClick={() => onBookSelect(book)}
                  color="pink.700"
                  variant="solid"
                  _hover={{ bg: 'pink.600', color: "white" }}
                >
                  Save
                </Button>
                <ChakraLink href={amazonLink} isExternal>
                  <Button
                    size="sm"
                    colorScheme="gray"
                    _hover={{ bg: 'pink.600', color: "white" }}
                    color="pink.700"
                  >
                    Buy on Amazon
                  </Button>
                </ChakraLink>
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
};

export default BookSearch;
