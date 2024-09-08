var target = '';

document.addEventListener('DOMContentLoaded', () => {
  fetch('/random-text')
    .then(res => res.json())
    .then(data => {
      document.getElementById('textToType').innerText = data.text;
      target = data.text;
    })
    .catch(error => console.error('Error fetching text:', error));
});

const inputText = document.getElementById('inputText');
const result = document.getElementById('result');

console.log(target);

inputText.addEventListener('input', () => {
    if (inputText.value === target) {
        result.innerText = 'Finished!';
    } else {
        result.innerText = inputText.value;
    }
});
