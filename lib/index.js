var blessed = require('blessed');
const fs = require('fs');
const Console = require('console').Console;
const logger = new Console(fs.createWriteStream('./log/hangman.log', { flags: 'a' }));

var WelcomeView = require('./welcome_view.js').WelcomeView;
var g = require('./game.js');
var gv = require('./game_view.js');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Hangman';

screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var welcomeView = WelcomeView(); // not really idiomatic I think
var game = new g.Game();

welcomeView.key('enter', function(ch, key) {
	welcomeView.detach();

  var gameView = gv.GameView();

  gameView.on('prerender', function() {
    this.content = `
${gv.strikes[game.strikesCount]}

${game.concealPhrase()}

${game.message}`;

    if (game.getState() == 'won' || game.getState() == 'lost') {
      this.content += "\n\nPress 'y' to play a new game."
    }
  });

  gameView.key(g.alphabet, function(ch, key) {
    game.guess(ch);

    if (game.getState() == 'won' || game.getState() == 'lost') {
      gameView.onceKey('y', function() {
        // play a new game
        game = new g.Game();
        screen.render();
      });
    }

    screen.render();
  });

  screen.append(gameView);
  gameView.focus();
  screen.render();
});

screen.append(welcomeView);
welcomeView.focus();
screen.render();
