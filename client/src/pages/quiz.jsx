import '../index.css';
import React, { useState } from 'react';

const Quiz = () => {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedAuthorType, setSelectedAuthorType] = useState(null);
    const [recommendedBooks, setRecommendedBooks] = useState([]);


const genres = ['Romance', 'SciFi / Fantasy', 'Horror', 'Mystery'];

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
    {text: "Who are these people?,", type:"None"},
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
    },
    Fantasy: {
        Modern: ["Throne of Glass series by Sarah J. Maas", "Psy-Changeling series by Nalini Singh"],
        Classic: ["Neuromancer by William Gibson", "The Three Body Problem by Liu Cixin"],
    },
    Horror: {
        Modern: ["Carrie by Stephen King", "The Mist in The Mirror by Susan Hill"],
        Classic: ["House of Leaves by Mark Z. Danielwski", "The Little Stranger by Sarah Waters"],
    },
    Mystery: {
        Modern: ["And Then There Were None by Agatha Christie", "The Likeness by Tana French"],
        Classic: ["The Girl on the Train by Paula Hawkins", "The Silent Patient by Alex Michaelides"]
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
        await fetch("https://localhost:5173/save-response", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ genre: selectedGenre, authorType, books }),
        });
    } catch (error) {
        console.error("Failed to save response:", error);
    }
};

return (
    <div>
    <h1>What we think you should be reading...</h1>
       {!selectedGenre ? (
        <>

    <h2>What genre do you like best?</h2>
        {genres.map((genre) => (
            <button key={genre} onClick={() => handleGenreSelection(genre)}>
                {genre}
        </button>
     ))}
</>
) : !selectedAuthorType ? (
        <>
           <h2>{authorQuestions[selectedGenre]?.question}</h2>
           {authorQuestions[selectedGenre]?.options.map((option) => (
                <button key={option.text} onClick={() => handleAuthorSelection(option.type)}>
                    {option.text}
                </button>
            ))}
        </>
    ) : (
        <>
        <h2>Reccommended Books:</h2>
        <ul>
            {recommendedBooks.map((book) => (
                <li key={book}>{book}</li>
            ))}
        </ul>
     </>
)}
</div>
);
};

export default Quiz;