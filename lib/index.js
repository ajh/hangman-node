const Blessed = require('blessed');
const Console = require('console').Console;
const fs      = require('fs');
const logger  = new Console(fs.createWriteStream('./log/hangman.log', { flags: 'a' }));

const AnotherGameView = require('./another_game_view.js').AnotherGameView;
const Game            = require('./game.js').Game;
const GameView        = require('./game_view.js').GameView;
const WelcomeView     = require('./welcome_view.js').WelcomeView;

var screen = Blessed.screen({
  smartCSR: true,
  autoPadding: true,
  title: 'hangman',
});

screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var anotherGameView = AnotherGameView();
anotherGameView.key('y', playNewGame);

var container = Blessed.box({ width: '100%', });
screen.append(container);

var welcomeView = WelcomeView();
welcomeView.key('enter', showGameView);
container.append(welcomeView);
welcomeView.focus();

var gameView = GameView(new Game);
gameView.key(Game.alphabet(), handleGameGuess);

screen.render();

function showGameView() {
	welcomeView.detach();

  container.append(gameView);
  gameView.focus();
  screen.render();
}

function handleGameGuess(ch, key) {
  gameView.get('game').guess(ch);

  var isFinished = gameView.get('game').getState() == 'won' || gameView.get('game').getState() == 'lost'
  if (isFinished) {
    showAnotherGameView();
  }

  screen.render();
}

function showAnotherGameView() {
  container.append(anotherGameView);
  anotherGameView.focus();
}

function playNewGame() {
  gameView.set('game', new Game());
  anotherGameView.detach();
  screen.render();
}
