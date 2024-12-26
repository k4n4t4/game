import Events from "./events.js";
import Flags from "./flags.js";


export class Keyboard {
  flag = new Flags();
  event = new Events([
    { name: "down" },
    { name: "up" },
    { name: "press" },
  ]);

  constructor(target) {
    target.addEventListener('keydown', e => {
      e.preventDefault();
      this.flag.set(e.key, true);
      this.event.emit("down", e);
    });
    target.addEventListener('keyup', e => {
      e.preventDefault();
      this.flag.set(e.key, false);
      this.event.emit("up", e);
    });
    target.addEventListener('keypress', e => {
      e.preventDefault();
      this.event.emit("press", e);
    });
  }

  down(name) {
    return this.flag.get(name);
  }
}


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

export class Mouse {
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
    { name: "touchstart" },
    { name: "touchend" },
    { name: "touchmove" },
  ]);
  x = 0;
  y = 0;
  old_x = 0;
  old_y = 0;

  get vx() { return this.x - this.old_x }
  get vy() { return this.y - this.old_y }

  constructor(canvas) {

    canvas.addEventListener('click', e => {
      e.preventDefault();

      [this.x, this.y] = calcMouseCoord(e);
      [this.old_x, this.old_y] = [this.x, this.y];

      this.event.emit("click", e);
    });

    canvas.addEventListener('mousedown', e => {
      e.preventDefault();

      switch (e.button) {
        case 0: this.flag.set("left", true); break;
        case 1: this.flag.set("middle", true); break;
        case 2: this.flag.set("right", true); break;
      }
      this.flag.set("click", true);

      [this.x, this.y] = calcMouseCoord(e);
      [this.old_x, this.old_y] = [this.x, this.y];

      this.event.emit("down", e);
    });

    canvas.addEventListener('mouseup', e => {
      e.preventDefault();

      switch (e.button) {
        case 0: this.flag.set("left", false); break;
        case 1: this.flag.set("middle", false); break;
        case 2: this.flag.set("right", false); break;
      }
      this.flag.set("click", false);

      this.event.emit("up", e);
    });

    canvas.addEventListener('mousemove', e => {
      e.preventDefault();

      [this.old_x, this.old_y] = [this.x, this.y];
      [this.x, this.y] = calcMouseCoord(e);

      this.event.emit("move", e);
    });

    canvas.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
    canvas.addEventListener('mouseenter', e => {
      e.preventDefault();
    });
    canvas.addEventListener('mouseleave', e => {
      e.preventDefault();
      this.flag.set("left", false);
      this.flag.set("middle", false);
      this.flag.set("right", false);
      this.flag.set("click", false);
    });

    canvas.addEventListener('touchstart', e => {
      const touches = e.targetTouches;

      this.flag.set("touch", true);

      [this.x, this.y] = calcMouseCoord(touches[0]);
      [this.old_x, this.old_y] = [this.x, this.y];

      this.event.emit("touchstart", e);
    });

    canvas.addEventListener('touchend', e => {
      this.flag.set("touch", false);

      this.event.emit("touchend", e);
    });

    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      const touches = e.targetTouches;

      [this.old_x, this.old_y] = [this.x, this.y];
      [this.x, this.y] = calcMouseCoord(touches[0]);

      this.event.emit("touchmove", e);
    });

  }
}
