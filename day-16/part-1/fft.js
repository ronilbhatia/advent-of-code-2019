class FFT {
  constructor(input) {
    this.input = input;
    this.phase = 0;
  }

  performPhase() {
    this.phase += 1;
    this.input = this.input.map((num, idx) => this.calcDigit(idx + 1));
  }

  calcDigit(repeatTimes) {
    let baseIdx = 0;
    let sum = 0;
    let times = repeatTimes - 1;

    for (let i = 0; i < this.input.length; i++) {
      if (times === 0) {
        times = repeatTimes;
        baseIdx = (baseIdx + 1) % 4;
      }

      sum += this.input[i] * FFT.BASE[baseIdx];
      times -= 1;
    }

    return Math.abs(sum) % 10;
  }

  performPhases(numPhases) {
    while (this.phase < numPhases) {
      this.performPhase();
    }
    return this.input;
  }
}

FFT.BASE = [0, 1, 0, -1];

module.exports = FFT;
