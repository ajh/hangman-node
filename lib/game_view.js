var blessed = require('blessed');

exports.GameView = function() {
  return blessed.box({
    padding: 2,
    tags: true,
    border: {
      type: 'line'
    },
  });
};
