export default class Flags {
  flags;

  constructor(flags) {
    this.flags = new Map(flags);
  }

  set(name, value) {
    this.flags.set(name, value);
    return this;
  }

  delete(name) {
    this.flags.delete(name);
    return this;
  }

  get(name) {
    return this.flags.get(name);
  }
}
