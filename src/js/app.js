$(document).ready(function () {
// AT LOAD
  swal({
    title: "switchIt!",
    text: "Switch your key piece with pieces on the board to match monsters across an entire row or column!"
  });
  // INFO BUTTON
  $("#button").click(function() {
    swal({
      title: "This is your switch piece!",
      text: "Switch this piece with one on the board to match a row or column."
    });
  });
  //
  // **GLOBAL VARIABLES**
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
    },
    {
      symbol: "T",
      cssClass: "blue2"
    },
    {
      symbol: "P",
      cssClass: "yellow2"
    },
    {
      symbol: "L",
      cssClass: "gray2"
    }
  ];
  var levelObjArray = [
    {
      level: 0,
      boxNumber: 3,
      maxMoves: 20,
      scoreGoal: 1200,
      pointsVal: 100,
      maxMonsters: 4,
      danger: null
    },
    {
      level: 1,
      boxNumber: 4,
      maxMoves: 24,
      scoreGoal: 1500,
      pointsVal: 100,
      maxMonsters: 5,
      danger: null
    },
    {
      level: 2,
      boxNumber: 5,
      maxMoves: 28,
      scoreGoal: 1800,
      pointsVal: 100,
      maxMonsters: 5,
      danger: null
    },
    {
      level: 3,
      boxNumber: 4,
      maxMoves: 24,
      scoreGoal: 1200,
      pointsVal: 100,
      maxMonsters: 6,
      danger: null
    },
    {
      level: 4,
      boxNumber: 5,
      maxMoves: 24,
      scoreGoal: 1500,
      pointsVal: 100,
      maxMonsters: 7,
      danger: null
    },
    {
      level: 5,
      boxNumber: 6,
      maxMoves: 28,
      scoreGoal: 1600,
      pointsVal: 100,
      maxMonsters: 8,
      danger: null
    }
  ];
  //
  var currentLevel = 0;
  var numberOfMonsters = levelObjArray[currentLevel].maxMonsters;
  var levelsArray = [3, 4, 5, 4, 5, 6]; // might refactor to use levelObjArray
  // relates to event listeners
  var gameOn = true;
  // CREATE & STORE GLOBALLY
  var gameArray = setUpBoard();
  var currentSwitchPiece = createSwitchPiece();
  var maxSize = levelObjArray[currentLevel].boxNumber;
  var maxMoves = levelObjArray[currentLevel].maxMoves;
  var scoreGoal = levelObjArray[currentLevel].scoreGoal;
  var userLevel = currentLevel + 1;
  var pointsVal = levelObjArray[currentLevel].pointsVal;
  var score = 0;
  //
  // **FUNCTIONS**
  // CREATE RANDOM MONSTER
  function createRandomMonster() {
    // create random monster index
    var localMonsterIdx = Math.floor(Math.random() * numberOfMonsters);
    return JSON.parse(JSON.stringify(monstersObjArray[localMonsterIdx]));
  }
  // CREATE SWITCH PIECE
  function createSwitchPiece() {
    var switchPiece = createRandomMonster();
    $("#switch-piece").removeClass();
    $("#switch-piece").addClass(switchPiece.cssClass);
    return switchPiece;
  }
  // DYNAMIC GAMEBOARD WITH RANDOM MONSTER PIECES ASSIGNED
  function setUpBoard() {
    var localArray1 = [];
    for (var i = 0; i < levelsArray[currentLevel]; i++) {
      var localArray2 = [];
      $("#board").append("<div class='rows' id='row" + i + "'></div>");
      for (var k = 0; k < levelsArray[currentLevel]; k++) {
        var box = $("<div class='box' id='idx" + i + k + "'></div>");
        $("#row" + i).append(box);
        var localMonsterObj = createSwitchPiece();
        localArray2.push(localMonsterObj);
        $("#idx" + i + k + "").addClass(localMonsterObj.cssClass);
      }
    localArray1.push(localArray2);
    }
    return localArray1;
  }
  // PLAYER MOVE LOGIC
  function switchPiece(row, col) {
    var tempSwitchPiece = currentSwitchPiece;
    currentSwitchPiece = gameArray[row][col];
    $("#switch-piece").removeClass().addClass(currentSwitchPiece.cssClass);
    gameArray[row][col] = tempSwitchPiece;
    $("#idx" + row + col + "").removeClass().addClass("box");
    $("#idx" + row + col + "").addClass(gameArray[row][col].cssClass);
  }
  // POINTS LOGIC
  function getPoints () {
    score = score + (maxSize * pointsVal);
    $("#score").text(score);
  }
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
      }
    }
  }
  // CHECK COLUMNS FOR VERTICAL MATCHES
  function checkCol() {
    for (var i = 0; i < maxSize; i++) {
      var keyColPiece = gameArray[0][i].cssClass;
      var colMatch = true;
      var checkColArray = [];
      for (var k = 0; k < maxSize; k++) {
        var idx = "idx" + k + i;
        checkColArray.push(idx);
        if (keyColPiece !== gameArray[k][i].cssClass) {
          colMatch = false;
          break;
        }
      }
      if (colMatch && gameOn) {
        handleMatchResults(checkColArray);
      }
    }
  }
  // HANDLE RESULTS FROM MATCHES
  function handleMatchResults (array) {
    for (var i = 0; i < maxSize; i++) {
      $("#" + array[i]).removeClass();
      $("#" + array[i]).addClass("box score");
     }
    getPoints();
    clearWinners(array);
  }
  // CHECK FOR MATCHES - ROW & COL
  function checkForMatches() {
    if (maxMoves > 0 && score < scoreGoal) {
      checkRow();
      checkCol();
    }
    if (score >= scoreGoal) {
      setTimeout(function() {
        swal ("Winning! Go to Next Level!!");
        levelUp();
        resetGame();
        runGame();
      }, 400);
      // change Levels

    } else if (maxMoves <= 0) {
      setTimeout(function() {
        swal("Sorry! You ran out of moves!");
        resetGame();
        runGame();
      }, 400);
    }
  }
  // CLEAR WINNERS
  function clearWinners (array) {
    // setTimeout for user to see score animation
    setTimeout(function() {
      array.forEach(function(e) {
        var localMonsterObj = createRandomMonster();
        var x = e.charAt(3);
        var y = e.charAt(4);
        gameArray[x][y] = localMonsterObj;
        // update gameboard with new monster
        $("#" + e).removeClass().addClass("box");
        $("#" + e).addClass(localMonsterObj.cssClass);
      });
    }, 400);
  }
  // LEVEL UP
  function levelUp() {
    console.log("LevelUpBefore:", currentLevel)
    if (currentLevel === 3) {
      currentLevel++;
      swal("You're doing great!");
    } else if (currentLevel < (levelsArray.length - 1))  {
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
    numberOfMonsters = levelObjArray[currentLevel].maxMonsters;
    gameArray = setUpBoard();
    currentSwitchPiece = createSwitchPiece();
    maxSize = levelObjArray[currentLevel].boxNumber;
    maxMoves = levelObjArray[currentLevel].maxMoves;
    scoreGoal = levelObjArray[currentLevel].scoreGoal;
    pointsVal = levelObjArray[currentLevel].pointsVal;
    score = 0;
    userLevel = currentLevel + 1;
    checkForMatches();
    updateBackboard();
  }
  // UPDATE BACKBOARD
  function updateBackboard() {
    $("#moves").text(maxMoves);
    $("#goal").text(scoreGoal);
    $("#score").text(score);
    $("#level").text(userLevel);
  }
  //  **EVENT LISTENERS**
  // RUN GAME
  function runGame () {
    updateBackboard();
    $(".box").click(function() {
      // if (gameOn) {
        maxMoves = maxMoves - 1;
        $("#moves").text(maxMoves);
        var indexString = $(this).attr("id");
        var x = indexString.charAt(3);
        var y = indexString.charAt(4);
        if (gameOn) {
          switchPiece(x, y);
          checkForMatches();
        }
    });
  }
  // START!
  runGame();
  //
}); // End Ready
