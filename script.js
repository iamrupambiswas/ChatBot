const url = 'https://chatgpt-gpt5.p.rapidapi.com/ask';

// to trigger the query with button click
document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    handleUserInput();
});


// to trigger the query with enter button
document.querySelector('#question').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleUserInput();
    }
});


// triggering function
function handleUserInput() {
    showLoadingIndicator();

    const question = document.querySelector('#question').value;
    displayQuery('user', question);
    addToHistory(question);
    scrollChatToBottom();

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'b9166633cdmshceba72a0b61f461p1500c6jsndd599ae6b431',
            'X-RapidAPI-Host': 'chatgpt-gpt5.p.rapidapi.com'
        },
        body: JSON.stringify({
            query: question,
        }),
    };

    // Clear the input field
    document.getElementById('question').value = '';

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const responseData = data;
            console.log('Data:', responseData.response);

            displayResponse('bot', responseData.response);
        })
        .catch(error => {
            console.error('Error:', error);
            displayErrorMessage('An error occurred. Please try again.');
        })
        .finally(() => hideLoadingIndicator());
}


function displayResponse(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('response-container');
    
    const imageElement = document.createElement('img');
    imageElement.src = "./Bot.png";
    imageElement.classList.add('message-image');
    messageContainer.appendChild(imageElement);

    // Create message div
    const messageElement = document.createElement('div');
    messageElement.classList.add('response', sender);
    messageElement.innerText = message;
  
    // Append message div to message container
    messageContainer.appendChild(messageElement);

  
    // Append the message container to the chat messages
    chatMessages.appendChild(messageContainer);
}

  
function displayQuery(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('query-container');

    // Create message div
    const messageElement = document.createElement('div');
    messageElement.classList.add('query', sender);
    messageElement.innerText = message;

    // Append message div to message container
    messageContainer.appendChild(messageElement);

    const imageElement = document.createElement('img');
    imageElement.src = "./Human.png";
    imageElement.classList.add('user-image');
    messageContainer.appendChild(imageElement);

    // Append the message container to the chat messages
    chatMessages.appendChild(messageContainer);
}


// to add the query to the history
function addToHistory(question) {
    const historyContainer = document.getElementById('historyContainer');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('history-item');
    questionDiv.textContent = question;
    historyContainer.appendChild(questionDiv);
}


function scrollChatToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoadingIndicator() {
    document.getElementById('loading').style.display = 'flex';
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


document.getElementById('historyContainer').addEventListener('click', function(event) {
    document.getElementById('question').value = '';
    if (event.target.tagName.toLowerCase() === 'div' && !event.target.id) {
        const textbox = document.getElementById('question');
        textbox.value += event.target.textContent.trim() + '\n';
        console.log("Successful!!!")
    }
});