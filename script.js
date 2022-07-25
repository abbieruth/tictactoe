/* First create a eventListener */

// Save HTML elements to JS variables (convert tiles to array for easier handling)

// Create a board
// Set an active player
// Set check variable for active game

// 3 endgame announcement variables
    // win, lose, tie

// Winning conditions (object with arrays  of winning sets of 3 tiles in a row)

// function to validate winner conditions
  // if (win/lose/tie/more choices)
  // then announce (winner/loser/tie)

// "Announcer" function (GUI)
  // Set strings for different outcomes
  // Remove 'hide' class from announcer

// isValidAction function
  // checks if the tile is empty
  // returns true or false

// updateBoard function
  // update clicked tile to current player

// resetBoard function
  // empty TTT grid object
  // set game status
  // hide announcer
  // make starting player = x
  // remove classes

// Change player function
  // Remove class from displayed player
  // Switch current player
  // Update text and class for displayed player

// create function for a user's turn
  // (params: tile and index)
  // Play validation (active game and empty tile)
  // Update tile text and class
  // Update board array
  // Check for win
  // Change player

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

// Clickable tiles