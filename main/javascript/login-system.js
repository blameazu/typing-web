import {sleep} from './function.js';

const user = document.getElementById('username');
const password = document.getElementById('password');
const login = document.getElementById('login');
const regist = document.getElementById('regist');
const result = document.getElementById('result');
const exit = document.getElementById('exit');

exit.addEventListener('click', () => {
  window.location.href = '/';
})

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
    localStorage.setItem('username', user.value);
    await sleep(2000);
    window.location.href = '/';
  } else {
    result.innerHTML = `<span style = "color : red;">Login Failed!</span>`;
  }
});

regist.addEventListener('click', async () => {
  const res = await fetch('/regist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user.value,
      password: password.value,
    }),
  });

  const re = await res.json();
  if(re.success) result.innerHTML = `<span style = "color : green;">Create a new account successfully!</span>`;
  else result.innerHTML = `<span style = "color:red;">The username was used!</span>`;
})