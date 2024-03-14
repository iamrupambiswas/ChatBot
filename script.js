const url = 'https://chatgpt-gpt5.p.rapidapi.com/ask';

document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    showLoadingIndicator();

    const question = document.querySelector('#question').value;
    displayMessage('user', question);
    addToHistory(question); 

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

    // Clear the input field
    document.getElementById('question').value = '';

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const responseData = data;
            console.log('Data:', responseData.response);

            displayMessage2('bot', responseData.response);


            // Scroll to the bottom to show the latest messages
            scrollChatToBottom();
        })
        .catch(error => {
            console.error('Error:', error);
            displayErrorMessage('An error occurred. Please try again.');
        })
        .finally(() => hideLoadingIndicator());
});


function addToHistory(question) {
    const historyContainer = document.getElementById('historyContainer');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('history-item');
    questionDiv.textContent = question;
    historyContainer.appendChild(questionDiv);
}



document.querySelector('#question').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        showLoadingIndicator();

        const question = document.querySelector('#question').value;
        displayMessage('user', question);
        addToHistory(question);  

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

        // Clear the input field
        document.getElementById('question').value = '';

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                const responseData = data;
                console.log('Data:', responseData.response);

                displayMessage2('bot', responseData.response);


                // Scroll to the bottom to show the latest messages
                scrollChatToBottom();
            })
            .catch(error => {
                console.error('Error:', error);
                displayErrorMessage('An error occurred. Please try again.');
            })
            .finally(() => hideLoadingIndicator());
    }
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






// // Get the div element
// const div = document.querySelector('div');

// // Get the textbox element
// const textbox = document.getElementById('question');

// // Add click event listener to the div
// div.addEventListener('click', function() {
//     // Set the value of the textbox to the text content of the div
//     textbox.value = div.textContent.trim();
// });


document.getElementById('historyContainer').addEventListener('click', function(event) {
    document.getElementById('question').value = '';
    if (event.target.tagName.toLowerCase() === 'div' && !event.target.id) {
        const textbox = document.getElementById('question');
        textbox.value += event.target.textContent.trim() + '\n';
        console.log("Successful!!!")
    }
});
