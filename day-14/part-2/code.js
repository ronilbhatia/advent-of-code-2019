const fs = require('fs');
const Reactor = require('./reactor');

fs.readFile('input.txt', (err, data) => {
  const input = data
    .toString()
    .split('\n')
    .map(reaction => reaction.split(' => '));
  const reactor = new Reactor(input);
  console.log(reactor.produceFuel(1000000000000));
});