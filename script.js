const url = 'https://chatgpt-gpt5.p.rapidapi.com/ask';

document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    showLoadingIndicator();

    const question = document.querySelector('#question').value;
    displayMessage('user', question);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'a02f5b90f3mshc436d615efbcb7ap1c470cjsnae3960d36b68',
            'X-RapidAPI-Host': 'chatgpt-gpt5.p.rapidapi.com',
        },
        body: JSON.stringify({
            query: question,
        }),
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const responseData = data;
            console.log('Data:', responseData.response);

            displayMessage2('bot', responseData.response);

            // Clear the input field
            document.getElementById('question').value = '';

            // Scroll to the bottom to show the latest messages
            scrollChatToBottom();
        })
        .catch(error => {
            console.error('Error:', error);
            displayErrorMessage('An error occurred. Please try again.');
        })
        .finally(() => hideLoadingIndicator());
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

function showLoadingIndicator() {
    document.getElementById('loading').style.display = 'inline-block';
}

function hideLoadingIndicator() {
    document.getElementById('loading').style.display = 'none';
}

function displayErrorMessage(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';

    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000); // Hide after 5 seconds (adjust as needed)
}