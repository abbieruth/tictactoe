/* First create a eventListener */
window.addEventListener('DOMContentLoaded', () => {
  

  // Save HTML elements to JS variables (convert tiles to array for easier handling)
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const displayPlayer = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');
  
  
    // Create a board
  let board = ['', '', '', '', '', '', '', '', ''];
  // Set an active player
  let currentPlayer = 'X';
  // Set check variable for active game
  let isGameActive = true;
  
  
    // 3 endgame announcement variables
      // win, lose, tie
  const PLAYER_X_WON = 'PLAYER X WON!' 
  const PLAYER_O_WON = 'PLAYER O WON!'
  const tie = 'Cat\'s Paw!'
  
    
  // Winning conditions (object with arrays  of winning sets of 3 tiles in a row)
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  // function to validate winner conditions
    // if (win/lose/tie/more choices)
    // then announce (winner/loser/tie)
  
  // Check for end of game
    //Loop through board array
      // Check for empty tiles
      // Check for rows of matching tiles
    // If someone won:
      // Run announcement
      // Switch active game to false
      // return;
    // If no empty tiles and no winner:
      // Run announcement
  
  function checkWin() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
  
    if (roundWon) {
      announce(currentPlayer === 'X' ? PLAYER_X_WON : PLAYER_O_WON);
      isGameActive = false;
      return;
    }
  
    if (!board.includes(''))
      announce(tie);
  }
  
  
  
    // "Announcer" function (GUI)
    // Set strings for different outcomes
    // Remove 'hide' class from announcer
  
  const announce = (type) => {
    switch(type){
      case PLAYER_O_WON:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won!';
        break;
      case PLAYER_X_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won!';
        break;
      case tie:
        announcer.innerText = 'Tie'
    }
    announcer.classList.remove('hide');
    
  }
  
  // isValidAction function
    // checks if the tile is empty
    // returns true or false
  
  const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
      return false;
    }
    return true;
  }
  
  // updateBoard function
  // update clicked tile to current player
  
  const updateBoard = (index) => {
    board[index] = currentPlayer;
  }
  
  // Change player function
    // Remove class from displayed player
    // Switch current player
    // Update text and class for displayed player
    
  const changePlayer = () => {
    displayPlayer.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayPlayer.innerText = currentPlayer;
    displayPlayer.classList.add(`player${currentPlayer}`);
  }
  
  // create function for a user's turn
    // (params: tile and index)
    // Play validation (active game and empty tile)
    // Update tile text and class
    // Update board array
    // Check for win
    // Change player
    
  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      checkWin();
      changePlayer();
    }
  }
  
  // resetBoard function
  // empty TTT grid object
  // set game status
  // hide announcer
  // make starting player = x
  // remove classes
  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');
  
    if (currentPlayer === 'O') {
      changePlayer();
    }
  
    tiles.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('playerX');
      tile.classList.remove('playerO');
    })
  }
  
  // Clickable tiles
  tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
  })
  
  resetButton.addEventListener('click', resetBoard);
});