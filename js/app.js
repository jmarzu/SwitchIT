$(document).ready(function () {
  // Test JQ
  $('h1').hover(function(){
    $(this).css("text-decoration", "underline");
  }, function () {
    $(this).css("text-decoration", "none");
  });
//
// **GLOBAL VARIABLES**
// reference array for monster objects
var monstersObjArray = [
  {
    "symbol": "S",
    "cssClass": "circle"
  },
  {
    "symbol": "X",
    "cssClass": "square"
  },
  {
    "symbol": "W",
    "cssClass": "triangle"
  }
];
var numberOfMonsters = monstersObjArray.length;
var levelsArray = [3, 4, 5];
var currentLevel = 0;
//
// CREATE & STORE gameArray GLOBALLY
var gameArray = setUpBoard();
//
// CREATE & STORE currentSwitchPiece GLOBALLY
var currentSwitchPiece = createSwitchPiece();
//
// **FUNCTIONS**
//
// DYNAMICALLY GAMEBOARD WITH RANDOM MONSTER PIECES ASSIGNED
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
      kLocalObj.currentIndex = $("#idx" + i + k + "").attr("id");
      // add monster to gameArray (we are at position i, k)
      localArray2.push(kLocalObj);
      // console.log("kLocalObj: ", JSON.stringify(kLocalObj));
      // console.log("kIndex: ", kLocalObj.currentIndex);
      // assign monster symbols to gameboard
      $("#idx" + i + k + "").html(kLocalObj.symbol);
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
  console.log("tempGP: ", JSON.stringify(tempSwitchPiece));
  // console.log("tempSP: ", tempSwitchPiece);
  // set currentSwitchPiece to gameboard obj data
  currentSwitchPiece = gameArray[row][col];
  console.log("New curSwP: ", JSON.stringify(currentSwitchPiece));
  // update HTML UI to show new symbol
  $("#switch-piece").html(currentSwitchPiece.symbol);
  // set gameboard obj to tempSwitchPiece data
  gameArray[row][col] = tempSwitchPiece;
  console.log("New gameP: ", JSON.stringify(gameArray[row][col]));
  // update HTML UI to show new symbol
  $("#idx" + row + col + "").html(gameArray[row][col].symbol);
}
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
  var switchPiece = monstersObjArray[localSwitchIdx];
  switchPiece.currentIndex = "switch-piece";
  $("#switch-piece").html(switchPiece.symbol);
  return switchPiece;
}
//
// EVENT LISTENERS
// add click listeners - create fct parameters i, k
$(".box").click(function(e) {
  // on click, switch gameArray box obj & switchPiece
  var indexString = $(this).attr("id");
  // console.log("this: ", this);
  // console.log("indexString: ", indexString);
  var x = indexString.charAt(3);
  var y = indexString.charAt(4);
  // console.log(x, " ", y);
  switchPiece(x, y);
  // check for winning combo (also do before game starts)
});
//
// RUN GAME
function runGame (array) {
  createSwitchPiece();
}
//
runGame(gameArray);
//
}); // End Ready
