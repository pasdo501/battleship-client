class FlashState {
  constructor() {
    this.state = {};
  }

  get(key) {
    const value = this.state[key];
    this.state[key] = null;
    return value;
  }

  set(key, value) {
    this.state[key] = value;
  }

  hasKey(key) {
    return this.state[key] !== undefined || this.state[key] !== null;
  }
}

export default new FlashState();
