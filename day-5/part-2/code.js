const fs = require('fs');

function intCode(file) {
  fs.readFile(file, (err, input) => {
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
        inputArr[inputArr[i + 1]] = 5
        i -= 2
      } else if (opCode === 4) {
        console.log(num1);
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
  })     
}

intCode('input.txt')