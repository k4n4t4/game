import Events from "./events.js";
import Flags from "./flags.js";


export default class Scene {
  flag = new Flags([
    ["loaded", false],
    ["active", false],
  ]);
  event = new Events([
    {
      name: "onload",
      callbacks: [ () => { this.onload() } ],
    },
    {
      name: "onenter",
      callbacks: [ () => {
        this.flag.set("active", true);
        this.onenter();
      } ],
    },
    {
      name: "onleave",
      callbacks: [ () => {
        this.flag.set("active", false);
        this.onleave();
      } ],
    },
  ]);
  name;
  root;

  constructor(root, name="scene") {
    this.name = name;
    this.root = root;
  }

  onload() {}
  onenter() {}
  onleave() {}

  enter() {
    if (!this.flag.get("active")) {
      this.event.emit("onenter");
    }
  }

  leave() {
    if (this.flag.get("active")) {
      this.event.emit("onleave");
    }
  }

  load(promises=[]) {
    const promise = Promise.all(promises);
    promise.then(_ => {
      this.flag.set("loaded", true);
      this.event.emit("onload");
    });
    return promise;
  }

  update() {}
  draw() {}
}
