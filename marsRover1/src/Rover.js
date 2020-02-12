class Rover {
  constructor(x, y, facing) {
    this.pos = {
      x, y
    };
    
    this.facing = facing;
  }
  
  rotate(to) {
    this.facing = Rover.rotateMap[this.facing][to];
  }
  
  move(predicate) {
    const moveBy = Rover.moveMap[this.facing],
          nextPos = { x: this.pos.x, y: this.pos.y };

    nextPos[moveBy.plane] += moveBy.amount;
    
    const isLegal = predicate(nextPos);

    if (isLegal) {
      this.pos = nextPos;
    }
  }
  
  getState() {
    return {
      pos: this.pos,
      facing: this.facing
    }
  }
}

Rover.rotateMap = {
  N: { L: 'W', R: 'E' },
  E: { L: 'N', R: 'S' },
  S: { L: 'E', R: 'W' },
  W: { L: 'S', R: 'N' }
};

Rover.moveMap = {
  N: { plane: 'y', amount: +1 },
  S: { plane: 'y', amount: -1 },
  E: { plane: 'x', amount: +1 },
  W: { plane: 'x', amount: -1 }
};

export default Rover;
