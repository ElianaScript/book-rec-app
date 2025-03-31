const API_URL = 'http://localhost:5000/api/prompts';

export const createPrompt = async ( promptData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        },
        body: JSON.stringify(promptData)
    });
    return response.json();
};

export const getUserPrompts = async (userId) => {
    const response = await fetch(`${API_URL}/${userId}`);
    return response.json();
}

export default { createPrompt, getUserPrompts };