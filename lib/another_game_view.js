var blessed = require('blessed');

exports.AnotherGameView = function() {
  return blessed.box({
    content: "Press 'y' to play a new game. Esc to quit.",
    shrink: true,
    padding: 2,
    width: '100%',
  });
};
