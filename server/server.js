import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from "./routes/authRoutes.js";
import { User } from './models/User.js'
import promptRoutes from './routes/promptRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET_KEY = process.env.JWT_SECRET || '';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/prompts', promptRoutes);

app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
});




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
