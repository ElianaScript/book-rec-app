const mongoose = require ('mongoose');

const PromptSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prompt', PromptSchema);