var blessed = require('blessed');
var Game = require('./game.js').Game;

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Hangman';

screen.key(['escape', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var welcome = blessed.box({
  top: 'center',
  left: 'center',
	padding: 2,
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  },
  content: `
 _
| |__   __ _ _ __   __ _ _ __ ___   __ _ _ __
| '_ \\ / _. | '_ \\ / _. | '_ . _ \\ / _. | '_ \\
| | | | (_| | | | | (_| | | | | | | (_| | | | |
|_| |_|\\__,_|_| |_|\\__, |_| |_| |_|\\__,_|_| |_|
                   |___/

Welcome to hangman.

Press Enter to play.

Press ESC or Ctrl-c to exit at any time.`,
});

// If box is focused, handle `enter`/`return` and give us some more content.
welcome.key('enter', function(ch, key) {
	welcome.detach();
  var game = new Game(screen);
  screen.append(game.blessed);
  game.blessed.focus();
  screen.render();
});

// I think what I want is a game factory
// 1. It randomly chooses a phrase.
// 2. blessed property
// 3. choose method
// 4. getState method -> playing, won, lost

// Append our box to the screen.
screen.append(welcome);

// Focus our element.
welcome.focus();

// Render the screen.
screen.render();

