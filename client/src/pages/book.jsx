import BookSearch from "../components/BookSearch";

const Book = () => {
    const handleBookSelect = async (book) => {
        const savedBook = {
            title: book.title,
            author: book.author_name?.join(", "),
            openLibraryId: book.key,
            category,
        };

        const response = await fetch('/api/books/save', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savedBook),
        });

        if (response.ok) {
            alert("Book saved!");
        } else {
            alert("Failed to save book.");
        }
    };

    return (
        <div>
            <h1>Book Search</h1>
            <BookSearch onBookSelect ={handleBookSelect} />
                <button onClick={() => handleBookSelect(book, "toBeRead")}>📖 To Be Read</button>
                <button onClick={() => handleBookSelect(book, "favorites")}>⭐ Favorite</button>

        </div>
    );
};

export default Book;