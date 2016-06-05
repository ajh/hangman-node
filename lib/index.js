var blessed = require('blessed');
const fs = require('fs');
const Console = require('console').Console;
const logger = new Console(fs.createWriteStream('./log/hangman.log', { flags: 'a' }));

var WelcomeView = require('./welcome_view.js').WelcomeView;
var games = require('./game.js');
var GameView = require('./game_view.js').GameView;

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Hangman';

screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var welcomeView = WelcomeView(); // not really idiomatic I think
var game = new games.Game();

welcomeView.key('enter', function(ch, key) {
	welcomeView.detach();

  var gameView = GameView();
  gameView.on('prerender', function() {
    logger.log('prerender');
    this.content = game.concealPhrase();
  });
  gameView.key(games.alphabet, function(ch, key) {
    logger.log('key');
    game.guess(ch);
    screen.render();
  });

  screen.append(gameView);
  gameView.focus();
  screen.render();
});

screen.append(welcomeView);
welcomeView.focus();
screen.render();
