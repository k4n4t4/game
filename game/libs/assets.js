export default class Assets {

  images = {};
  loadImg(name, path) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;
      img.onload = _ => {
        this.setImg(name, img);
        resolve(img);
      };
      img.onerror = e => {
        reject(e);
      };
    });
  }
  setImg(name, img) {
    this.images[name] = img;
  }
  getImg(name) {
    return this.images[name];
  }

  sounds = {};
  loadSound(name, path) {
    return new Promise((resolve, reject) => {
      const sound = new Audio(path);
      sound.addEventListener('loadeddata', _ => {
        this.setSound(name, sound);
        resolve(sound);
      });
      sound.addEventListener('error', e => {
        reject(e);
      });
    });
  }
  setSound(name, sound) {
    this.sounds[name] = sound;
  }
  getSound(name) {
    return this.sounds[name];
  }
  play(name) {
    this.getSound(name).currentTime = 0;
    this.getSound(name).play();
  }
  loop(name) {
    this.getSound(name).currentTime = 0;
    this.getSound(name).loop = true;
    this.getSound(name).play();
  }
  loopStop(name) {
    this.getSound(name).loop = false;
  }

}
