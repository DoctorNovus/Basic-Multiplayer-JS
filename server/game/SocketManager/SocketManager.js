import WebSocket from "ws";
import { Utility } from "../../utility/utility";
import { Logger } from "../../utility/logger";
import { Player } from "../Entity/Player/Player";

export class SocketManager {
  constructor(port) {
    this.ids = [];
    this.clients = new Map();
    this.players = new Map();

    this.port = port;
    this.server = new WebSocket.Server({ port });

    this.events = {};

    this.server.on("connection", (ws) => this.handleConnection(ws));
  }

  handleConnection(ws) {
    let id = Utility.createToken(20);

    const metadata = { ws, id };
    this.clients.set(ws, metadata);

    Logger.log("Socket", `User ${id} has connected`);
    this.sendEncrypted(ws, {
      type: "Text",
      text: "Welcome to the game!",
    });

    this.sendEncrypted(ws, {
      type: "Event",
      event: "SpawnPlayer",
      options: { id, x: 0, y: 0 },
    });

    this.players.set(id, new Player(id, 0, 0));

    ws.on("message", (messageAsString) =>
      this.handleMessage(ws, messageAsString)
    );

    ws.on("close", (ws) => this.handleClose(id, ws));
  }

  handleMessage(ws, messageAsString) {
    let message = JSON.parse(messageAsString);
    let metadata = this.clients.get(ws);

    message.client = metadata;

    if (message.type)
      if (this.events[message.type]) this.events[message.type](message);
      else Logger.log("Event", `No such event: ${message.type}`);
  }

  handleClose(id, ws) {
    Logger.log("Socket", `User ${id} has disconnected.`);
    this.clients.delete(ws);
  }

  sendEncrypted(user, data) {
    let newMess = JSON.stringify(data);

    user.send(newMess);
  }

  on(event, callback) {
    this.events[event] = callback;
  }

  off(event) {
    delete this.events[event];
  }

  send(ws, data) {
    this.sendEncrypted(ws, data);
  }

  sendAll(data) {
    this.clients.forEach((client) => {
      let pl = this.players.get(client.id);
      if (pl) {
        this.send(client.ws, data);
      }
    });
  }
}
