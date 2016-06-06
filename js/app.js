$(document).ready(function () {
  // Test JQ
  $('h1').hover(function(){
    $(this).css("text-decoration", "underline");
  }, function () {
    $(this).css("text-decoration", "none");
  });
//
// GLOBAL VARIABLES
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
// console.log("numberOFMonsters: ", numberOfMonsters);
var levelsArray = [3, 4, 5];
var currentLevel = 0;
// CREATE & STORE gameArray GLOBALLY
var gameArray = setUpBoard();
console.log("gameArray: ", gameArray);
// CREATE STORAGE FOR singleArray GLOBALLY
var singleGamePieceArray = [];
//
// CREATE GAME PIECES BY LEVEL
// F:createGameArray: create 2D array with random monsters using F:createRow

function setUpBoard() {
  // create swap piece
  // create temp array
  var localArray = [];
  // each row
  for (var i = 0; i < levelsArray[currentLevel]; i++) {
    // create row and push to DOM
    $("#board").append("<div class='rows' id='row" + i + "'></div>");
    for (var k = 0; k < levelsArray[currentLevel]; k++) {
      // create random monster
      var localMonsterIdx = createRandomMonster();
      // add monster to gameArray at position i, k
      var kLocalObj = monstersObjArray[localMonsterIdx];
      localArray.push(monstersObjArray[localMonsterIdx]);
      console.log("kLocalObj: ", kLocalObj);
      // create box and assign id = array location[i][k]
      var box = $("<div class='box' id='" + i + k + "'></div>");
      // add click listeners - create fct parameters i, k
      // $(".box").click(function () {
      //   swapPiece(i, k);
      // });
      // push columns to html
      $("#row" + i).append(box);
      // Assign monster symbols to gameboard
      $("#" + i + k + "").html(kLocalObj.symbol);
    }
  }
  return localArray;
}

// function switchPiece(row, col) {
//   var tempPiece = gameArray[row][col];
//   gameArray[row][col] = swapPiece;()
//   swapPiece = tempPiece;
// }
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
  var localMonsterIdx = createRandomMonster();
  var switchPiece = monstersObjArray[localMonsterIdx].symbol;
  $("#switch-piece").html(switchPiece);
  return switchPiece;
}
//
// CREATE & STORE currentSwitchPiece GLOBALLY
var currentSwitchPiece = createSwitchPiece();
console.log("SwitchP: ", currentSwitchPiece);
//
// RUN GAME
function runGame (array) {
  createSwitchPiece();

}
//
runGame(gameArray);
//
// function createGameArray () {
//   var localArray = [];
//   for (var i = 0; i < levelsArray[currentLevel]; i++) {
//     var rowArray = createRow();
//     localArray.push(rowArray);
//   }
//   return localArray;
// }
// // F:createRow: create array of rows with random monsters
// function createRow() {
//   var localArray = [];
//   var localRows = levelsArray[currentLevel];
//   for (var i = 0; i < localRows; i++) {
//     var localMonsterIdx = createRandomMonster();
//     // console.log("localMonsterIdx: ", localMonsterIdx);
//     localArray.push(monstersObjArray[localMonsterIdx]);
//   }
//   return localArray;
// }
// //
// //
// // CREATE BLANK GAME BOARD
// // F:createDivRows: HTML number of rows = current level
// function createDivRows(array) {
//   localId = 1;
//   $(array).each(function() {
//     $("#board").append("<ul class='rows'></ul>");
//   });
//   $("ul").each(function() {
//     $(this).addClass("row" + localId);
//     localId++;
//   });
// }
// // F:createDivBoxes: HTML boxes per row = current level
// function createDivBoxes(array) {
//   localArray = array[0];
//   $(localArray).each(function() {
//     $(".rows").append("<li class='box' onclick='alert(\"\")'></li>");
//   });
// }
// //
// // ASSIGN MONSTER SYMBOLS TO GAMEBOARD
// F:createSingleGamePieceArray
// function createSingleGamePieceArray(array) {
//   localArray = $(array).map(function(e) {
//     return array[e].symbol;
//   });
//   return localArray;
// }
// // F:addGamePiecesToHtml
// function addGamePiecesToHtml(array) {
//   $(".box").each(function(idx, e) {
//   $(e).html(array[idx]);
//   });
// }
// // $("ul ").attr("id", "0");
// // // ASSIGN X,Y CLASSES TO BOARD
// // // function assignXyLocation(array) {
// // //   localId = 0;
// // //   for (var i = 1; i <= array.length; i++) {
// // //     console.log(array.length);
// // //     $(".div :nth-child(i)").attr("id", localId);
// // //     ;
// // // //     array[i]
// // // //     // X = 0;
// // // //     // $(".box").attr("id", X);
// // // //     // X++;
// // //   }
// // //   localId ++;
// // // //     // Y asix
// // // //     // Y = 0;
// // // //     // $(#).append('.' + Y);
// // // //     // Y++;
// // // }
// // // //
// }
// //
// // RUN GAMEBOARD
// function runGameBoard(array) {
//   // CREATE BLANK GAME BOARD
//   createDivRows(array);
//   createDivBoxes(array);
//   // COMBINE GAME BOARD + GAME PIECES
//   singleGamePieceArray = createSingleGamePieceArray(array);
//   addGamePiecesToHtml(singleGamePieceArray);
//   // ASSIGN XY ID TO BOXES
//   // assignXyLocation(gameArray);

// }
// //
// // CALL RUN GAME BOARD
// runGameBoard(gameArray);
// //
// //
// EVENT LISTENERS
// event listener for each board piece
// $(".box").click(function (e) {
//   e.preventDefault();
//   // on click, switch html of switchPiece with html of gameArray
//   var localStoreHtml = $(this).html();
//   var localStoreBoardLocation = gameArray.indexOf(this);
//   console.log(localStoreHtml);
//   console.log(localStoreBoardLocation);
//   $(this).html(currentSwitchPiece);
//   // on click, switch box in gameArray & switchPiece
//   currentSwitchPiece = localStoreHtml;
//   $("#switch-piece").html(currentSwitchPiece);
// });






}); // End Ready
