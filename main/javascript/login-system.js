import {sleep} from './function.js';

const user = document.getElementById('username');
const password = document.getElementById('password');
const login = document.getElementById('login');
const regist = document.getElementById('regist');
const result = document.getElementById('result');

login.addEventListener('click', async () => {
  const res = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user.value,
      password: password.value,
    }),
  });

  const back = await res.json();
  if(back.success) {
    result.innerHTML = `<span style = "color : green;">Login Successfully!</span>`;
    await sleep(2000);
    window.location.href = '/';
  } else {
    result.innerHTML = `<span style = "color : red;">Login Failed!</span>`;
  }
});

regist.addEventListener('click', () => {
  result.innerHTML = `<span style = "color : red;">WIP</span>`;
})