export default class {
  constructor() {
    this.callbacks = new Map();
  }
  on(event, callback, context = this) {
    if (this.callbacks.has(event)) {
      this.callbacks.get(event).push([callback, context]);
      return this;
    }
    this.callbacks.set(event, [[callback, context]]);
    return this;
  }
  trigger(event, ...data) {
    if (this.callbacks.has(event)) {
      for (let [callback, context] of this.callbacks.get(event)) {
        callback.apply(context, data);
      }
    }
    return this;
  }
}
