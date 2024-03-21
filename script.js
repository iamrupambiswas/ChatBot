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


// to load the questions stored in the history container to the searchbar
document.getElementById('historyContainer').addEventListener('click', function(event) {
    document.getElementById('question').value = '';
    if (event.target.tagName.toLowerCase() === 'div' && !event.target.id) {
        const textbox = document.getElementById('question');
        textbox.value += event.target.textContent.trim() + '\n';
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const menuElements = document.querySelectorAll(".menu-element");
    const textbox = document.getElementById("question");

    menuElements.forEach(function (element) {
        element.addEventListener("click", function () {
            textbox.value = this.querySelector("h4").textContent + "\n";
            // + this.querySelector("p").textContent;
        });
    });
});


// triggering function
function handleUserInput() {
    showLoadingIndicator();

    document.getElementById('menu').style.display = 'none';
    document.getElementById('primary').style.display = 'none';
    const question = document.querySelector('#question').value;
    displayQuery('user', question);
    document.getElementById('historyContainer').style.display = 'flex';
    document.getElementById('main-container').style.justifyContent = 'space-between';
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
        .finally(() => {
            hideLoadingIndicator();
        });
}


// function to display the response of the bot
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

  
// function to display the user query
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


// function to add the user query to the history
function addToHistory(question) {
    const historyContainer = document.getElementById('historyContainer');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('history-item');
    questionDiv.textContent = question;
    historyContainer.appendChild(questionDiv);
}


// function to scroll down to the recent most query after calling the triggering function
function scrollChatToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// function to show the loading ellipses while fetching the bot responses
function showLoadingIndicator() {
    document.getElementById('loading').style.display = 'flex';
}


// function to hide the loading ellipses when the bot response is generated
function hideLoadingIndicator() {
    document.getElementById('loading').style.display = 'none';
}


// function to display error messages
function displayErrorMessage(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';

    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000); // Hide after 5 seconds (adjust as needed)
}
