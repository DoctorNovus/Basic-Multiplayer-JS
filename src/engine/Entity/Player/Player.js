import { Entity } from "../Entity";

export class Player extends Entity {
  constructor(id, x, y, sprite) {
    super(x, y, sprite);
    this.id = id;
  }

  draw(ctx) {
    super.draw(ctx);
    let font = 26;
    ctx.font = `${font}px serif`;
    ctx.fillStyle = "white";
    ctx.textAlign = "Center";
    ctx.fillText(
      `${this.x}:${this.y}`,
      this.x - (this.id.length * (font / 4)) / 2,
      this.y - this.y * 0.1,
      this.sprite.width * 4
    );
  }
}
