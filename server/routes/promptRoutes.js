import express from 'express';
import Prompt from '../models/Prompt.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
    console.log(req.body);
    try {
        const { title, description } = req.body;
        const author = req.user.userId;

        const newPrompt = new Prompt({ title, description, author });
        await newPrompt.save();

        res.status(201).json(newPrompt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating prompt' });
    }
});

router.get("/", async (req, res) => {
    try {
        const prompts = await Prompt.find().populate("author", "username").sort({ createdAt: -1 });
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching prompts' });
    }
});

router.post("/:id/response", verifyToken, async (req, res) => {
    try {
        const { text } = req.body;
        const promptId = req.params.id;
        const author = req.user.id;

        const newResponse = new Response({ text, author, prompt: promptId });
        await newResponse.save();

        await Prompt.findByIdAndUpdate(promptId, { $push: { responses: newResponse._id } });

        res.status(201).json(newResponse);
    } catch (error) {
        res.status(500).json({ error: "Error submitting response" });
    }
});

router.post('/:id/like', verifyToken, async (req, res) => {
    try {
        const promptId = req.params.id;
        const updatedPrompt = await Prompt.findByIdAndUpdate(promptId, {$inc: { likes: 1 } }, { new: true });

        res.status(200).json(updatedPrompt);
    } catch (error) {
        res.status(500).json({ error: "Error liking prompt" });
    }
});

export default router;