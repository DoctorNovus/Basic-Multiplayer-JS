import { Logger } from "../utility/logger";
import { Movement } from "./Movement/Movement";
import { SocketManager } from "./SocketManager/SocketManager";

export class Game {
  constructor(port) {
    this.socket_manager = new SocketManager(port);
    this.movement = new Movement(this.socket_manager);
    this.socket_manager.on("keyOn", (e) => {
      switch (e.key) {
        case "w":
        case "a":
        case "s":
        case "d":
          this.movement.handle(this, e);
          break;
      }
    });

    Logger.log("Game", `Game Engine online on port ${port}`);
  }

  get clients() {
    return this.socket_manager.clients;
  }

  get players() {
    return this.socket_manager.players;
  }
}
