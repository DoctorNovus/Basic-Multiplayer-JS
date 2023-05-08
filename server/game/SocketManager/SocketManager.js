import WebSocket from "ws";
import { Utility } from "../../utility/utility";
import { Logger } from "../../utility/logger";

export class SocketManager {
  constructor(port) {
    this.ids = [];
    this.clients = new Map();

    this.port = port;
    this.server = new WebSocket.Server({ port });

    this.server.on("connection", (ws) => this.handleConnection(ws));
  }

  handleConnection(ws) {
    let id = Utility.createToken(20);

    const metadata = { id };
    this.clients.set(ws, metadata);

    Logger.log("Socket", `User ${id} has connected`);
    this.sendEncrypted(ws, {
      type: "Text",
      text: "Welcome to the game!"
    });

    ws.on("message", (messageAsString) =>
      this.handleMessage(ws, messageAsString)
    );

    ws.on("close", (ws) => this.handleClose(id, ws));
  }

  handleMessage(ws, messageAsString) {
    let message = JSON.parse(messageAsString);
    let metadata = this.clients.get(ws);

    message.sender = metadata.id;
  }

  handleClose(id, ws) {
    Logger.log("Socket", `User ${id} has disconnected.`);
    this.clients.delete(ws);
  }

  sendEncrypted(user, data) {
    let newMess = JSON.stringify(data);

    user.send(newMess);
  }
}
