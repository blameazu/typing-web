function max(a, b) {
  return parseInt(a) > parseInt(b) ? a : b;
}

function colorchg(goal, input) {
  let re = "";
  for(let i = 0; i < max(input.length, goal.length); i++) {
    if(i >= goal.length) re += `<span style = "color : red;">${input[i]}</span>`;
    else if(i >= input.length) re += `<span style = "color: white;">${goal[i]}</span>`;
    else if(input[i] === goal[i]) re += `<span style = "color: green;">${goal[i]}</span>`;
    else re += `<span style = "color: red;">${(goal[i] == ' ' ? '_' : goal[i])}</span>`;
  }
  return re;
}
export {colorchg};