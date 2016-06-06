var _ = require('lodash/fp');

exports.alphabet =  new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);

exports.Game = class {
  constructor() {
    this.phrase = "quick brown fox";
    this.guesses = new Set();
    this.strikes_count = 0;
    this.message = '';
  }

  // Add a letter guess to the game
  guess(ch) {
    ch = ch.toLowerCase();

    var hits = _.chain(this.phrase.split(''))
      .filter(x => x.toLowerCase() === ch)
      .value()
      .length;

    if (hits > 0) {
      this.guesses.add(ch);
      this.message = hits + ' hits';
    }
    else {
      this.strikes_count += 1;
      this.message = 'No hits. Strike ' + this.strikes_count;
    }
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
