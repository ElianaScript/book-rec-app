import { useState } from 'react';
import { createPrompt } from '../api/promptAPI';

const PromptForm =({ token, onPromptCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPrompt = await createPrompt(token, { title, description });
        if (newPrompt) {
            onPromptCreated(newPrompt);
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type = "text"
            placeholder = 'Title'
            value = {title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
            <textarea
            placeholder = "Write your prompt..."
            value = "Description"
            onChange = {(e) => setDescription(e.target.value)}
            />
            <button type = "submit">Submit Prompt</button>
        </form>
    );
};

export default PromptForm;