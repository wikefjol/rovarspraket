function add(a, b) {
    if (typeof a !== "number" || typeof b !== "number") throw new TypeError("numbers only");
    return a + b;
  }
  module.exports = { add };