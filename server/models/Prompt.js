import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true},
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }],
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Prompt = mongoose.model("Prompt", PromptSchema)
export default Prompt;