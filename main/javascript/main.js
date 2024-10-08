// story text system

import { colorchg } from './textcolor.js';
import { sleep } from './function.js';

const story = document.getElementById('story');
const input = document.getElementById('input');
const time = document.getElementById('time');
const best = document.getElementById('best');

var goal = "not started...";
var begintime = null;
var started = false;
var timer = null;
var nowtime = null;

var besttime = Infinity;

function min(a, b) {
  return parseInt(a) < parseInt(b) ? a : b;
}

async function randomstory() {
  try {
    const tmp = await fetch('/random-text');
    const re = await tmp.json();
    return re.text;
  } catch (error) {
    console.error(`[Error] Failed to fetching text:`, error);
    return "[Error] Fetch failed";
  }
}

async function update() {
  try {
    started = false;
    begintime = null;
    if(timer) await clearInterval(timer);
    goal = await randomstory();
    input.value = "";
    story.innerText = goal;
    time.innerText = "Time: 0.00 seconds";
  } catch (error) {
    console.error(`[Error] Failed to update`)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await update();
});

input.addEventListener('input', async () => {
  if(!started) {
    begintime = Date.now();
    started = true;
    nowtime = 0;
    timer = setInterval(() => {
      const totaltime = ((Date.now() - begintime) / 1000).toFixed(2);
      nowtime = totaltime;
      time.innerText = `Time: ${totaltime} seconds`;
    }, 100);
  }

  story.innerHTML = colorchg(goal, input.value);

  if (input.value === goal) {
      await clearInterval(timer);
      besttime = await min(besttime, nowtime);
      best.innerText = `Best : ${besttime}`;
      await update();
      await sleep(2000);
  } else {
      result.innerText = '';
  }
});

// to login html

const login = document.getElementById('login');

login.addEventListener('click', () => {
  window.location.href = 'login.html';
})


// user system

const res = await fetch('/get-info', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  }
});

const data = await res.json();
const user = document.getElementById('user');
const signout = document.getElementById('signout');

if(data.success) {
  user.innerText = `${data.username}`;
  login.style.display = 'none';
} else {
  user.style.display = 'none';
  signout.style.display = 'none';
}

signout.addEventListener('click', async () => {
  await fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  window.location.href = '/';
})

