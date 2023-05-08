import { Graphics } from "./Graphics/Graphics";
import { Movement } from "./Movement/Movement";
import { Rectangle } from "./Shapes/Rectangle";

export class Engine {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canva";
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.graphics = new Graphics(this.ctx);
    this.movement = new Movement(this.canvas);
    this.players = new Map();
  }

  handleStyle(resX, resY) {
    this.canvas.style.position = "absolute";
    this.canvas.width = resX || 1000;
    this.canvas.height = resY || 1000;
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.canvas.style.padding = `0`;
    this.canvas.style.margin = `0`;
    this.canvas.style.background = `black`;
  }

  handleGraphics() {
    this.graphics.handleGraphics(this.players);

    requestAnimationFrame(this.handleGraphics.bind(this));
  }

  rectangle(x, y, w, h) {
    let r = new Rectangle(x, y, w, h);
    return r;
  }

  addPlayerToCanvas(obj) {
    this.players[obj.id] = obj;
  }
}
