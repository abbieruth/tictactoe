// Connecting the html elements to JS
// Create a board
// Set an active player
// Human player === playerX
// AI player === playerO
// updateBoard function
// init function
// Check for end of game
// if EndGame, end game w/ sweetalert alert + run init() function to reset the board if player chooses

// Sweet Alert documentation: https://sweetalert.js.org/guides/

var GAME = {
  displayPlayer: document.querySelector('.display-player'),
  announcer: document.querySelector('.announcer'),


  isComputerPlaying: false,
  isGameOver: false,
  numberOfPlayedSquares: 0,
  board: ['', '', '', '', '', '', '', '', ''],
  currentPlayer: 'X',
  tiles: $('.tile'), // Set up the tiles with the tile class from index.html, $ is jQuery


  // Winning conditions (object with arrays of winning sets of 3 tiles in a row)
  winningConditions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],

  updateGameBoard: function(index, value, el) {
    this.board[index] = value; // update clicked tile to current player
    el.html(value);
  },


  init: function() {

    this.tiles.each(function() { // clear the squares (HTML)
      $(this).html('');
    });

    this.board = ['', '', '', '', '', '', '', '', '']; // reset board OBJECT to empty

    this.isComputerPlaying = false; // It is not the computer's turn

    this.isGameOver = false; // Game is active

    this.numberOfPlayedSquares = 0; // No played squares yet

    this.announcer.classList.add('hide'); // Hide the announcer until needed

  },

  //Loop through board array
  // Check for empty tiles
  // Check for rows of matching tiles
  // If someone won:
  // Run announcement
  // Switch active game to false
  // return;
  // If no empty tiles and no winner:
  // Run announcement

  checkWin: function(value) {

    var roundWon = false; // Set the variable; no one has won yet

    // we loop through the winningConitions object and set each of the 3 indexes equal to variables of 'a', 'b', 'c'
    for (var combo = 0; combo < this.winningConditions.length; combo++) {
      var a = this.winningConditions[combo][0];
      var b = this.winningConditions[combo][1];
      var c = this.winningConditions[combo][2];

      // this checks the current board's layout with winning combos and ends the game if there is a match
      if (GAME.board[a] === GAME.board[b]) {
        if (GAME.board[b] === GAME.board[c]) {
          if (GAME.board[a] !== '') {
            this.endGame(value);
            roundWon = true;
          } // end if
        } // end if
      } // end if
    } // end for

    return roundWon;
  },

  endGame: function(value) {
    if (value === 'X') { // if X won
      this.announcer.innerHTML = 'Player <span class="playerX">X</span> Won!';
    } else if (value === 'O') { // if O won
      this.announcer.innerHTML = 'Player <span class="playerO">O</span> Won!';
    } else { // if tie
      this.announcer.innerText = 'Tie'
    }
    this.announcer.classList.remove('hide'); // Show announcer

    this.isGameOver = true; // this means the game is over

    // this is sweetAlert alert rather than the stock JS alert
    var playAgain = swal({
      title: "Play Again?",
      text: "",
      icon: "success", // this is the animation 
      buttons: true,
    })
      .then((playAgain) => {
        if (playAgain === true) {
          this.init(); // reset game
        }
      });
  }
}



// *******************************************************************************************************


/* AI Object notes */
// use a heuristic algorithm to determine the best play
// https://www.youtube.com/watch?v=l-hh51ncgDI
// make sure cells that are already taken have a bad score to avoid that move
// look for partially completed combos
// step through cellRank to find the best available score


var AI = {  // Created AI object
  getBestMove: function() { // getBestMove property with a value function  

    //initial rank (score that the program tracks to make decisions) based on number of winning combos
    var cellRank = [3, 2, 3, 2, 4, 2, 3, 2, 3];

    //demote any cells already taken
    for (var i = 0; i < GAME.board.length; i++) {
      if (GAME.board[i] !== '') { // if current tile is empty
        cellRank[i] -= 99; // Adjust the rank
      } // end if
    } // end for

    for (var combo = 0; combo < GAME.winningConditions.length; combo++) { // loops through the winning combos array

      var a = GAME.winningConditions[combo][0];
      var b = GAME.winningConditions[combo][1];
      var c = GAME.winningConditions[combo][2];

      if (GAME.board[a] === GAME.board[b]) { //if any two cells in a combo are
        if (GAME.board[a] !== '') {       // non-empty string and the same value,

          if (GAME.board[c] === '') {
            cellRank[c] += 10;   //promote the remaining cell (c)    
          } // end if
        } // end if
      } // end if

      if (GAME.board[a] === GAME.board[c]) {
        if (GAME.board[a] !== '') {
          if (GAME.board[b] === '') {
            cellRank[b] += 10; // promote the remaining cell (b)		    
          } // end if
        } // end if
      } // end if

      if (GAME.board[b] === GAME.board[c]) {
        if (GAME.board[b] !== '') {
          if (GAME.board[a] === '') {
            cellRank[a] += 10;  //promote the remaining cell (a)		    
          } // end if
        } // end if
      } // end if            		    
    } // end for

    var bestCell = -1; // Setting rank for bestCell
    var highest = -999; // highest is set as a low negative number because we add to it as we go and it WILL be the highest

    for (var j = 0; j < GAME.board.length; j++) {
      if (cellRank[j] > highest) { // If the cellRank index is greater than highest (currently -999)
        highest = cellRank[j]; // changes highest value to new value from cellRank
        bestCell = j; // Looping through, the highest value gets set as the best cell
      } // end if
    } // end for

    return bestCell; // return the best choice       

  },

  playTurn: function() { // property with a function value

    GAME.isComputerPlaying = true; // it is the AI's turn now

    var theSquareToPlay = this.getBestMove(); // sets computer's move to the value of bestCell 

    var $theSelectedSquare = $('.tile-0' + theSquareToPlay); // we are selecting the square with the class of 'square-00'; which is made using concatination 

    GAME.numberOfPlayedSquares++; // increases the GAME.numberOfPlayedSquares value (init in GAME object) by 1

    // slow the computer down a bit + apply CSS classes for color and current player changes
    setTimeout(function() {

      GAME.updateGameBoard(theSquareToPlay, '<span class="playerO">O</span>', $theSelectedSquare); // passes these parameters to GAME.updateGameBoard
      GAME.checkWin('O');
      GAME.isComputerPlaying = false;

      GAME.displayPlayer.classList.remove('playerO'); // removes blue color and 'O'
      GAME.displayPlayer.classList.add('playerX'); // adds green color and 'X'
      GAME.displayPlayer.innerHTML = "X"; // this changes the tiles in the tiles to "X"

    }, Math.random() * 1250); // randomly make the computer wait a x time before playing

  }// end playTurn()	

}; // end AI

// **********************************************************************************************************




// this is what happens on click
// create if function for a user's turn
// Update tile text and class once it's playerX's turn
// Update board array
// Check for win
// Change player's

GAME.tiles.click(function() {

  var tilesIndexValue = parseInt($(this).data('index')); // Whatever HTML tile was clicked we set = to a variable 
  function checkIfTurnIsReady() {
    if (GAME.isGameOver) { return false; } // If the game is over, it's not your turn

    if (GAME.isComputerPlaying) { return false; } // If the computer is playing, it is not your turn

    if (GAME.board[tilesIndexValue] === '') { return true; } // makes sure that the tile clicked is empty
  }

  var isTurnReady = checkIfTurnIsReady();

  if (isTurnReady) { // if it is the human's 

    GAME.updateGameBoard(tilesIndexValue, '<span class="playerX">X</span>', $(this)); // update updateGameBoard these parameters 
    GAME.numberOfPlayedSquares++;

    // checkWin
    var winner = GAME.checkWin('X'); // See if X won

    // If X did not win and some squares left, computer's turn
    if (winner === false && GAME.numberOfPlayedSquares < 9) {

      GAME.displayPlayer.classList.remove('playerX');
      GAME.displayPlayer.classList.add('playerO');
      GAME.displayPlayer.innerHTML = 0;

      AI.playTurn(); // change back to AI player

    } else if (GAME.numberOfPlayedSquares === 9) {
      // If no winners and no tiles left, game is draw
      GAME.endGame('tie');
    }

  } // endif isTurnReady

}); // end GAME.squares.click event handler