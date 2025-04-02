import  { useEffect, useState } from 'react';

const SavedBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async() => {
            const response = await fetch("/api/books/saved", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const data = await response.json();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h2>My Saved Books</h2>
            <ul>
                {Array.isArray(books) && books.length > 0 ? (
                    books.map((book) => (
                        <li key={book._id}>
                            <strong>{book.title}</strong> by {book.author} -{" "}
                            {book.category === "toBeRead" ? "📖 To Be Read" : "⭐ Favorite"}
                        </li>
                    ))
                ) : (
                    <p>No books found or still loading...</p>
                )}
            </ul>
        </div>
    );
}

export default SavedBooks;