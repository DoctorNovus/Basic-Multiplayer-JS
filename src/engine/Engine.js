import { Graphics } from "./Graphics/Graphics";
import { Rectangle } from "./Shapes/Rectangle";

export class Engine {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canva";
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.graphics = new Graphics(this.ctx);
    this.objects = {};
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
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let x in this.objects) {
      this.objects[x].draw(this.ctx);
    }

    // requestAnimationFrame(this.handleGraphics.bind(this));
  }

  rectangle(x, y, w, h, id) {
    let r = new Rectangle(x, y, w, h);
    r.id = id;

    this.objects[id] = r;
    return r;
  }
}
