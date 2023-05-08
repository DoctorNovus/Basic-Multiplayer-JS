import { Rect } from "../Physics/Rect";

export class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rect = new Rect(x, y, width, height);
    this.color = "red";
  }

  draw(ctx) {
    if (this.color) ctx.fillStyle = this.color;

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
