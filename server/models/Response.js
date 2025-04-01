import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    prompt: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' },
    createdAt: { type: Date, default: Date.now }
});

const Response = mongoose.model("Response", responseSchema);
export default Response;