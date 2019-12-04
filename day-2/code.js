function intCode(file) {
  fetch(file)
  .then(res => res.text())
  .then(input => {
    let k = 0;
    while (k < 100) {
      let j = 0;
      while (j < 100) {
        const inputArr = input.split(',').map(el => parseInt(el));
        inputArr[1] = k;
        inputArr[2] = j;
        const i = 0;

        while (i < inputArr.length) {
          if (inputArr[i] === 1) {
            const num1 = inputArr[inputArr[i + 1]]
            const num2 = inputArr[inputArr[i + 2]]
            inputArr[inputArr[i + 3]] = (num1 + num2)
          } else if (inputArr[i] === 2) {
            const num1 = inputArr[inputArr[i + 1]]
            const num2 = inputArr[inputArr[i + 2]]
            inputArr[inputArr[i + 3]] = (num1 * num2)
          } else {
            debugger
            break;
          }

          i += 4;
        }

        if (inputArr[0] === 19690720) console.log(k, j);
        
        j += 1
      }

      k += 1
    }
  })
}

console.log(intCode('input.txt'))