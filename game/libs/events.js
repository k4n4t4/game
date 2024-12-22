class EventSet {
  list;

  constructor(callbacks) {
    this.list = new Set(callbacks);
  }

  add(callback) {
    this.list.add(callback);
    return callback;
  }

  delete(callback) {
    this.list.delete(callback);
    return this;
  }

  emit(e) {
    for (const callback of this.list) {
      callback(e);
    }
    return this;
  }
}

export default class Events {
  events = new Map();

  constructor(events) {
    if (events) {
      for (const e of events) {
        this.create(e.name, e.callbacks);
      }
    }
  }

  create(name, callbacks) {
    this.events.set(name, new EventSet(callbacks));
    return this;
  }

  add(name, callback) {
    this.events.get(name).add(callback);
    return this;
  }

  emit(name, args) {
    this.events.get(name).emit(args);
    return this;
  }
}
