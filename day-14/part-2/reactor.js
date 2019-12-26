class Reactor {
  constructor(input) {
    this.reactions = Reactor.processInput(input);
    this.extra = {};
  }

  static processInput(input) {
    const reactions = {};

    input.forEach(reaction => {
      const product = reaction[1].split(' ');
      const inputs = reaction[0].split(', ').map(input => input.split(' '));
      reactions[product] = inputs;
    });

    return reactions;
  }

  produceFuel(oreAmount) {
    let low = 0;
    let high = oreAmount;
    let curr, currOre;

    while ((high - low) > 1) {
      curr = Math.round((high + low) / 2);
      this.extra = {} // reset this hash for each calculation
      currOre = this.calculateOre('FUEL', curr);
      console.log(curr, currOre);
      console.log(low, high)
      if (currOre > oreAmount) {
        high = curr;
      } else {
        low = curr;
      }
    }

    return (currOre > oreAmount) ? curr - 1 : curr;
  }

  calculateOre(chemical, amountNeeded) {
    // return early if we have extra of this chemical on hand already
    if (this.extra[chemical] && this.extra[chemical] > amountNeeded) {
      this.extra[chemical] -= amountNeeded;
      return 0; // no ore or output produced
    } else if (this.extra[chemical]) {
      // if we have extra on hand then we subtract the amount we need by that 
      // much and set the extra of this chemical back to 0
      amountNeeded -= this.extra[chemical];
      this.extra[chemical] = 0;
    }

    let key;
    Object.keys(this.reactions).forEach(output => {
      let currChem = output.split(',')[1]
      if (currChem === chemical) {
        key = output;
      }
    });

    // How much are we going to produce vs how much do we need. Add any extra to
    // extra hash
    const outputAmount = parseInt(key.split(',')[0]);
    const reactionTimes = Math.ceil(amountNeeded / outputAmount);
    const extra = (outputAmount * reactionTimes) - amountNeeded;
    this.extra[chemical] = (this.extra[chemical]) ? this.extra[chemical] + extra : extra;

    let totalOre = 0;
    const reactionInputs = this.reactions[key];

    reactionInputs.forEach(input => {
      let inputAmount = parseInt(input[0]) * reactionTimes;
      let inputChem = input[1];

      if (inputChem === 'ORE') {
        totalOre += inputAmount;
      } else {
        let ore = this.calculateOre(inputChem, inputAmount);
        totalOre += ore;
      }
    });

    return totalOre;
  }
}

module.exports = Reactor;