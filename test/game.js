var expect = require('expect.js');
var Game = require('../lib/game.js').Game;

describe('Game', function() {
  var subject;

  beforeEach(function() {
    subject = new Game();
    subject.phrase = 'the ringer';
  });

  describe('alphabet', function () {
    it('should contain 26 letters', function () {
      expect(Game.alphabet().size).to.be(26);
    });
  });

  describe('getState', function () {
    it('is initially playing', function () {
      var g = new Game;
      expect(g.getState()).to.be('playing');
    });

    it('is can be a win', function () {
      var g = new Game;
      g.guesses = Game.alphabet();
      expect(g.getState()).to.be('won');
    });

    it('is can be a loss', function () {
      var g = new Game;
      g.strikesCount = 99;
      expect(g.getState()).to.be('lost');
    });
  });

  describe('guess', function () {
    context('when guess is a hit', function() {
      it('adds to guesses', function() {
        subject.guess('e');
        expect(subject.guesses.has('e')).to.be.ok();
      });

      it('updates message', function() {
        subject.guess('e');
        expect(subject.message).to.contain('2 hits');
      });

      context('and game is won', function() {
        beforeEach(function() {
          for (let ch of 'thring'.split('')) {
            subject.guess(ch);
          }
        });

        it('updates message', function() {
          subject.guess('e');
          expect(subject.message).to.contain('You won');
        });
      });
    });

    context('when guess is a miss', function() {
      it('increment strikes', function() {
        expect(subject.strikesCount).to.be(0);
        subject.guess('z');
        expect(subject.strikesCount).to.be(1);
      });

      it('updates message', function() {
        subject.guess('z');
        expect(subject.message).to.contain('Strike 1');
      });

      context('and game is lost', function() {
        beforeEach(function() {
          subject.strikesCount = 6;
        });

        it('updates message', function() {
          subject.guess('z');
          expect(subject.message).to.contain('You lost');
        });
      });
    });
  });
});
