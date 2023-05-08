export class Graphics {
  constructor(ctx) {
    this.ctx = ctx;
  }

  handleGraphics(objects) {
    this.ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);

    objects.forEach((obj) => {
      obj.draw(this.ctx);
    });
  }
}
