var blessed = require('blessed');

exports.GameView = function(game) {
  var b = blessed.box({
    padding: 2,
    tags: true,
    width: '100%',
    shrink: true,
  });

  b.set('game', game);

  b.on('prerender', function() {
    this.content = `
${strikes[this.get('game').strikesCount]}

${this.get('game').concealPhrase().split('').join(' ')}

${this.get('game').message}`;
  });

  return b;
};

var strikes = [];

strikes[7] = `
  -------
  |     |
  |     @
  |    /|\\
  |     |
  |    / \\
  |
_____________
|           |__
|              |
----------------
`;

strikes[6] = `
  -------
  |     |
  |
  |    /|\\
  |     |
  |    / \\
  |
_____________
|           |__
|              |
----------------
`;

strikes[5] = `
  -------
  |     |
  |
  |    / \\
  |     |
  |    / \\
  |
_____________
|           |__
|              |
----------------
`;

strikes[4] = `
  -------
  |     |
  |
  |      \\
  |     |
  |    / \\
  |
_____________
|           |__
|              |
----------------
`;

strikes[3] = `
  -------
  |     |
  |
  |      \\
  |     |
  |    /
  |
_____________
|           |__
|              |
----------------
`;

strikes[2] = `
  -------
  |     |
  |
  |      \\
  |
  |    /
  |
_____________
|           |__
|              |
----------------
`;

strikes[1] = `
  -------
  |     |
  |
  |
  |
  |    /
  |
_____________
|           |__
|              |
----------------
`;

strikes[0] = `
  -------
  |     |
  |
  |
  |
  |
  |
_____________
|           |__
|              |
----------------
`;
