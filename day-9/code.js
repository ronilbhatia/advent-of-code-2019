const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
  const input = data.toString();
  intcodeComputer(input);
});

function intcodeComputer(input) {
  const inputArr = input.split(',').map(el => parseInt(el));
  let i = 0;
  let relativeBase = 0;

  while (i < inputArr.length) {
    const digits = inputArr[i].toString();
    let [opCode, param1, param2, param3] = processDigits(digits, inputArr, i);

    let num1 = inputArr[inputArr[i + 1]]
    let num2 = inputArr[inputArr[i + 2]]
    let writeAddress = inputArr[i + 3];
    if (param1 === 1) num1 = inputArr[i + 1];
    if (param2 === 1) num2 = inputArr[i + 2];
    if (param1 === 2) num1 = inputArr[inputArr[i + 1] + relativeBase];
    if (param2 === 2) num2 = inputArr[inputArr[i + 2] + relativeBase];
    if (param3 === 2) writeAddress = inputArr[i + 3] + relativeBase;

    if (opCode === 1) {
      inputArr[writeAddress] = (num1 + num2)
      i += 4;
    } else if (opCode === 2) {
      inputArr[writeAddress] = (num1 * num2)
      i += 4;
    } else if (opCode === 3) {
      if (param1 === 2) writeAddress = inputArr[i + 1] + relativeBase;
      inputArr[writeAddress] = 2
      i += 2
    } else if (opCode === 4) {
      console.log(num1);
      i += 2;
    } else if (opCode === 5) {
      i = (num1 !== 0) ? num2 : i + 3;
    } else if (opCode === 6) {
      i = (num1 === 0) ? num2 : i + 3;
    } else if (opCode === 7) {
      inputArr[writeAddress] = (num1 < num2) ? 1 : 0;
      i += 4;
    } else if (opCode === 8) {
      inputArr[writeAddress] = (num1 === num2) ? 1 : 0;
      i += 4;
    } else if (opCode === 9) {
      relativeBase += num1;
      i += 2;
    } else if (opCode === 99) {
      break;
    } else {
      break;
    }
  }
}

function processDigits(digits, inputArr, i) {
  let opCode = inputArr[i];
  let param1, param2, param3

  if (inputArr[i] > 10) {
    opCode = parseInt(digits[digits.length - 1]);
    param1 = parseInt(digits[digits.length - 3]);
    param2 = parseInt(digits[digits.length - 4]);
  }

  if (inputArr[i] >= 10000) {
    param3 = parseInt(digits[digits.length - 5]);
  }

  return [opCode, param1, param2, param3];
}