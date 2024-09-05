console.log('Check.js loading successfully!');

const textToType = document.getElementById('textToType').innerText;
const inputText = document.getElementById('inputText');
const result = document.getElementById('result');

inputText.addEventListener('input', () => {
    if (inputText.value === textToType) {
        result.innerText = 'Finished!';
    } else {
        result.innerText = '';
    }
});