import Prompt from '../models/Prompt.js';

export const postPrompt = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.userId;

        const newPrompt = new Prompt({
            title,
            description,
            author: userId,
            createdAt: new Date(),
        });

        await newPrompt.save();

        res.status(201).json(newPrompt);
    } catch (err) {
        console.error('Failed to post prompt:', err);
        res.status(500).json({ message: 'Error posting prompt' });
    }
};