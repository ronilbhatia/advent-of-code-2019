const fs = require('fs');
const FFT = require('./fft');

fs.readFile('input.txt', (err, data) => {
  const input = data
    .toString()
    .split('')
    .map(el => parseInt(el));
  const fft = new FFT(input);
  console.log(fft.performPhases(100));
});
