class IntcodeComputer {
  constructor(program, initialInput) {
    this.program = program;
    this.initialInput = initialInput;
    this.pointer = 0;
    this.relativeBase = 0;
  }

  run() {
    const { program } = this

    while (this.pointer < program.length) {
      const digits = program[this.pointer].toString();
      let [opCode, paramModes] = IntcodeComputer.processDigits(digits);
      let [param1, param2, writeAddress] = this.getParams(paramModes, opCode);

      if (opCode === 1) {
        program[writeAddress] = (param1 + param2)
        this.pointer += 4;
      } else if (opCode === 2) {
        program[writeAddress] = (param1 * param2)
        this.pointer += 4;
      } else if (opCode === 3) {
        program[writeAddress] = this.initialInput;
        this.pointer += 2
      } else if (opCode === 4) {
        console.log(param1);
        this.pointer += 2;
      } else if (opCode === 5) {
        this.pointer = (param1 !== 0) ? param2 : this.pointer + 3;
      } else if (opCode === 6) {
        this.pointer = (param1 === 0) ? param2 : this.pointer + 3;
      } else if (opCode === 7) {
        program[writeAddress] = (param1 < param2) ? 1 : 0;
        this.pointer += 4;
      } else if (opCode === 8) {
        program[writeAddress] = (param1 === param2) ? 1 : 0;
        this.pointer += 4;
      } else if (opCode === 9) {
        this.relativeBase += param1;
        this.pointer += 2;
      } else if (opCode === 99) {
        break;
      }
    }
  }

  getParams(paramModes, opCode) {
    const { mode1, mode2, mode3 } = paramModes;
    const { program, pointer, relativeBase } = this;

    let param1 = program[program[pointer + 1]] || 0;
    let param2 = program[program[pointer + 2]] || 0;
    let writeAddress = program[pointer + 3] || 0;

    if (mode1 === 1) param1 = program[pointer + 1] || 0;
    if (mode2 === 1) param2 = program[pointer + 2] || 0;
    if (mode1 === 2) param1 = program[program[pointer + 1] + relativeBase] || 0;
    if (mode2 === 2) param2 = program[program[pointer + 2] + relativeBase] || 0;
    if (mode3 === 2) writeAddress = program[pointer + 3] + relativeBase || 0;

    // OpCode 3 is the only one that writes based on the 1st, not 3rd, parameter
    if (opCode === 3) {
      writeAddress = program[pointer + 1] || 0;
      if (mode1 === 2) writeAddress += relativeBase;
    }

    return [param1, param2, writeAddress];
  }

  static processDigits(digits) {
    const opCode = parseInt(digits.slice(digits.length - 2))
    const paramModes = {
      mode1: parseInt(digits[digits.length - 3]),
      mode2: parseInt(digits[digits.length - 4]),
      mode3: parseInt(digits[digits.length - 5])
    }

    return [opCode, paramModes];
  }
}

module.exports = IntcodeComputer;