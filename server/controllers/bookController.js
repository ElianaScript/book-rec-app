import Book from '../models/Book.js';

export const postBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        const userId = req.user.userId;

        const newBook = new Book({
            title,
            author,
            userId,
        });

        await newBook.save();

        res.status(201).json(newBook);
    } catch (err) {
        console.error('Failed to post book:', err);
        res.status(500).json({ message: 'Error posting book' });
    }
};