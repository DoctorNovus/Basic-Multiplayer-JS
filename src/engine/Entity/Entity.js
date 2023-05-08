export class Entity {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  draw(ctx) {
    this.sprite.draw(ctx);
  }

  move({ x, y }) {
    this.x = x;
    this.y = y;

    this.sprite.setPos(x, y);
  }
}
