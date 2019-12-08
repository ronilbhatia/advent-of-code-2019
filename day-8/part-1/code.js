const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
  const input = data.toString().split('').map(num => parseInt(num));
  const layers = [];
  let bestLayer, leastZeros;

  for (let i = 0; i < input.length; i += 150) {
    const currLayer = input.slice(i, i + 150)
    layers.push(currLayer);
    let currZeros = 0;

    currLayer.forEach(el => {
      if (el === 0) currZeros++;
    })

    if (!leastZeros || currZeros < leastZeros) {
      leastZeros = currZeros;
      bestLayer = currLayer;
    }
  }

  let oneCount = 0;
  let twoCount = 0;

  bestLayer.forEach(num => {
    if (num === 1) oneCount++;
    if (num === 2) twoCount++;
  });

  console.log(oneCount * twoCount);
})