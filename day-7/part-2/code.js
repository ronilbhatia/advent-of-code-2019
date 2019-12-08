const fs = require('fs');

fs.readFile('input.txt', (err, input) => {
  const possiblePhaseSettings = permutations([5,6,7,8,9]);
  let bestOutput;

  possiblePhaseSettings.forEach(phaseSettings => {
    let nextInput = 0;
    let ampIdx = 0;
    let done;
    let phaseSettingsUsed = {}
    let ampPrograms = {
      0: input.toString().split(',').map(el => parseInt(el)),
      1: input.toString().split(',').map(el => parseInt(el)),
      2: input.toString().split(',').map(el => parseInt(el)),
      3: input.toString().split(',').map(el => parseInt(el)),
      4: input.toString().split(',').map(el => parseInt(el))
    };
    let ampStepIndices = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0
    }
    
    while (true) {
      let currIdx = ampStepIndices[ampIdx];
      let program = ampPrograms[ampIdx];
      console.log("Amp: ", ampIdx);
      console.log("Step: ", currIdx);
      console.log("Program: ", program);
        const digits = program[currIdx].toString();
        let opCode = program[currIdx];
        
        console.log("Op Code: ", opCode);
        let param1, param2
        
        if (opCode > 10) {
          opCode = parseInt(digits[digits.length - 1]);
          param1 = digits[digits.length - 3];
          param2 = digits[digits.length - 4];
        }
    
        let num1 = program[program[currIdx + 1]]
        let num2 = program[program[currIdx + 2]]
        if (param1 === '1') num1 = program[currIdx + 1];
        if (param2 === '1') num2 = program[currIdx + 2];
    
        if (opCode === 1) {
          program[program[currIdx + 3]] = (num1 + num2)
        } else if (opCode === 2) {
          program[program[currIdx + 3]] = (num1 * num2)
        } else if (opCode === 3) {
          if (!phaseSettingsUsed[ampIdx]) {
            program[program[currIdx+1]] = phaseSettings[ampIdx];
            phaseSettingsUsed[ampIdx] = true;
          } else {
            program[program[currIdx+1]] = nextInput;
          }
          ampStepIndices[ampIdx] -= 2
        } else if (opCode === 4) {
          nextInput = num1;
          ampStepIndices[ampIdx] += 2;
          if (ampIdx === 4) {
            ampIdx = 0;
          } else {
            ampIdx += 1;
          }
        } else if (opCode === 5) {
          if (num1 !== 0) {
            ampStepIndices[ampIdx] = num2;
            continue;
          } else {
            ampStepIndices[ampIdx] -= 1
          }
        } else if (opCode === 6) {
          if (num1 === 0) {
            ampStepIndices[ampIdx] = num2;
            continue;
          } else {
            ampStepIndices[ampIdx] -= 1
          }
        } else if (opCode === 7) {
          program[program[currIdx + 3]] = (num1 < num2) ? 1 : 0;
        } else if (opCode === 8) {
          program[program[currIdx + 3]] = (num1 === num2) ? 1 : 0;
        } else if (opCode === 99) {
          done = true;
          break;
        } else {
          break;
        }
    
        if (opCode !== 4) ampStepIndices[ampIdx] += 4;
      if (done) break;
    };
    if (!bestOutput || nextInput > bestOutput) bestOutput = nextInput;
  });

  console.log(bestOutput);
});

function permutations(arr) {
  if (arr.length <= 1) return [arr];

  let prevPerms = permutations(arr.slice(1));
  let extraEl = arr[0];
  let perms = [];

  prevPerms.forEach(perm => {
    for (let i = 0; i <= perm.length; i++) {
      const currPerm = perm.slice(0, i).concat(extraEl).concat(perm.slice(i))
      perms.push(currPerm);
    }
  });

  return perms;
}

