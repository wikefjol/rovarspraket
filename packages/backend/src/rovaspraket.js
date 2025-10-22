function toRovarspraket(input) {
    if (input == null) return "";
    const vowels = "aeiouyåäöAEIOUYÅÄÖ";
    return String(input).replace(/[\p{L}]/gu, ch => {
      if (vowels.includes(ch)) return ch;
      const lower = ch.toLocaleLowerCase();
      const second = ch !== lower ? lower : ch;
      return ch + "o" + second;
    });
  }
  module.exports = { toRovarspraket };