const uniqid = require('uniqid');

const eventTypes = {
  create: 'create-game',
  takeTurn: 'take-turn',
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
    this.column = props.column;
  }

  static createGame() {
    return new Event({
      type: eventTypes.create,
      number: 0,
      id: uniqid.time(),
      time: new Date(),
    });
  }

  static takeTurn({ id, column, number}) {
    return new Event({
      type: eventTypes.takeTurn,
      number,
      time: new Date(),
      id,
      column: Number(column),
    });
  }

  static fromDocument(doc) {
    return new Event({
      type: doc.type,
      number: doc.number,
      id: doc.id,
      time: new Date(doc.time),
      column: doc.column,
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
    case eventTypes.takeTurn:
      return this.applyTakeTurn(gameState);
    }
  }

  applyCreate(gameState) {
    gameState.id = this.id;
    gameState.startedAt = this.time;
    gameState.lastMoveAt = this.time;
    gameState.nextPlayer = getNextPlayer();
  }

  applyTakeTurn(gameState) {
    gameState.lastMoveAt = this.time;
    gameState.nextPlayer = getNextPlayer(gameState.nextPlayer);
    const tokenLevel = gameState.board[this.column].indexOf('_');
    if (tokenLevel == -1) {
      throw new Error('Illegal Move');
    }
    gameState.board[this.column][tokenLevel] = gameState.nextPlayer;
  }
};