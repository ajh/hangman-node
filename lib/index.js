var blessed = require('blessed');
const fs = require('fs');
const Console = require('console').Console;
const logger = new Console(fs.createWriteStream('./log/hangman.log', { flags: 'a' }));

var WelcomeView = require('./welcome_view.js').WelcomeView;
var AnotherGameView = require('./another_game_view.js').AnotherGameView;
var g = require('./game.js');
var gv = require('./game_view.js');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true,
  autoPadding: true,
  title: 'hangman',
});

screen.title = 'Hangman';

screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var welcomeView = WelcomeView(); // not really idiomatic I think
var anotherGameView = AnotherGameView();
var container = blessed.box({
  width: '100%',
});
var game = new g.Game();

welcomeView.key('enter', function(ch, key) {
	welcomeView.detach();

  var gameView = gv.GameView();

  gameView.on('prerender', function() {
    this.content = `
${gv.strikes[game.strikesCount]}

${game.concealPhrase().split('').join(' ')}

${game.message}`;
  });

  gameView.key(g.alphabet, function(ch, key) {
    logger.log("key(" + ch + ")");
    game.guess(ch);

    if (game.getState() == 'won' || game.getState() == 'lost') {
      container.append(anotherGameView);
      anotherGameView.focus();

      anotherGameView.onceKey('y', function() {
        logger.log("onceKey()");
        // play a new game
        game = new g.Game();
        anotherGameView.detach();
        screen.render();
      });
    }

    screen.render();
  });

  container.append(gameView);
  gameView.focus();
  screen.render();
});

screen.append(container);
container.append(welcomeView);
welcomeView.focus();
screen.render();
