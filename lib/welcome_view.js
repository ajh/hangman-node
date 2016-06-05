var blessed = require('blessed');

exports.WelcomeView = function() {
  return blessed.box({
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
  })
};
