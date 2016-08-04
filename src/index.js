export default class Channel {
  constructor({ transport }) {
    this._transport = transport;
    this._transport.setHandler(this._handleEvent.bind(this));
    this._listeners = {};
  }

  connect() {
    return this._transport.connect();
  }

  addListener(type, listener) {
    this.on(type, listener);
  }

  emit(type, ...args) {
    const event = {type, args};
    this._transport.send(event);
  }

  eventNames() {
    return Object.keys(this._listeners);
  }

  listenerCount(type) {
    const listeners = this._listeners[type];
    return listeners ? listeners.length : 0;
  }

  listeners(type) {
    return this._listeners[type];
  }

  on(type, listener) {
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].push(listener);
  }

  once(type, listener) {
    const onceListener = this._onceListener(type, listener);
    this.on(type, onceListener);
  }

  prependListener(type, listener) {
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].unshift(listener);
  }

  prependOnceListener(type, listener) {
    const onceListener = this._onceListener(type, listener);
    this.prependListener(type, onceListener);
  }

  removeAllListeners(type) {
    if (!type) {
      this._listeners = {};
    } else if (this._listeners[type]) {
      delete this._listeners[type];
    }
  }

  removeListener(type, listener) {
    const listeners = this._listeners[type];
    if (listeners) {
      this._listeners[type] = listeners.filter(l => l !== listener);
    }
  }

  _handleEvent(event) {
    const listeners = this._listeners[event.type];
    if (listeners) {
      listeners.forEach(fn => fn(...event.args));
    }
  }

  _onceListener(type, listener) {
    const onceListener = (...args) => {
      this.removeListener(type, onceListener);
      return listener(...args);
    };
    return onceListener;
  }
}
