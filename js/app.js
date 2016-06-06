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
      // create random monster
      var kLocalObj = JSON.parse(JSON.stringify(monstersObjArray[localMonsterIdx]));
      // set monster property currentIndex to idx[i]k[]
      kLocalObj.currentIndex = $("#idx" + i + k + "").attr("id");
      // add monster to gameArray (we are at position i, k)
      localArray2.push(kLocalObj);
      console.log("kLocalObj: ", JSON.stringify(kLocalObj));
      console.log("kIndex: ", kLocalObj.currentIndex);
      // add click listeners - create fct parameters i, k
      // $(".box").click(function() {
        // on click, switch box in gameArray & switchPiece
        // switchPiece(i, k);
        // check for winning combo (also do before game starts)
      // });
      // $(".box").click(function () {
      //   swapPiece(i, k);
      // });
      // $(kLocalObj)
      // Assign monster symbols to gameboard
      $("#idx" + i + k + "").html(kLocalObj.symbol);
  console.log("localArray2: ", JSON.stringify(localArray2));
    }
  console.log("localArray2: ", JSON.stringify(localArray2));
  localArray1.push(localArray2);
  }
  return localArray1;
}
//
//
function switchPiece(row, col) {
  // create temp vals to modify before switch
  var tempGamePiece = gameArray[row][col];
  var tempSwitchPiece = currentSwitchPiece;
  console.log("tempGP: ", JSON.stringify(tempGamePiece));
  console.log("tempSP: ", tempSwitchPiece);
  // set tempGamePiece to switch currentSwitchPiece
  currentSwitchPiece = tempGamePiece;
  console.log("New curSwP: ", currentSwitchPiece);
  // update currentIndex to switch-piece
  currentSwitchPiece.currentIndex = "switch-piece";
  // update HTML div display
  $("#switch-piece").html(tempGamePiece.symbol);

//   // // move tempSwitchPiece to game array
//   //   // update currentIndex to game index
//   //   // update HTML div display
//   // gameArray[row][col] = tempSwitchPiece;
//   // tempSwitchPiece.currentIndex = "idx" +
//   // console.log("tempGP: ", tempGamePiece);
//   // console.log("tempSP: ", tempSwitchPiece);
//   // $("#idx" + row + col + "").html(tempSwitchPiece.symbol);


//   // console.log("curSwP: ", currentSwitchPiece);
//   // gameArray[row][col] = currentSwitchPiece;
//   // console.log("newGamePiece: ". )
//   // currentSwitchPiece = tempGamePiece;
//   // $("#switch-piece").html(tempGamePiece.symbol);
//   // tempGamePiece.currentIndex = "switch-piece";
//   // console.log("curSwP/T: ", currentSwitchPiece);
//   // console.log("ck gArray: ", gameArray);
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
  // switchPiece(x, y);
  // check for winning combo (also do before game starts)
});
//
// $(".box").click(function (e) {
//   e.preventDefault();
//   // on click, switch html of switchPiece with html of gameArray
//   var localStoreHtml = $(this).html();
//   var localStoreBoardLocation = gameArray.indexOf(this);
//   console.log(localStoreHtml);
//   console.log(localStoreBoardLocation);
//   $(this).html(currentSwitchPiece);
//
//   currentSwitchPiece = localStoreHtml;
//   $("#switch-piece").html(currentSwitchPiece);
// });
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
// CREATE & STORE currentSwitchPiece GLOBALLY
var currentSwitchPiece = createSwitchPiece();
console.log("SwitchP: ", currentSwitchPiece);
//
// RUN GAME
function runGame (array) {
  // createSwitchPiece();

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
