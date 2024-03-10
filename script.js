const url = 'https://chatgpt-gpt5.p.rapidapi.com/ask';

document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();

    // Get the current value of the input field when the button is clicked
    const question = document.querySelector('#question').value;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'a02f5b90f3mshc436d615efbcb7ap1c470cjsnae3960d36b68',
            'X-RapidAPI-Host': 'chatgpt-gpt5.p.rapidapi.com',
        },
        body: JSON.stringify({
            query: question, // Use the question variable here
        }),
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const responseData = data;
            console.log('Data:', responseData.response);

            // Display the user's question on the left side
            displayMessage('user', question);

            // Display the bot's response on the right side
            displayMessage2('bot', responseData.response);

            // Clear the input field
            document.getElementById('question').value = '';

            // Scroll to the bottom to show the latest messages
            scrollChatToBottom();
        })
        .catch(error => console.error('Error:', error));
});

function displayMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');

    messageElement.classList.add('chat-message', sender);
    messageElement.innerText = message;

    chatMessages.appendChild(messageElement);
}

function displayMessage2(sender, message) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');

  messageElement.classList.add('bot-response', sender);
  messageElement.innerText = message;

  chatMessages.appendChild(messageElement);
}

function scrollChatToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

