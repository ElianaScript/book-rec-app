import express from 'express';
import Book from '../models/Book.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save', verifyToken, async (req, res) => {
    const { title, author, openLibraryId, category } = req.body;
    const userId = req.user.userId;
    
    try {
        const book = await Book.insertOne ({ title, author, openLibraryId, userId, category });
        res.status(201).json({ message: "Book saved successfully!" });
    } catch (error) {
        console.error("Error saving book:", error);
        res.status(500).json({ error: "Error saving book." });
    }
});

router.get("/saved", verifyToken, async (req, res) => {
    try {
        const books = await Book.find({ userId: req.user.id });
        res.json(books);
    } catch ( error) {
        res.status(500).json({ error: "Failed to fetch saved books." });
    }
});

export default router;