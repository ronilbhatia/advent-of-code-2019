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

    const prevDigit = digits[i-1]; // done separately bc negative index messes up slice
    const [currDigit, nextDigit, nextNextDigit] = digits.slice(i, i+3)

    if (parseInt(currDigit) === parseInt(nextDigit)) {
      if (prevDigit && (parseInt(prevDigit) === parseInt(currDigit))) {
        continue;
      } else if (nextNextDigit && parseInt(currDigit) !== parseInt(nextNextDigit)) {
        return true;
      } else if (!nextNextDigit) return true;
    };
  }
}

console.log(numPasswords(172930, 683082))