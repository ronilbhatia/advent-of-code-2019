function numPasswords(low, high) {
  let i = low
  let numPasswords = 0;

  while (i < high) {
    const digits = i.toString().split('');
    if (isIncreasing(digits) && hasAdjacentDigits(digits)) numPasswords++;
    i++
  }

  return numPasswords;
}

function isIncreasing(digits) {
  for (let i = 0; i < digits.length; i++) {
    if (i === digits.length - 1) return true;
    if (parseInt(digits[i]) > parseInt(digits[i+1])) return false;
  }
}

function hasAdjacentDigits(digits) {
  for (let i = 0; i < digits.length; i++) {
    if (i === digits.length - 1) return false;
    if (parseInt(digits[i]) === parseInt(digits[i+1])) return true;
  }
}

console.log(numPasswords(172930, 683082))