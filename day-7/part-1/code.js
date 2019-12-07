const fs = require('fs');

fs.readFile('input.txt', (err, input) => {
  const possiblePhaseSettings = permutations([0,1,2,3,4]);
  let bestOutput;
  const firstInput = 0;

  possiblePhaseSettings.forEach(phaseSettings => {
    let prevOutput;
    phaseSettings.forEach((phaseSetting, idx) => {
      const inputArr = input.toString().split(',').map(el => parseInt(el));
      let i = 0;
    
      while (i < inputArr.length) {
        const digits = inputArr[i].toString();
        let opCode = inputArr[i];
    
        let param1, param2
    
        if (inputArr[i] > 10) {
          opCode = parseInt(digits[digits.length - 1]);
          param1 = digits[digits.length - 3];
          param2 = digits[digits.length - 4];
        }
    
        let num1 = inputArr[inputArr[i + 1]]
        let num2 = inputArr[inputArr[i + 2]]
        if (param1 === '1') num1 = inputArr[i + 1];
        if (param2 === '1') num2 = inputArr[i + 2];
    
        if (opCode === 1) {
          inputArr[inputArr[i + 3]] = (num1 + num2)
        } else if (opCode === 2) {
          inputArr[inputArr[i + 3]] = (num1 * num2)
        } else if (opCode === 3) {
          if (i === 0) {
            inputArr[inputArr[i+1]] = phaseSetting;
          } else {
            inputArr[inputArr[i+1]] = prevOutput || firstInput;
          }
          i -= 2
        } else if (opCode === 4) {
          prevOutput = num1;
          if (idx === 4) {
            if (!bestOutput || prevOutput > bestOutput) bestOutput = prevOutput;
          } 
          break;
          i -= 2;
        } else if (opCode === 5) {
          if (num1 !== 0) {
            i = num2;
            continue;
          } else {
            i -= 1
          }
        } else if (opCode === 6) {
          if (num1 === 0) {
            i = num2;
            continue;
          } else {
            i -= 1
          }
        } else if (opCode === 7) {
          inputArr[inputArr[i + 3]] = (num1 < num2) ? 1 : 0;
        } else if (opCode === 8) {
          inputArr[inputArr[i + 3]] = (num1 === num2) ? 1 : 0;
        } else if (opCode === 99) {
          break;
        }
    
        i += 4;
      }
    });
    console.log(bestOutput);
  });

  console.log(bestOutput.toLocaleString());
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

