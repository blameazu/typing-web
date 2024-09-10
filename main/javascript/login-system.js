import {sleep} from './function.js';

const user = document.getElementById('username');
const password = document.getElementById('password');
const login = document.getElementById('login');
const regist = document.getElementById('regist');
const result = document.getElementById('result');

var config;

fetch('../json/config.json')
  .then(res => res.json())
  .then(ans => {
    config = ans;
  })
  .catch(error => {
    console.error('Error loading config:', error);
  });

login.addEventListener('click', async () => {
  if(user.value === "") result.innerHTML = `<span style = "color : red;">Username cannot be empty!</span>`;
  else if(password.value === "") result.innerHTML = `<span style = "color : red;">Password cannot be empty!</span>`;
  else {
    if(user.value === config.adminusername && password.value === config.adminpassword) {
      result.innerHTML = `<span style = "color : green;">Login succefully</span>`;
      await sleep(1000);
      window.location.href = '/';
    } else {
      result.innerHTML = `<span style = "color : red;">Password or Username is WRONG!</span>`;
    }
  }
})

regist.addEventListener('click', () => {
  result.innerHTML = `<cpan style = "color : red;">WIP</span>`;
})