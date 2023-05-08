export class Movement {
  constructor(socket) {
    this.socket = socket;
  }

  handle(game, e) {
    let player = game.players.get(e.client.id);

    switch (e.key) {
      case "w":
        player.moveY(-5);
        break;

      case "a":
        player.moveX(-5);
        break;

      case "s":
        player.moveY(5);
        break;

      case "d":
        player.moveX(5);
        break;
    }

    console.log(player);

    this.socket.sendAll({
      type: "Event",
      event: "MovePlayer",
      options: {
        id: e.client.id,
        pos: { x: player.x, y: player.y },
      },
    });
  }
}
