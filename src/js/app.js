$(document).ready(function () {
  // Test JQ
  $('h1').hover(function(){
    $(this).css("text-decoration", "underline");
  }, function () {
    $(this).css("text-decoration", "none");
  });

swal({
  title: "Welcome to <span style'color:brown'>switchIt</span>!",
  text: "Switch your key piece with pieces on the board in order to match monsters across an entire row or column to get points.",
  html: true
});
//
// setTimeout(function() {
//   $("#launchModal").on('shown.bs.modal', function () {
//       $(".modal").css('display', 'block');
//   });
//   $("#launchModal").modal('show');
// }, 2000);
//// **GLOBAL VARIABLES**
// reference array for monster objects
var monstersObjArray = [
  {
    symbol: "S",
    cssClass: "blue"
  },
  {
    symbol: "X",
    cssClass: "green"
  },
  {
    symbol: "W",
    cssClass: "gray"
  },
  {
    symbol: "H",
    cssClass: "yellow"
  },
  {
    symbol: "Z",
    cssClass: "red"
  }
];
// reference array for level properties
var levelObjArray = [
  {
    level: 0,
    boxNumber: 3,
    maxMoves: 20,
    scoreGoal: 3000,
    pointsVal: 100,
    maxMonsters: 4,
    danger: null
  },
  {
    level: 1,
    boxNumber: 4,
    maxMoves: 24,
    scoreGoal: 6000,
    pointsVal: 100,
    maxMonsters: 5,
    danger: null
  },
  {
    level: 2,
    boxNumber: 5,
    maxMoves: 28,
    scoreGoal: 4500,
    pointsVal: 100,
    maxMonsters: 5,
    danger: null
  }
];
//
var currentLevel = 0;
var numberOfMonsters = levelObjArray[currentLevel].maxMonsters;
var levelsArray = [3, 4, 5]; // might refactor to use levelObjArray
console.log("nMon:", numberOfMonsters);
//
// relates to event listeners
var gameOn = true;
// CREATE & STORE gameArray GLOBALLY
var gameArray = setUpBoard();
//
// CREATE & STORE currentSwitchPiece GLOBALLY
var currentSwitchPiece = createSwitchPiece();
//
// SET UP MAX BOARD SIZE - width/height by level
var maxSize = levelObjArray[currentLevel].boxNumber;
// SET UP MAX MOVES
var maxMoves = levelObjArray[currentLevel].maxMoves;
$("#moves").text(maxMoves);
// SET UP SCORE GOAL
var scoreGoal = levelObjArray[currentLevel].scoreGoal;
$("#goal").text(scoreGoal);
// DISPLAY CURRENT LEVEL TO USER
var userLevel = currentLevel + 1;
$("#level").text(userLevel);
// SET UP POINTS VALUE
var pointsVal = levelObjArray[currentLevel].pointsVal;
// SET SCORE TO ZERO
var score = 0;
$("#score").text(score);
//
//// **FUNCTIONS**
//
// CREATE RANDOM MONSTER
// F:createRandomMonster: creates random monster index
function createRandomMonster() {
  // create random monster index
  var localMonsterIdx = Math.floor(Math.random() * numberOfMonsters);
  return JSON.parse(JSON.stringify(monstersObjArray[localMonsterIdx]));
}
//
// CREATE SWITCH PIECE
function createSwitchPiece() {
  var switchPiece = createRandomMonster();
  // switchPiece.currentIndex = "switch-piece";
  $("#switch-piece").removeClass();
  $("#switch-piece").addClass(switchPiece.cssClass);
  return switchPiece;
}
//
// DYNAMIC GAMEBOARD WITH RANDOM MONSTER PIECES ASSIGNED
function setUpBoard() {
  // create swap piece
  // create temp array for final 2d gameArray
  var localArray1 = [];
  // each row
  for (var i = 0; i < levelsArray[currentLevel]; i++) {
    // create temp array for internal 1d array that we attached to final
    var localArray2 = [];
    // create row and push to DOM
    $("#board").append("<div class='rows' id='row" + i + "'></div>");
    for (var k = 0; k < levelsArray[currentLevel]; k++) {
      // create box and assign id = array location[i][k]
      var box = $("<div class='box' id='idx" + i + k + "'></div>");
      // push columns to html
      $("#row" + i).append(box);
      // create local random monster obj that *does not reference original obj*
      var localMonsterObj = createSwitchPiece();
      // add monster to gameArray (we are at position i, k)
      localArray2.push(localMonsterObj);
      // assign monster symbols to gameboard
      $("#idx" + i + k + "").addClass(localMonsterObj.cssClass);
    }
  localArray1.push(localArray2);
  }
  return localArray1;
}
//
// PLAYER MOVE LOGIC
function switchPiece(row, col) {
  // create temperary reference to currentSwitchPiece
  var tempSwitchPiece = currentSwitchPiece;
  // set currentSwitchPiece to gameboard obj data
  currentSwitchPiece = gameArray[row][col];
  // update HTML classes to remove old class and add new cssClass
  $("#switch-piece").removeClass();
  $("#switch-piece").addClass(currentSwitchPiece.cssClass);
  // set gameboard obj to tempSwitchPiece data
  gameArray[row][col] = tempSwitchPiece;
  // update addClass UI to show new cssClass
  $("#idx" + row + col + "").removeClass(currentSwitchPiece.cssClass);
  $("#idx" + row + col + "").addClass(gameArray[row][col].cssClass);
}
//
// POINTS LOGIC
function getPoints () {
  score = score + (maxSize * pointsVal);
  $("#score").text(score);
}
//
// CHECK ROWS FOR HORIZONTAL MATCHES
function checkRow() {
  for (var i = 0; i < maxSize; i++) {
      var keyRowPiece = gameArray[i][0].cssClass;
      // winning until proven not winning
      var rowMatch = true;
      var checkRowArray = [];
    for (var k = 0; k < maxSize; k++) {
      // compare each box in row (reference currentLevel) to next
      var idx = "idx" + i + k;
      checkRowArray.push(idx);
      if (keyRowPiece !== gameArray[i][k].cssClass) {
        rowMatch = false;
        break;
      }
    }
    if (rowMatch && gameOn) {
      handleMatchResults(checkRowArray);
    // } else if (rowMatch && !gameOn) {
    //   clearWinners(checkRowArray);
    }
  }
  // return rowMatch;
}
// CHECK COLUMNS FOR VERTICAL MATCHES
function checkCol() {
  for (var i = 0; i < maxSize; i++) {
    console.log("maxSize:", maxSize);
    var keyColPiece = gameArray[0][i].cssClass;
    var colMatch = true;
    // console.log("keyColPiece:", keyColPiece);
    var checkColArray = [];
    for (var k = 0; k < maxSize; k++) {
      // console.log("In loop k:", "i:", i, "k:", k);
      var idx = "idx" + k + i;
      checkColArray.push(idx);
      if (keyColPiece !== gameArray[k][i].cssClass) {
        colMatch = false;
        // console.log("colMatch:", colMatch);
        break;
      }
      console.log("colMatch in innerloop:", colMatch);
    }
    if (colMatch && gameOn) {
      handleMatchResults(checkColArray);
    // } else if (colMatch && !gameOn) {
    //   clearWinners (checkColArray);
    }
  console.log("colMatch in outerloop:", colMatch);
  }
  // return colMatch;
}
// HANDLE RESULTS FROM MATCHES
function handleMatchResults (array) {
  for (var i = 0; i < maxSize; i++) {
    var x = array[i].charAt(3);
    var y = array[i].charAt(4);
    $("#" + array[i]).removeClass(gameArray[x][y].cssClass);
    $("#" + array[i]).addClass("score");
    console.log("array[i]:", array[i]);
    // $("#" + array[i]).switchClass(gameArray[x][y].cssClass, "score", 5000, "easeInOutQuad");
  }
  getPoints();
  // setTimeout then clear winning boxes and replace with new pieces
  var setRowDelay = setTimeout(function() {
    clearWinners(array);
  }, 300);
}

// CHECK FOR MATCHES - ROW & COL
function checkForMatches() {
  if (maxMoves > 0 && score < scoreGoal) {
    checkRow();
    checkCol();
  }
  if (score >= scoreGoal) {
    swal ("Winning! Go to Next Level!!");
    // change Levels
    levelUp();
    resetGame();
    runGame();
    console.log("score:", score);
  } else if (maxMoves <= 0) {
    swal("Sorry! You ran out of moves!");
    resetGame();
    runGame();
  }
} // END checkForMatches
//
// CHECK FOR DUPS BEFORE GAME START & AFTER MATCHES
// function checkForDups() {
//   var colResult = true;
//   var rowResult = true;
//   do {
//     colResult = checkCol();
//     rowResult = checkRow();
//   } while (colResult || rowResult);
//   if (!colResult && !rowResult) {
//     gameOn = true;
//   }
// }
//
// CLEAR WINNERS
function clearWinners (array) {
  array.forEach(function(e) {
    // create local random monster obj that *does not reference original obj*
    var localMonsterObj = createRandomMonster();
    // extract location from e
    console.log("e:", e);
    var x = e.charAt(3);
    var y = e.charAt(4);
    // console.log(x, " ", y);
    // add monster to gameArray at index
    gameArray[x][y] = localMonsterObj;
    // update gameboard with new monster
    $("#" + e).removeClass("score");
    $("#" + e).addClass(localMonsterObj.cssClass);
  });
  // checkForDups();
}
//
// LEVEL UP
function levelUp() {
  console.log("LevelUpBefore:", currentLevel)
  if (currentLevel < (levelsArray.length - 2))  {
    currentLevel++;
  } else if (currentLevel === (levelsArray.length - 1)) {
    swal("That's all for now...");
    currentLevel = 0;
  }
}
// RESET GAME
function resetGame() {
  // remove old board
  $(".rows").remove();
  // update global variables
  gameArray = setUpBoard();
  currentSwitchPiece = createSwitchPiece();
  maxSize = levelObjArray[currentLevel].boxNumber;
  maxMoves = levelObjArray[currentLevel].maxMoves;
  $("#moves").text(maxMoves);
  scoreGoal = levelObjArray[currentLevel].scoreGoal;
  $("#goal").text(scoreGoal);
  pointsVal = levelObjArray[currentLevel].pointsVal;
  var score = 0;
  $("#score").text(score);
  console.log("resetScore:", score);
  var userLevel = currentLevel + 1;
  $("#level").text(userLevel);
  //
  console.log("gameArray:", gameArray,
    "maxSize:", maxSize,
    "maxMoves:", maxMoves,
    "scoreGoal:", scoreGoal,
    "score:", score,
    "gameOn:", gameOn,
    "noMon:", numberOfMonsters);
}
//
// EVENT LISTENERS
// !! add function to make event listeners not work if board is not playable
// add click listeners - create fct parameters i, k
//
// RUN GAME
function runGame () {
  $(".box").click(function(e) {
    // if (gameOn) {
      maxMoves = maxMoves - 1;
      $("#moves").text(maxMoves);
      var indexString = $(this).attr("id");
      var x = indexString.charAt(3);
      var y = indexString.charAt(4);
      if (gameOn) {
        switchPiece(x, y);
        checkForMatches();
        // checkForDups();
      }
  });
}
// START!
// checkForDups();
runGame();
//
}); // End Ready

// $( "button" ).on( "click", function() {
//   $( "p" ).append( "Started..." );

//   $( "div" ).each(function( i ) {
//     $( this ).fadeIn().fadeOut( 1000 * ( i + 1 ) );
//   });

//   $( "div" ).promise().done(function() {
//     $( "p" ).append( " Finished! " );
//   });
// });
