export default class Scenes {
  current_name = "";
  scenes = new Map();

  constructor(scenes) {
    if (scenes) {
      this.setAll(scenes);
    }
  }

  get current() {
    return this.scenes.get(this.current_name);
  }

  change(name) {
    this.current?.event.emit("onleave");
    this.current_name = name;
    return this.current;
  }

  set(scene) {
    this.scenes.set(scene.name, scene);
    return this;
  }

  delete(name) {
    this.scenes.delete(name);
    return this;
  }

  setAll(scenes) {
    for (const scene of scenes) {
      this.set(scene);
    }
  }

  get(name=this.current_name) {
    return this.scenes.get(name);
  }
}
