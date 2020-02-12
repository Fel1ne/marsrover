const expect = require('chai').expect;
const MarsRover = require('../dist/MarsRover').default;

describe('MarsRover', () => {
  it('should follow given commands', () => {
    const marsRover = new MarsRover(5, 5);

    marsRover.addRover(1,2,'N');
    marsRover.sendComm('LMLMLMLMM');

    marsRover.addRover(3,3,'E');
    marsRover.sendComm('MMRMMRMRRM');

    expect(
      marsRover.getFinalPos()
    ).to.eql(
      ['1 3 N', '5 1 E']
    );
  });

  it('should not pass over eachother', () => {
    const marsRover = new MarsRover(5, 5);

    marsRover.addRover(0,0,'N');
    marsRover.sendComm('MRM');

    marsRover.addRover(1,0,'N');
    marsRover.sendComm('MMM');

    marsRover.addRover(0,1,'E');
    marsRover.sendComm('MMMLMRMRM');

    expect(
      marsRover.getFinalPos()
    ).to.eql(
      ['1 1 E', '1 0 N', '1 2 S']
    );
  }); 

  it('should not let rovers out of borders', () => {
    const marsRover = new MarsRover(5, 5);

    marsRover.addRover(0,0,'N');
    marsRover.sendComm('MMMMMM');

    marsRover.addRover(1,5,'S');
    marsRover.sendComm('MMMMMM');

    marsRover.addRover(5,1,'W');
    marsRover.sendComm('MMMMMM');

    marsRover.addRover(0,2,'E');
    marsRover.sendComm('MMMMMM');

    expect(
      marsRover.getFinalPos()
    ).to.eql(
      ['0 5 N', '1 0 S', '0 1 W', '5 2 E']
    );
  });

  it('should let you activate rover and send a comm', () => {
    const marsRover = new MarsRover(5, 5);

    const firstRoverIndex = marsRover.addRover(1,2,'N');
    marsRover.sendComm('LMLMLMLMM');

    const secondRoverIndex = marsRover.addRover(3,3,'E');
    marsRover.sendComm('MMRMMRMRRM');

    const isFirstRoverActivated = marsRover.activateRover(firstRoverIndex);
    marsRover.sendComm('M');

    const isSecondRoverActivated = marsRover.activateRover(secondRoverIndex);
    marsRover.sendComm('MMRM');

    const isThirdRoverActivated = marsRover.activateRover(9);
    marsRover.sendComm('MMRM');

    expect( marsRover.getFinalPos() ).to.eql( ['1 4 N', '5 0 S'] );
    expect( isFirstRoverActivated ).to.be.equal( true );
    expect( isSecondRoverActivated ).to.be.equal( true );
    expect( isThirdRoverActivated ).to.be.equal( false );
  });
});
