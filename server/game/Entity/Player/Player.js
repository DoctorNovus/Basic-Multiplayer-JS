import { Entity } from "../Entity";

export class Player extends Entity {
  constructor(id, x, y) {
    super(x, y);
    this.id = id;
  }
}
