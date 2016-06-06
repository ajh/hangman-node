var _ = require('lodash/fp');
const fs = require('fs');

const maxStrikes = 7;
const alphabet =  new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);

exports.Game = class {
  constructor() {
    this.phrase = this._readPhrase();
    this.guesses = new Set();
    this.strikesCount = 0;
    this.message = '';
  }

  static alphabet() {
    return alphabet;
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
      this.strikesCount += 1;
      this.message = 'No hits. Strike ' + this.strikesCount;
    }

    if (this.getState() == 'lost') {
      this.message = 'You lost. The correct answer is: ' + this.phrase;
    }
    else if (this.getState() == 'won') {
      this.message = 'You won!';
    }
  }

  getState() {
    if (this.strikesCount >= maxStrikes) {
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
      .filter(x => alphabet.has(x) && !this.guesses.has(x))
      .flatMap(x => [x, x.toUpperCase()])
      .value();
  }

  _readPhrase() {
    var lines = fs.readFileSync('./sayings.en.txt', {encoding: 'utf8'}).split('\n');
    return lines[Math.floor(Math.random()*lines.length)];
  }
}
