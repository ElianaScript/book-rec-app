import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: { type: String, required: true },
    books: [
        {
            title: { type: String, required: true },
            author: { type: String, required: true },
            coverImage: { type: String, required: true },
        }
    ],
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);