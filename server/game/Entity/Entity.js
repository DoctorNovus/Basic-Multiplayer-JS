export class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
  }

  moveX(val) {
    this.x += val * this.speed;
  }

  moveY(val) {
    this.y += val * this.speed;
  }
}
