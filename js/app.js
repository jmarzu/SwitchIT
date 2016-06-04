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

// CREATE GAME LEVEL
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
// F:createRandomM: create 1 of 3 random monsters
function createRandomM() {
  // inputs? obj props?
  // Random number logic
  return Math.floor(Math.random() * numberOfMonsters);
}

// Process Outline
var gameArray = createGameArray();
console.log("gameArray: ", gameArray);

// CREATE GAME BOARD
// F:createDivRows: HTML number of rows = current level
//  Add css styles for rows
function createDivRows(array) {
  array.forEach(function(e) {
    $('#board').html("<div class='row'></div>")
    // add class
  });
}
createDivRows(gameArray);
// F:createDivBoxes: HTML boxes per row = current level
//  Add box IDs 1 thru totalboxes
//  Add css styles for each monster
//  Add css styles for boxes

}); // End Ready
