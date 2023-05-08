import { Logger } from "../utility/logger";
import { SocketManager } from "./SocketManager/SocketManager";

export class Game {
  constructor(port) {
    this.socket_manager = new SocketManager(port);

    Logger.log("Game", `Game Engine online on port ${port}`);
  }
}
