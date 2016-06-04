$(document).ready(function () {
  // Test JQ
  $('h1').hover(function(){
    $(this).css("text-decoration", "underline");
  }, function () {
    $(this).css("text-decoration", "none");
  });
//
// GLOBAL VARIABLES
var monstersArray = [
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
var numberOfMonsters = monstersArray.length;
// console.log("numberOFMonsters: ", numberOfMonsters);
var levelsArray = [3, 4, 5];
var currentLevel = 0;
// CREATE & STORE gameArray GLOBALLY
var gameArray = createGameArray();
console.log(gameArray);
//
// CREATE GAME PIECES BY LEVEL
// F:createGameArray: create 2D array with random monsters using F:createRow
function createGameArray () {
  var localArray = [];
  for (var i = 0; i < levelsArray[currentLevel]; i++) {
    var rowArray = createRow();
    localArray.push(rowArray);
  }
  return localArray;
}
// F:createRow: create array of rows with random monsters
function createRow() {
  var localArray = [];
  var localRows = levelsArray[currentLevel];
  // console.log("localRows: ", localRows);
  for (var i = 0; i < localRows; i++) {
    var localMonsterIdx = createRandomM();
    // console.log("localMonsterIdx: ", localMonsterIdx);
    localArray.push(monstersArray[localMonsterIdx].symbol);
  }
  return localArray;
}
//
// CREATE RANDOM MONSTER
// F:createRandomM: create 1 of 3 random monsters
function createRandomM() {
// Random number logic
  return Math.floor(Math.random() * numberOfMonsters);
}
//
// CREATE BLANK GAME BOARD
// F:createDivRows: HTML number of rows = current level
function createDivRows(array) {
  $(array).each(function() {
    $("#board").append("<div class='row'></div>");
  });
}
// F:createDivBoxes: HTML boxes per row = current level
function createDivBoxes(array) {
  localArray = array[0];
  $(localArray).each(function() {
    $(".row").append("<div class='box'></div>");
  });
}
//
// COMBINE GAME BOARD + GAME PIECES
// F:createSingleGamePieceArray
function createSingleGamePieceArray(array) {
  localArray = [];
  $(array).each(function(idx, element) {
    // // console.log("idx: ", idx);
    $.merge(localArray, element);
  });
  // console.log("localArray: ", localArray);
  return localArray;
}
// F:addGamePiecesToHtml
function addGamePiecesToHtml(array) {
  $(".box").each(function(idx, e) {
    $(e).attr("id", idx);
    $(e).html(array[idx]);
  });
}
//
// CREATE SWITCH PIECE
function createSwitchPiece() {
  var localMonsterIdx = createRandomM();
  var switchPiece = monstersArray[localMonsterIdx].symbol;
  $("#switch-piece").html(switchPiece);
  return switchPiece;
}
//
// RUN GAMEBOARD
function runGameBoard(array) {
  // CREATE BLANK GAME BOARD
  createDivRows(array);
  createDivBoxes(array);
  // COMBINE GAME BOARD + GAME PIECES
  var  singleGamePieceArray = createSingleGamePieceArray(array);
  addGamePiecesToHtml(singleGamePieceArray);

}
//
// CALL RUN GAME BOARD
runGameBoard(gameArray);
//
// CREATE & STORE currentSwitchPiece GLOBALLY
var currentSwitchPiece = createSwitchPiece();
//
// EVENT LISTENERS
// event listener for each board piece
$(".box").click(function (e) {
  e.preventDefault();
  var localStore = $(this).html();
  console.log(localStore);
  $(this).html(currentSwitchPiece);
  currentSwitchPiece = localStore;
  $("#switch-piece").html(currentSwitchPiece);


});
// on click, switch box in gameArray & switchPiece
// on click, switch html of switchPiece with html of gameArray




}); // End Ready
