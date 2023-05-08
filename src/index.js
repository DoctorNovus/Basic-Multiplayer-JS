import { Socket } from "./socket/socket";
import { Engine } from "./engine/Engine";

const socket = new Socket("ws://localhost:3001");
const engine = new Engine();
engine.handleStyle(1920, 1280);
requestAnimationFrame(engine.handleGraphics.bind(engine));

let player = engine.rectangle(50, 50, 50, 50);
console.log(player);