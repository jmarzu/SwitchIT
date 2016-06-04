$(document).ready(function () {
  // Test JQ
  $('h1').hover(function(){
    $(this).css("text-decoration", "underline");
  }, function () {
    $(this).css("text-decoration", "none");
  });


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
console.log("numberOFMonsters: ", numberOfMonsters);
var levelsArray = [3, 4, 5];
var currentLevel = 0;
var gameArray = createGameArray();

// CREATE GAME LEVEL - 3 FUNCTIONS
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
  console.log("localRows: ", localRows);
  for (var i = 0; i < localRows; i++) {
    var localMonsterNum = createRandomM();
    console.log("localMonsterNum: ", localMonsterNum);
    localArray.push(monstersArray[localMonsterNum].symbol);
  }
  return localArray;
}
// CREATE RANDOM MONSTER
// F:createRandomM: create 1 of 3 random monsters
function createRandomM() {
// inputs? obj props?
// Random number logic
  return Math.floor(Math.random() * numberOfMonsters);
}

// Process Outline

// console.log("gameArray: ", gameArray);

// CREATE GAME BOARD
// F:createDivRows: HTML number of rows = current level
//  Add css styles for rows
function createDivRows(array) {
  $(array).each(function() {
    $("#board").append("<div class='row'></div>");
  });
  // array.forEach(function(e) {
  //   console.log("e:", e);
  //   $("#board").append("<div class='row'></div>");
  // });
}
// F:createDivBoxes: HTML boxes per row = current level
function createDivBoxes(array) {
  localArray = array[0];
  $(localArray).each(function() {
    $(".row").append("<div class='box'></div>");
  });
}

// function addGameBoardToHTML (array) {
//   localId = 1;
//   array.forEach
// }
    // $(".row").appendTo("<div class='box'></div>");
    // // $(".box").attr("id", id);
    // $(".box").html(array[i]);
    // console.log("boxArray.length: ", array.length);
    // console.log("boxArray: ", array);

//  Add box IDs 1 thru totalboxes
//  Add css styles for each monster
//  Add css styles for boxes

// RUN GAMEBOARD
function runGameBoard(array) {
  createDivRows(array);
  createDivBoxes(array);
}

runGameBoard(gameArray);

}); // End Ready
