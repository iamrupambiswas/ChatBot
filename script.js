// const url = 'https://chatgpt-gpt5.p.rapidapi.com/ask';
// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/json',
// 		'X-RapidAPI-Key': 'a02f5b90f3mshc436d615efbcb7ap1c470cjsnae3960d36b68',
// 		'X-RapidAPI-Host': 'chatgpt-gpt5.p.rapidapi.com'
// 	},
// 	"body": {
// 		"query": "How to become rich?"
// 	}
// };

// try {
//     (async () => {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
//     })();
// } catch (error) {
// 	console.error(error);
// }


const url = 'https://chatgpt-gpt5.p.rapidapi.com/ask';

const question = document.querySelector('#question').value;



document.querySelector('button').addEventListener('click', (event) => {

    event.preventDefault();
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'a02f5b90f3mshc436d615efbcb7ap1c470cjsnae3960d36b68',
    'X-RapidAPI-Host': 'chatgpt-gpt5.p.rapidapi.com',
  },
  body: JSON.stringify({
    query: `${question}`,
  }),
};

fetch(url, options)
  .then(response => response.json())
  .then(data => {
    const responseData = data; // Assign the data to the variable
    console.log('Data:', responseData.response);

    document.getElementById('response').innerHTML = responseData.response;
  })
  .catch(error => console.error('Error:', error));
});