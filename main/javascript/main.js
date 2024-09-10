// story text system

import { colorchg } from './textcolor.js';
import { sleep } from './function.js';

const story = document.getElementById('story');
const input = document.getElementById('input');
const result = document.getElementById('result');
const time = document.getElementById('time');

var goal = "not started...";
var begintime = null;
var started = false;
var timer = null;
var nowtime = null;

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
    input.value = "";
    result.innerText = "";
    time.innerText = "Time: 0.00 seconds";
    started = false;
    begintime = null;
    if(timer) clearInterval(timer);
    goal = await randomstory();
    story.innerText = goal;
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
      clearInterval(timer);
      time.innerText = '';
      result.innerText = `Finished in ${nowtime} seconds!`;
      await sleep(3000);
      await update();
  } else {
      result.innerText = '';
  }
});

// to login html

const login = document.getElementById('login');

login.addEventListener('click', () => {
  window.location.href = 'login.html';
})
