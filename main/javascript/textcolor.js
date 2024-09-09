function colorchg(goal, input) {
  let re = "";
  for(let i = 0; i < goal.length; i++) {
    if(i >= input.length) re += `<span style = "color: white;">${goal[i]}</span>`;
    else if(input[i] === goal[i]) re += `<span style = "color: green;">${goal[i]}</span>`;
    else re += `<span style = "color: red;">${(goal[i] == ' ' ? '_' : goal[i])}</span>`;
  }
  return re;
}
export {colorchg};