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
  }
];
// reference array for level properties
var levelObjArray = [
  {
    level: 0,
    boxNumber: 3,
    maxMoves: 10,
    scoreGoal: 1200,
    pointsVal: 100,
    danger: null
  },
  {
    level: 1,
    boxNumber: 4,
    maxMoves: 10,
    scoreGoal: 1200,
    pointsVal: 100,
    danger: null
  },
  {
    level: 2,
    boxNumber: 5,
    maxMoves: 10,
    scoreGoal: 1200,
    pointsVal: 100,
    danger: null
  }
];
//
var numberOfMonsters = monstersObjArray.length;
var levelsArray = [3, 4, 5]; // might refactor to use levelObjArray
var currentLevel = 0;
//
// IF true, EVENT HANDLERS ON
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
//
//// **FUNCTIONS**
//
// CREATE RANDOM MONSTER
// F:createRandomMonster: create 1 of 3 random monsters
function createRandomMonster() {
// Random number logic
  return Math.floor(Math.random() * numberOfMonsters);
}
//
// CREATE SWITCH PIECE
function createSwitchPiece() {
  var localSwitchIdx = createRandomMonster();
  var switchPiece = JSON.parse(JSON.stringify(monstersObjArray[localSwitchIdx]));
  // switchPiece.currentIndex = "switch-piece";
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
      var localMonsterIdx = createRandomMonster();
      // create local random monster obj that *does not reference original obj*
      var kLocalObj = JSON.parse(JSON.stringify(monstersObjArray[localMonsterIdx]));
      // set monster property currentIndex to idx[i]k[]
      // RETIRED // kLocalObj.currentIndex = $("#idx" + i + k + "").attr("id");
      // add monster to gameArray (we are at position i, k)
      localArray2.push(kLocalObj);
      // console.log("kLocalObj: ", JSON.stringify(kLocalObj));
      // console.log("kIndex: ", kLocalObj.currentIndex);
      // assign monster symbols to gameboard
      // $("#idx" + i + k + "").html(kLocalObj.cssClass);
      $("#idx" + i + k + "").addClass(kLocalObj.cssClass);
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
  // var tempGamePiece = gameArray[row][col];
  var tempSwitchPiece = currentSwitchPiece;
  // console.log("tempGP: ", JSON.stringify(tempSwitchPiece));
  // console.log("tempSP: ", tempSwitchPiece);
  // set currentSwitchPiece to gameboard obj data
  currentSwitchPiece = gameArray[row][col];
  // console.log("New curSwP: ", JSON.stringify(currentSwitchPiece));
  // update HTML UI to show new cssClass
  // $("#switch-piece").addClass(currentSwitchPiece.cssClass);
  $("#switch-piece").switchClass(tempSwitchPiece.cssClass, currentSwitchPiece.cssClass);
  // set gameboard obj to tempSwitchPiece data
  gameArray[row][col] = tempSwitchPiece;
  // console.log("New gameP: ", JSON.stringify(gameArray[row][col]));
  // update addClass UI to show new cssClass
  // $("#idx" + row + col + "").addClass(gameArray[row][col].cssClass);
  $("#idx" + row + col + "").switchClass(currentSwitchPiece.cssClass, gameArray[row][col].cssClass);
}
//
// GAME LOGIC
//
// POINTS LOGIC
function getPoints () {
  if (score < scoreGoal) {
  score = score + (maxSize * pointsVal);
  // console.log("length:", maxSize);
  // console.log("points:", pointsVal, "score:", score);
  $("#score").text(score);
  }
}
//
// CHECK FOR MATCHES - ROW & COL
function checkForMatches() {
  // for loop that continues until entire row is equal
  maxMoves = maxMoves - 1;
  $("#moves").text(maxMoves);
  if (maxMoves !== 0) {
    for (var i = 0; i < maxSize; i++) {
      var keyRowPiece = gameArray[i][0].cssClass;
      // winning until proven not winning
      var rowMatch = true;
      var checkRow = [];
      // console.log("keyRowPiece:", keyRowPiece);
      // console.log("In loop i");
      for (var k = 0; k < maxSize; k++) {
        // console.log("In loop k:", "i:", i, "k:", k);
        // console.log("gameArray:", JSON.stringify(gameArray));
        // compare each box in row (reference currentLevel) to next
        var idx = "idx" + i + k;
        checkRow.push(idx);
        console.log("cRow1:", checkRow);
        // console.log("keyColPiece:", keyColPiece);
        if (keyRowPiece !== gameArray[i][k].cssClass) {
          rowMatch = false;
          // console.log("Match", rowMatch);
          // console.log("checkRow:", checkRow);
          break;
        }
      }
      if (rowMatch) {
        // turn off event listeners
        // gameOn = false;
        for (var z = 0; z < maxSize; z++) {
          var x = checkRow[z].charAt(3);
          var y = checkRow[z].charAt(4);
          $("#idx" + x + y + "").removeClass(gameArray[x][y].cssClass);
          $("#idx" + x + y + "").addClass("score");
          // $("#idx" + x + y + "").switchClass(gameArray[x][y].cssClass, "score", 1000, "easeOutBounce");
        }
        getPoints();
        var rowStore = checkRow;
        // setTimeout then clear winning boxes and replace with new pieces
        var setRowDelay = setTimeout(function() {
          clearWinners(rowStore);
        }, 1000);
      }
    }
    for (var i = 0; i < maxSize; i++) {
      var keyColPiece = gameArray[0][i].cssClass;
      var colMatch = true;
      // console.log("keyColPiece:", keyColPiece);
      var checkCol = [];
      for (var k = 0; k < maxSize; k++) {
        // console.log("In loop k:", "i:", i, "k:", k);
        var idx = "idx" + k + i;
        checkCol.push(idx);
        if (keyColPiece !== gameArray[k][i].cssClass) {
          colMatch = false;
          // console.log("colMatch:", colMatch);
          break;
        }
      }
      if (colMatch) {
        // turn off event listeners
        // gameOn = false;
        for (var z = 0; z < maxSize; z++) {
          var x = checkCol[z].charAt(3);
          var y = checkCol[z].charAt(4);
          // $("#idx" + x + y + "").switchClass(gameArray[x][y].cssClass, "score");
          $("#idx" + x + y + "").removeClass(gameArray[x][y].cssClass);
          $("#idx" + x + y + "").addClass("score");
        }
        getPoints();
        // setTimeout then clear winning boxes and replace with new pieces
        console.log("arrayCol:", checkCol);
        var colStore = checkCol;
        var setColDelay = setTimeout(function() {
          clearWinners(colStore);
        }, 300);
        // console.log("Column Match");
      }
    }
  } else {
    alert("No more moves!");
  }
} // END checkForMatches
//
// CLEAR WINNERS
function clearWinners (array) {
  array.forEach(function(e) {
    // create random monster index
    var localMonsterIdx = createRandomMonster();
    // create local random monster obj that *does not reference original obj*
    var kLocalObj = JSON.parse(JSON.stringify(monstersObjArray[localMonsterIdx]));
    // extract location from e
    console.log("e:", e);
    var x = e.charAt(3);
    var y = e.charAt(4);
    console.log(x, " ", y);
    // add monster to gameArray at index
    gameArray[x][y] = kLocalObj;
    // update gameboard with new monster
    $("#" + e + "").removeClass("score");
    $("#" + e + "").addClass(kLocalObj.cssClass);
  });
}
//
// EVENT LISTENERS
// !! add function to make event listeners not work if board is not playable
// add click listeners - create fct parameters i, k
if (gameOn) {
  $(".box").click(function(e) {
    // on click, switch gameArray box obj & switchPiece
    var indexString = $(this).attr("id");
    // console.log("this: ", this);
    // console.log("indexString: ", indexString);
    var x = indexString.charAt(3);
    var y = indexString.charAt(4);
    // console.log(x, " ", y);
    switchPiece(x, y);
    checkForMatches();
    // check for winning combo (also do before game starts)
  });
}
//
// RUN GAME
//
}); // End Ready
