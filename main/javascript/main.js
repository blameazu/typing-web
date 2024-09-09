import { colorchg } from './textcolor.js';

const story = document.getElementById('textToType');
const input = document.getElementById('inputText');
const result = document.getElementById('result');

var goal = "not started...";

async function sleep(time) {
  return (new Promise(resolve => setTimeout(resolve, time)));
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
    // setup
    input.value = "";
    result.innerText = "";
    // update story
    goal = await randomstory();
    story.innerText = goal;
  } catch (error) {
    console.error(`[Error] Failed to update`)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await update();
});

inputText.addEventListener('input', async () => {
  story.innerHTML = colorchg(goal, input.value);
  if (input.value === goal) {
      result.innerText = 'Finished!';
      await sleep(3000);
      await update();
  } else {
      result.innerText = '';
  }
});
