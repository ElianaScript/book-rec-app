import React, { useState } from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

const Quiz = () => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedAuthorType, setSelectedAuthorType] = useState(null);
    const [recommendedBooks, setRecommendedBooks] = useState([]);


const genres = ['Romance', 'Fantasy', 'Horror', 'Mystery'];

const authorQuestions= {
Romance: { 
question: "Which of these romance authors have you read?",
options: [
    {text: "Tessa Bailey", type: 'Modern'},
    {text: "Ali Hazelwood", type: 'Modern'},
    {text: "Sarah Adams", type: 'Classic'},
    {text: "Jenny Holiday", type: 'Classic'},
    {text: "Who are these people?", type: 'None'},
]
},
Fantasy: { 
question: "Which of these SciFi / Fantasy authors have you read?",
options: [
    {text: "Sarah J. Maas", type: 'Modern'},
    {text: "Nalini Singh", type: 'Modern'},
    {text: "Ursula Le Guin", type: 'Classic'},
    {text: "Issac Asimov", type: 'Classic'},
    {text: "Who are these people?", type:"None"},
]
},
Horror: { 
question: "Which of these Horror authors have you read?",
options: [
    {text: "Stephen King", type: 'Modern'},
    {text: "Susan Hill", type: 'Modern'},
    {text: "Shirley Jackson", type: 'Classic'},
    {text: "Dean Koontz", type: 'Classic'},
    {text: "Who are these people?", type: 'None'}
]
},
Mystery: { 
question: "Which of these Mystery authors have you read?",
options: [
    {text: "Agatha Christie", type: 'Modern'},
    {text: "Tana French", type: 'Modern'},
    {text: "Gillian Flynn", type: 'Classic'},
    {text: "Donna Tartt", type: 'Classic'},
    {text: "Who are these people?", type: 'None'}
]
}
};

const bookRecommendations = {
    Romance: {
        Modern: ["Pride and Prejudice by Jane Austen", "Beach Read by Emily Henry"],
        Classic: ["Love on The Brain by Ali Hazelwood", "Fangirl Down by Tessa Bailey"],
        None: ["The Paper Swan by Leylah Attar", "The Night Mark by Tiffany Reisz"],
    },
    Fantasy: {
        Modern: ["Throne of Glass series by Sarah J. Maas", "Psy-Changeling series by Nalini Singh"],
        Classic: ["Neuromancer by William Gibson", "The Three Body Problem by Liu Cixin"],
        None: ["The Long Price Quartet by Daniel Abraham", "The Mirror Empire by Kameron Hurley"],
    },
    Horror: {
        Modern: ["Carrie by Stephen King", "The Mist in The Mirror by Susan Hill"],
        Classic: ["House of Leaves by Mark Z. Danielwski", "The Little Stranger by Sarah Waters"],
        None: ["The Fisherman by John Langan", "The Ballad of Black Tom by Victor LaValle"],
    },
    Mystery: {
        Modern: ["And Then There Were None by Agatha Christie", "The Likeness by Tana French"],
        Classic: ["The Girl on the Train by Paula Hawkins", "The Silent Patient by Alex Michaelides"],
        None: ["The Devotion of Suspect X by Keigo Higashino", "In the Woods by Tana French"],
    },
};


const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    setSelectedAuthorType(null);
    setRecommendedBooks([]);
};

const handleAuthorSelection = async (authorType) => {
    setSelectedAuthorType(authorType);

    const books = bookRecommendations[selectedGenre]?.[authorType] || [];
    setRecommendedBooks(books);

    try {
        await fetch("api/save-response", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ genre: selectedGenre, authorType, books }),
        });

        if (!response.ok) throw new Error("Failed to save response");
    } catch (error) {
        console.error("Failed to save response:", error);
    }
};

return (
    <Box bg="pink.300" minH="100vh" p={6} textAlign="center" color="pink.700">
        <Heading color="pink.800" mb={4}>What we think you should be reading...</Heading>

        {!selectedGenre ? (
            <VStack spacing={4}>
                <Text fontSize="lg" color="pink.700">What genre do you like best?</Text>
                {genres.map((genre) => (
                    <Button
                        key={genre}
                        colorScheme="pink"
                        variant="solid"
                        onClick={() => handleGenreSelection(genre)}
                        color="pink.800"
                    >
                        {genre}
                    </Button>
                ))}
            </VStack>
        ) : !selectedAuthorType ? (
            <VStack spacing={4}>
                <Heading fontSize="lg" color="pink.700">{authorQuestions[selectedGenre]?.question}</Heading>
                {authorQuestions[selectedGenre]?.options.map((option) => (
                    <Button
                        key={option.text}
                        colorScheme="pink"
                        variant="solid"
                        onClick={() =>  handleAuthorSelection(option.type)}
                    >
                        {option.text}
                    </Button>
                ))}   
            </VStack>
        ) : (
            <VStack spacing={4}>
                <Heading fontSize="lg" color="pink.700">Recommended Books:</Heading>
                <Box bg="white" p={4} borderRadius="lg" boxShadow="md">
                    <ul>
                        {recommendedBooks.map((book) => (
                             <Text key={book} color="gray.700">{book}</Text>
                            ))}
                        </ul>
                    </Box>
                </VStack>
            )}
        </Box>
    );
};
export default Quiz;