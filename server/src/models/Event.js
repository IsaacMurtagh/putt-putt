const uniqid = require('uniqid');

const eventTypes = {
  create: 'create-game'
};

function getNextPlayer(lastPlayer) {
  if (lastPlayer == 'RED') {
    return 'YELLOW';
  }
  return 'RED';
}

module.exports = class Event {
  constructor(props) {
    this.id = props.id;
    this.number = props.number;
    this.type = props.type;
    this.time = props.time;
  }

  static createGame() {
    return new Event({
      type: eventTypes.create,
      number: 0,
      id: uniqid.time(),
      time: new Date(),
    });
  }

  static fromDocument(doc) {
    return new Event({
      type: doc.type,
      number: doc.number,
      id: doc.id,
      time: new Date(doc.time),
    });
  }

  toDocument() {
    return {
      ...this,
      pk: this.id,
      sk: `Event#${this.number}`,
      time: this.time.toISOString(),
    };
  }

  apply(gameState) {
    switch(this.type) {
    case eventTypes.create:
      return this.applyCreate(gameState);
    }
  }

  applyCreate(gameState) {
    gameState.id = this.id;
    gameState.startAt = this.time;
    gameState.lastMoveAt = this.time;
    gameState.nextPlayer = getNextPlayer();
  }
};