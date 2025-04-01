import React, { useState } from 'react';

function Post() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prompts, setPrompts] = useState('');
    const [loading, setLoading] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newPrompt = {
            title: title,
            description: description,
        };

        try {
            const response = await fetch('/api/prompts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPrompt),
            });

            if (response.ok) {
                const data = await response.json();
                setPrompts((prevPrompts) => [data, ...prevPrompts]);
                setTitle('');
                setDescription('');
            } else {
                console.error('Error posting prompt:', response.statusText);
            } 
        } catch (error) {
            console.error('Error posting prompt', error);
        } finally {
            setLoading(false);
        }
    };

return (
    <div>
        <h1>Write your own Prompt</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                required
                />
            </div>
            <button type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Prompt'}
                </button>
            </form>


            <h2>Previous Prompts:</h2>
            {prompts.length === 0 ? (
                <p>No prompts available yet.</p>
            ) : (
                <ul>
                    {prompts.map((prompt) => (
                        <li key={prompt._id}>
                            <h3>{prompt.title}</h3>
                            <p>{prompt.description}</p>
                            <small>By {prompt.author?.username || 'Unknown Author'}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Post;