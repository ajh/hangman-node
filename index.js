var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Hangman';

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
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

Press q or Ctrl-c to exit at any time.`,
});

var game = blessed.box({
	padding: 2,
  tags: true,
  border: {
    type: 'line'
  },
  content: `

___ ___.

abcd efgh ijklm
nopq rstu vwxyz`,

});

// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', function(ch, key) {
	box.detach();
  screen.append(game);
  game.focus();
  screen.render();
});

// Append our box to the screen.
screen.append(box);

// Focus our element.
box.focus();

// Render the screen.
screen.render();

