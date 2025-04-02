import { useState } from "react";

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
    <div>
      <h2>Search for Books</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter book title or author..."
      />
      <button onClick={searchBooks}>Search</button>

      <ul>
        {books.map((book) => (
          <li key={book.key}>
            <strong>{book.title}</strong> by {book.author_name?.join(", ")}
            <button onClick={() => onBookSelect(book)}>Save</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
