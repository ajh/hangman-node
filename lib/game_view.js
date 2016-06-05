var blessed = require('blessed');

exports.GameView = function() {
  return blessed.box({
    padding: 2,
    tags: true,
    border: {
      type: 'line'
    },
  });

  var _this = this;
  b.key(alphabet, function(ch, key) {
    _this.guess(ch);
    logger.log(_this.guesses);
  });

  return b;
};
