$(document).ready(function() {

  // Tic Tac Toe - Game  - coded by Ramesh Syangtan

  var playerChoice, compLetter; // letter choice x or o
  var players = [compLetter, playerChoice]; // players
  var compTurn = false; // Initial turn 
  // line Strike to the row when wins 
  var lineStrike = {
    "[0,4,8]": 'dia-clockwise',
    "[2,4,6]": 'dia-anticlockwise',
    "[0,1,2]": 'vert-top',
    "[3,4,5]": 'vert-center',
    "[6,7,8]": 'vert-bottom',
    "[0,3,6]": 'hor-left',
    "[1,4,7]": 'hor-middle',
    "[2,5,8]": 'hor-right'
  };

  // Play Ground : Nine boxes (board)
  var playGround = [true, true, true, true, true, true, true, true, true];

  // Game winning situation / game over condition --- 8 situations
  var winCon = [
    [0, 4, 8], // clockwise diagonal : winCon[0][0] 
    [2, 4, 6], // Anticlockwise diagonal : winCon[0][1]
    [0, 1, 2], // first row : winCon[1][0] 
    [3, 4, 5], // second row : winCon[1][1]
    [6, 7, 8], // third row : winCon[1][2]
    [0, 3, 6], // first column : winCon[2][0]
    [1, 4, 7], // second column : winCon[2][1]
    [2, 5, 8] // third column : winCon[2][2] 
  ];
  // Empty Boxes - retuns empty boxes
  function emptyBoxes() {
    var empty = [];
    for (var i = 0; i < playGround.length; i++) {
      if (playGround[i] === true) empty.push(i);
    }
    return empty;
  }
  // selects random box 
  function random() {
    var freeMoves = emptyBoxes();
    var chooseRandom = Math.floor(Math.random() * (freeMoves.length + 1));
    return freeMoves[chooseRandom];
  };
  // Everything resets when game is over
  function reset() {
    playGround = [true, true, true, true, true, true, true, true, true];
    $("#t0, #t1, #t2, #t3, #t4, #t5, #t6, #t7, #t8").text("").removeClass("unclickable");
    $(".show-container").hide();
    $(".line").hide();
  };
  // Checks if someone is going to win
  // True - Calls gameOver() function
  function threeInRow() {
    if (emptyBoxes().length === 0) return gameOver();
    else {
      var winConRow;
      var winner;
      players.forEach(function(player) {
        winCon.forEach(function(line, winConIndex) {
          var count = 0;
          line.forEach(function(index) {
            var textInBox = $("#t" + index.toString()).text();
            if (textInBox === player) count++;
          });
          if (count === 3) {
            winConRow = lineStrike[JSON.stringify(winCon[winConIndex])];
            winner = player;
          };
        });
      });
      if (winConRow !== undefined) {
        $('.line').show();
        $('.line').addClass(winConRow);
        return gameOver(winner);
      }
    }
  }
  // shows which player has won
  function gameOver(player) {
    compTurn = false;
    $("#t0, #t1, #t2, #t3, #t4, #t5, #t6, #t7, #t8").addClass("unclickable");
    if (player !== undefined) {
      $(".show-container").show();
      $("#show-status").show().text(player + " wins !").addClass("animated zoomIn").fadeOut(3000);

    } else {
      $(".show-container").show();
      $("#show-status").show().text("Tie !").addClass("animated zoomIn").fadeOut(3000);
    }
    setTimeout(reset, 3000); // calls reset function after 3 seconds

  }
  // checks if two boxes are fulfilled  with same letter 
  // True - calls putLetter() function to put compLetter to unfulfilled box
  // False - calls random() function to put compLetter randomly 
  function moveDecision() {
    var empty = [];
    var toBeWonCon = 0;
    var textInBox, countSameLet;
    players.forEach(function(player1) {
      winCon.forEach(function(line1) {
        countSameLet = 0;
        line1.forEach(function(index1) {
          textInBox = $("#t" + index1.toString()).text();
          if (textInBox === player1) countSameLet++;
        });
        if (countSameLet === 2) {
          line1.forEach(function(a) {
            if (playGround[a] !== false) {
              empty.push(a);
              toBeWonCon++;
            }
          });
        }
      });
    });
    (toBeWonCon === 0) ? putLetter(random()): putLetter(empty[0]);

  }

  // puts letter in box as id 
  function putLetter(boxId) {
    $("#t" + boxId.toString()).text(compLetter).addClass("unclickable");
    threeInRow();
    playGround[boxId] = false;
    compTurn = false;
  }

  // saves player choice letters to variables
  function playerChoiceLetter(event) {
    $(".play-ground").show().addClass("animated slideInDown");
    playerChoice = $(("#" + event.target.id.toString())).attr("value");
    compLetter = (playerChoice === "X") ? "O" : "X";
    players = [compLetter, playerChoice];
    $("#prompt-bg,#prompt-choose").hide();
  }

  // Events
  function init(event) {
    var boxId = (event.target.id).split('')[1];
    $(("#" + event.target.id).toString()).text(playerChoice).addClass("unclickable");
    playGround[boxId] = false;
    compTurn = true;
    threeInRow();
    if (compTurn) moveDecision();

  }
  $("#prompt-bg,#prompt-choose").click(function() {
    $("#click-area").addClass('shake');
  });
  $(".play-ground").on("click", "#t0, #t1, #t2, #t3, #t4, #t5, #t6, #t7, #t8", init);
  $(document).on("click", "#btn-x, #btn-o", playerChoiceLetter);

});