var _ = require('lodash/fp');

exports.maxStrikes = 10;

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

    if (this.getState() == 'lost') {
      this.message = 'You lost.';
    }
    else if (this.getState() == 'won') {
      this.message = 'You won!';
    }
  }

  getState() {
    if (this.strikes >= exports.maxStrikes) {
      return 'lost';
    }
    else if (this._notGuessed() == 0) {
      return 'won';
    }
    else {
      return 'playing';
    }
  }

  // Returns the phrase as a string with un-guessed letters replaced by
  // underscores.
  concealPhrase() {
    var re = new RegExp("[" + this._notGuessed().join('') + "]", "g");
    return this.phrase.replace(re, "_");
  }

  // Return array of characters which aren't guessed yet
  _notGuessed() {
    return _.chain(this.phrase.split(''))
      .map(x => x.toLowerCase())
      .uniq()
      .filter(x => exports.alphabet.has(x) && !this.guesses.has(x))
      .flatMap(x => [x, x.toUpperCase()])
      .value();
  }
}
