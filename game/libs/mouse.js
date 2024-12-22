import Events from "./events.js";
import Flags from "./flags.js";


function calcMouseCoord(e) {
  const rect = e.target.getBoundingClientRect();
  const vx = e.clientX - rect.left;
  const vy = e.clientY - rect.top;
  const sw = e.target.clientWidth / e.target.width;
  const sh = e.target.clientHeight / e.target.height;
  const x = vx / sw;
  const y = vy / sh;

  return [x, y];
}


export default class Mouse {
  flag = new Flags([
    ["left", false],
    ["middle", false],
    ["right", false],
    ["click", false],
    ["touch", false],
  ]);
  event = new Events([
    { name: "down" },
    { name: "up" },
    { name: "move" },
    { name: "click" },
    { name: "touchmove" },
  ]);
  game;
  x = 0;
  y = 0;
  old_x = 0;
  old_y = 0;

  get vx() { return this.x - this.old_x }
  get vy() { return this.y - this.old_y }

  constructor(game) {
    this.game = game;

    game.canvas.addEventListener('click', e => {
      e.preventDefault();

      [this.old_x, this.old_y] = [this.x, this.y];
      [this.x, this.y] = calcMouseCoord(e);

      this.event.emit("click", e);
    });

    game.canvas.addEventListener('mousedown', e => {
      e.preventDefault();

      switch (e.button) {
        case 0: this.flag.set("left", true); break;
        case 1: this.flag.set("middle", true); break;
        case 2: this.flag.set("right", true); break;
      }
      this.flag.set("click", true);

      [this.old_x, this.old_y] = [this.x, this.y];
      [this.x, this.y] = calcMouseCoord(e);

      this.event.emit("down", e);
    });

    game.canvas.addEventListener('mouseup', e => {
      e.preventDefault();

      switch (e.button) {
        case 0: this.flag.set("left", false); break;
        case 1: this.flag.set("middle", false); break;
        case 2: this.flag.set("right", false); break;
      }
      this.flag.set("click", false);

      this.event.emit("up", e);
    });

    game.canvas.addEventListener('mousemove', e => {
      e.preventDefault();

      [this.old_x, this.old_y] = [this.x, this.y];
      [this.x, this.y] = calcMouseCoord(e);

      this.event.emit("move", e);
    });

    game.canvas.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
    game.canvas.addEventListener('mouseenter', e => {
      e.preventDefault();
    });
    game.canvas.addEventListener('mouseleave', e => {
      e.preventDefault();
    });

    game.canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      const touches = e.changedTouches;

      this.flag.set("touch", true);

      [this.old_x, this.old_y] = [this.x, this.y];
      [this.x, this.y] = calcMouseCoord(touches[0]);

      this.event.emit("down", e);
    });

    game.canvas.addEventListener('touchend', e => {
      e.preventDefault();

      this.flag.set("touch", false);

      this.event.emit("up", e);
    });

    game.canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      const touches = e.changedTouches;

      [this.old_x, this.old_y] = [this.x, this.y];
      [this.x, this.y] = calcMouseCoord(touches[0]);

      this.event.emit("touchmove", e);
    });

  }
}
