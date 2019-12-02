/* PART 1 */

function getFile(file) {
  return fetch(file).then(res => res.text())
}

function parseInput(input) {
  return input.split('\n').map(el => parseInt(el));
}

function massCalculator(file) {
  getFile(file).then(input => {
    const parsed = parseInput(input);
    const res = parsed.reduce((total, curr) => {
      return total + (Math.floor(curr / 3) - 2);
    }, 0)
    console.log(res);
    return res;
  })
}

massCalculator('input.txt')