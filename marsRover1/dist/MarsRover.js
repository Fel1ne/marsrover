'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Rover = require('./Rover');

var _Rover2 = _interopRequireDefault(_Rover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MarsRover {
  constructor(xSize, ySize) {
    this.size = {
      x: xSize,
      y: ySize
    };

    this.rovers = [];
    this.activeRover = null;

    this.isPosAvaliable = this.isPosAvaliable.bind(this);
    this.executeComm = this.executeComm.bind(this);
  }

  isPosAvaliable(nextPos) {
    return this.doesPosExist(nextPos) && !this.getRoverByPos(nextPos);
  }

  doesPosExist({ x, y }) {
    return x > -1 && y > -1 && x <= this.size.x && y <= this.size.y;
  }

  getRoverByPos({ x, y }) {
    return this.rovers.find(rover => {
      const state = rover.getState();

      return state.pos.x === x && state.pos.y === y;
    });
  }

  addRover(x, y, facing) {
    this.activeRover = null;

    if (!this.isPosAvaliable({ x, y })) {
      return false;
    }

    const rover = new _Rover2.default(x, y, facing);

    this.rovers.push(rover);
    this.activeRover = rover;

    return this.rovers.length - 1;
  }

  activateRover(index) {
    return !!(this.activeRover = this.rovers[index]);
  }

  executeComm(comm) {
    if (!this.activeRover) {
      return false;
    }

    if (comm === 'M') {
      return this.activeRover.move(this.isPosAvaliable);
    }

    if (comm === 'L' || comm === 'R') {
      return this.activeRover.rotate(comm);
    }
  }

  sendComm(commandList) {
    [...commandList].forEach(this.executeComm);
  }

  getFinalPos() {
    return this.rovers.map(rover => {
      const state = rover.getState();

      return `${state.pos.x} ${state.pos.y} ${state.facing}`;
    });
  }
}

exports.default = MarsRover;