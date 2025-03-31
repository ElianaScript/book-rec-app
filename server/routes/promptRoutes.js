import express from 'express';
const router = express.Router();
const Prompt = require('../models/Prompt');
const { verifyToken } = require('../middleware/auth')

router.get('/', verifyToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newPrompt = new Prompt({
            title,
            description,
            author: req.user.id
        });
        await newPrompt.save();
        res.status(200).json(newPrompt);
    } catch (error) {
        res.status(500).json({ error: 'Error creating prompt'});
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const prompts = await Prompt.find({ author: req.params.userId }).populate('author', 'username' );
        res.json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching prompts' });
    }
});

router.post('/prompts', async (req,res) => {
    const {title, description } = req.body;

    if( !title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    try {
        const newPrompt = new Prompt({
            title, 
            description,
            author: req.user._id,
        });

        const savedPrompt = await newPrompt.save();
        res.json(savedPrompt);
    } catch (error) {
        console.error('Error saving prompt', error);
        resizeTo.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;