import Assets from "./assets.js";
import Events from "./events.js";
import Flags from "./flags.js";


export default class Scene {
  assets = new Assets();
  flag = new Flags([
    ["loaded", false],
  ]);
  event = new Events([
    {
      name: "onload",
      callbacks: [ () => { this.onload() } ],
    },
    {
      name: "onenter",
      callbacks: [ () => { this.onenter() } ],
    },
    {
      name: "onleave",
      callbacks: [ () => { this.onleave() } ],
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

  load(promises=[]) {
    const promise = Promise.all(promises);
    promise.then(_ => {
      this.flag.set("loaded", true);
      this.event.emit("onload");
    });
    return promise;
  }

  init() {
    let load = null;
    if (!this.flag.get("loaded")) {
      this.root.flag.set("pause", true);
      load = this.load();
      load.then(_ => {
        this.root.flag.set("pause", false);
        this.event.emit("onenter");
      });
    } else {
      this.event.emit("onenter");
    }
    return load;
  }

  update() {}
  draw() {}
}
