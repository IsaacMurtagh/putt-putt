function constructBoard() {
  return Array(6).fill().map(() => Array(7).fill('_'));
}

module.exports = class ConnectFour {
  constructor(props) {
    this.id = props.id;
    this.nextPlayer = props.nextPlayer;
    this.startedAt = props.startedAt;
    this.lastMoveAt = props.lastMoveAt;
    this.board = props.board;
  }

  static fromEvents(events) {
    const board = constructBoard();
    const connectFour = new ConnectFour({ board });
    events.forEach(e => e.apply(connectFour));
    return connectFour;
  }

  toApiResponse() {
    return {
      startedAt: this.startedAt,
      lastMoveAt: this.lastMoveAt,
      board: this.board,
      id: this.id,
      nextPlayer: this.nextPlayer,
    };
  }
};