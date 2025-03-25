import User from '../models/User.js'
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists'});

        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isPasswordCorrect= await user.matchPassword(password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials "});

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
};
