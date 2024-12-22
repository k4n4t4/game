import Events from "./events.js";
import Flags from "./flags.js";


export default class Keyboard {
  flag = new Flags();
  event = new Events([
    { name: "down" },
    { name: "up" },
    { name: "press" },
  ]);
  game;

  constructor(game) {
    this.game = game;

    window.addEventListener('keydown', e => {
      e.preventDefault();
      this.flag.set(e.key, true);
      this.event.emit("down", e);
    });
    window.addEventListener('keyup', e => {
      e.preventDefault();
      this.flag.set(e.key, false);
      this.event.emit("up", e);
    });
    window.addEventListener('keypress', e => {
      e.preventDefault();
      this.event.emit("press", e);
    });
  }

  down(name) {
    return this.flag.get(name);
  }
}
