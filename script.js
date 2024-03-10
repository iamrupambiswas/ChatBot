const url = 'https://chatgpt-gpt5.p.rapidapi.com/ask';

document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();

    const question = document.querySelector('#question').value;

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
            document.getElementById('response').innerHTML = responseData.response;
        })
        .catch(error => console.error('Error:', error));
});
