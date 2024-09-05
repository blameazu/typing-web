const FilesPath = '../../resource/sentence/';
const textFiles = [
  `${FilesPath}1.txt`, 
  `${FilesPath}2.txt`, 
  `${FilesPath}3.txt`
];

console.log('Files:', textFiles);

const randomFile = textFiles[Math.floor(Math.random() * textFiles.length)];
console.log('Fetching file:', randomFile);

fetch(randomFile)
    .then(response => {
      if(!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.text();
    })
    .then(text => {
        document.getElementById('textToType').innerText = text;
    })
    .catch(error => {
        console.error('Error fetching the text file:', error);
    });
