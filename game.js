var blessed = require('blessed');
var _ = require('lodash/fp');
const fs = require('fs');
const Console = require('console').Console;

const logger = new Console(fs.createWriteStream('./log/hangman.log', { flags: 'a' }));

var alphabet =  new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);

class Game {
  constructor(screen) {
    this.screen = screen; // ahh this is horrible
    this.phrase = "The quick brown fox jumps over the lazy dog";
    this.guesses = new Set();

    this.blessed = this._buildBlessed();
  }

  guess(ch) {
    ch = ch.toLowerCase();
    this.guesses.add(ch);
    this.blessed.setContent(this._content());
    this.screen.render() // ahh this is horrible
  }

  getState() {
    return 'playing';
  }

  _buildBlessed() {
    var b = blessed.box({
      padding: 2,
      tags: true,
      border: {
        type: 'line'
      },
      content: this._content(),
    });

    var _this = this;
    b.key(alphabet, function(ch, key) {
      _this.guess(ch);
      logger.log(_this.guesses);
    });

    return b;
  }

  _content() {
      return `

${this._concealPhrase()}.

abcd efgh ijklm
nopq rstu vwxyz`;
  }

  _concealPhrase() {
    var _this = this;

    var notGuessed = _.chain([...alphabet])
      .filter(x => !this.guesses.has(x))
      .flatMap(x => [x, x.toUpperCase()])
      .value()
      .join('');
    var re = new RegExp("[" + notGuessed + "]", "g");
    return this.phrase.replace(re, "_");
  }
}

exports.Game = Game;
