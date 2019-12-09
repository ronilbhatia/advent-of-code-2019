const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
  const input = data.toString().split('').map(num => parseInt(num));
  const layers = [];
  const image = []

  for (let i = 0; i < input.length; i += 150) {
    const currLayer = input.slice(i, i + 150)
    layers.push(currLayer);
  }

  for (let i = 0; i < 150; i++) {
    let layerIdx = 0;
    let layer = layers[layerIdx];

    while (layer[i] === 2) {
      layerIdx += 1;
      layer = layers[layerIdx];
    }
    image.push(layer[i])
    if ((i + 1) % 25 === 0) image.push('\n');
  }

  console.log(image.map(pixel => {
    if (pixel === '\n') return '\n';
    return (pixel === 0) ? ' ' : '*'
  }).join(''));
})