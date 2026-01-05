const API_KEY = "YOUR_KEY_HERE"; // PASTE YOUR KEY HERE
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function getResponse(prompt) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}-message`;
    msgDiv.innerText = text;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
    const text = userInput.value;
    if (!text) return;

    appendMessage('user', text);
    userInput.value = '';

    try {
        const aiResponse = await getResponse(text);
        appendMessage('ai', aiResponse);
    } catch (error) {
        appendMessage('ai', "Error connecting to Gemini. Check your API key.");
    }
});
