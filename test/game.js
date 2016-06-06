var expect = require('expect.js');
var Game = require('../lib/game.js').Game;

describe('Game', function() {
  describe('alphabet', function () {
    it('should contain 26 letters', function () {
      expect(Game.alphabet().size).to.be(26);
    });
  });
});
