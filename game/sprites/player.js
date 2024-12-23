import Sprite from "./../libs/sprite.js";

export default class Player extends Sprite {
  constructor(scene) {
    super(scene);
    this.name = "player";

  }

  update() {

  }

  draw() {
    const ctx = this.scene.layer[0].context;

  }
}
