$(document).ready(function () {
  // Test JQ
  $('h1').hover(function(){
    $(this).css("text-decoration", "underline");
  }, function () {
    $(this).css("text-decoration", "none");
  });
//
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
    maxMoves: 10,
    scoreGoal: 1500,
    pointsVal: 100,
    maxMonsters: 4,
    danger: null
  },
  {
    level: 1,
    boxNumber: 4,
    maxMoves: 12,
    scoreGoal: 3000,
    pointsVal: 100,
    maxMonsters: 5,
    danger: null
  },
  {
    level: 2,
    boxNumber: 5,
    maxMoves: 14,
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
      // create random monster index
      // var localMonsterIdx = createRandomMonster();
      // create local random monster obj that *does not reference original obj*
      var localMonsterObj = createSwitchPiece();
      // set monster property currentIndex to idx[i]k[]
      // RETIRED // localMonsterObj.currentIndex = $("#idx" + i + k + "").attr("id");
      // add monster to gameArray (we are at position i, k)
      localArray2.push(localMonsterObj);
      // console.log("localMonsterObj: ", JSON.stringify(localMonsterObj));
      // console.log("kIndex: ", localMonsterObj.currentIndex);
      // assign monster symbols to gameboard
      // $("#idx" + i + k + "").html(localMonsterObj.cssClass);
      $("#idx" + i + k + "").addClass(localMonsterObj.cssClass);
  // console.log("localArray2: ", JSON.stringify(localArray2));
    }
  // console.log("localArray2: ", JSON.stringify(localArray2));
  localArray1.push(localArray2);
  }
  return localArray1;
}
//
// PLAYER MOVE LOGIC
function switchPiece(row, col) {
  // create temperary reference to currentSwitchPiece
  var tempSwitchPiece = currentSwitchPiece;
  // console.log("tempGP: ", JSON.stringify(tempSwitchPiece));
  // console.log("tempSP: ", tempSwitchPiece);
  // set currentSwitchPiece to gameboard obj data
  currentSwitchPiece = gameArray[row][col];
  // console.log("New curSwP: ", JSON.stringify(currentSwitchPiece));
  // update HTML UI to show new cssClass
  // $("#switch-piece").addClass(currentSwitchPiece.cssClass);
  $("#switch-piece").removeClass();
  $("#switch-piece").addClass(currentSwitchPiece.cssClass);
  // set gameboard obj to tempSwitchPiece data
  gameArray[row][col] = tempSwitchPiece;
  // console.log("New gameP: ", JSON.stringify(gameArray[row][col]));
  // update addClass UI to show new cssClass
  // $("#idx" + row + col + "").addClass(gameArray[row][col].cssClass);
  $("#idx" + row + col + "").removeClass(currentSwitchPiece.cssClass);
  $("#idx" + row + col + "").addClass(gameArray[row][col].cssClass);
}
//
// **GAME LOGIC**
//
// POINTS LOGIC
function getPoints () {
  score = score + (maxSize * pointsVal);
  $("#score").text(score);
}
//
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
    if (rowMatch) {
      handleMatchResults(checkRowArray);
    }
  }
}
// CHECK COLUMN
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
    }
    if (colMatch) {
      handleMatchResults(checkColArray);
    }
  }
}
// HANDLE RESULTS FROM MATCHES
function handleMatchResults (array) {
  for (var i = 0; i < maxSize; i++) {
    var x = array[i].charAt(3);
    var y = array[i].charAt(4);
    $("#" + array[i]).removeClass(gameArray[x][y].cssClass);
    $("#" + array[i]).addClass("score");
    // $("#idx" + x + y + "").switchClass(gameArray[x][y].cssClass, "score", 1000, "easeOutBounce");
  }
  getPoints();
  // var store = array;
  // setTimeout then clear winning boxes and replace with new pieces
  // var setRowDelay = setTimeout(function() {
  clearWinners(array);
  // }, 200);
}

// CHECK FOR MATCHES - ROW & COL
function checkForMatches() {
  if (maxMoves > 0 && score < scoreGoal) {
    checkRow();
    checkCol();
  } else if (score >= scoreGoal) {
    alert("Winning!");
    // change Levels
    levelUp();
    resetGame();
    runGame();
  } else if (maxMoves <= 0) {
    alert("No more moves!");
    resetGame();
    runGame();
  }
} // END checkForMatches
//
// SCRAP FOR DUPS
// function scrapForDups (match) {
//   if (match) {

//   }
// }
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
}
//
// LEVEL UP
function levelUp() {
  if (currentLevel < 3)  {
    currentLevel++;
    alert ("Go to Next Level!!");
  } else if (currentLevel === 3) {
    alert("That's all for now...");
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
    if (gameOn) {
      maxMoves = maxMoves - 1;
      $("#moves").text(maxMoves);
      var indexString = $(this).attr("id");
      var x = indexString.charAt(3);
      var y = indexString.charAt(4);
      switchPiece(x, y);
      checkForMatches();
    }
  });
}
// START!
runGame();
//
}); // End Ready
