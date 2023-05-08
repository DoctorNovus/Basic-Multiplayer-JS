import { Socket } from "./socket/socket";
import { Engine } from "./engine/Engine";
import { Player } from "./engine/Entity/Player/Player";

const socket = new Socket("ws://localhost:3001");
const engine = new Engine();
engine.handleStyle(1920, 1280);
requestAnimationFrame(engine.handleGraphics.bind(engine));

socket.on("SpawnPlayer", ({ id, x, y }) => {
  let player = new Player(id, x, y, engine.rectangle(x, y, 50, 50));
  engine.addPlayerToCanvas(player);
  engine.players.set(id, player);
});

socket.on("MovePlayer", ({ id, pos }) => {
  let pl = engine.players.get(id);
  pl.move(pos);
//   engine.players.set(id, pl);
});

engine.movement.onAll(socket, ["w", "a", "s", "d"], "keyOn");
engine.movement.offAll(socket, ["w", "a", "s", "d"], "keyOff");