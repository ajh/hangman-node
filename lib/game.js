var _ = require('lodash/fp');

exports.alphabet =  new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);

exports.Game = class {
  constructor() {
    this.phrase = "The quick brown fox jumps over the lazy dog";
    this.guesses = new Set();
  }

  // Add a letter guess to the game
  guess(ch) {
    this.guesses.add(ch.toLowerCase());
  }

  getState() {
    return 'playing';
  }

  // Returns the phrase as a string with un-guessed letters replaced by
  // underscores.
  concealPhrase() {
    var _this = this;

    var notGuessed = _.chain([...exports.alphabet])
      .filter(x => !this.guesses.has(x))
      .flatMap(x => [x, x.toUpperCase()])
      .value()
      .join('');
    var re = new RegExp("[" + notGuessed + "]", "g");
    return this.phrase.replace(re, "_");
  }
}
