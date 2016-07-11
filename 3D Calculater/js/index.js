$(document).ready(function() {
  // 3D activated 
  var time = setInterval(function() {
    $(".front").addClass('front-s');
    $(".back").addClass('back-s');
    $(".right").addClass('right-s');
    $(".left").addClass('left-s');
    $(".top").addClass('top-s');
    $(".bottom").addClass('bottom-s');
  }, 2000);
  setTimeout(function() {
    clearInterval(time)
  }, 3000);
  var firstNum = "";
  var secondNum = "";
  var operater = "";
  var answer = "";
  var opClick = false;
  var eqClick = false;

  function on() {
    firstNum = "";
    secondNum = "";
    operater = "";
    opClick = false;
    eqClick = false;
    $("#screen").text("");
  }

  function getOperater(op) {
    operater = op;
    // checks for operater is already clicked or not
    if (!opClick) {
      firstNum = secondNum;
      secondNum = "";
    }
    opClick = true;
    // checks for equal to button is already clicked or not
    if (eqClick) {
      firstNum = answer;
    }
    // checks for operands if true then shows answer when operater is click 
    if (firstNum != "" && secondNum != "") {
      var temp = eval(firstNum + operater + secondNum);
      firstNum = temp;
      secondNum = "";
      $("#screen").text(temp);
    }
  }

  function getNum(digit) {
    if(secondNum.length > 23)return;
    eqClick = false;
    if ((digit === ".")) {
      //checks for dot if finds then it doesn't let to input another
      if (secondNum.search(/\./ig) < 0) {
        var temp = secondNum.split('');
        temp.unshift(digit);
        temp = temp.join('');
        $("#screen").text(temp);
        // checks for text in secondNum if not finds adds 0 before dot
        if (secondNum === "") secondNum += "0" + digit;
        else
          secondNum += digit;
      }
    } else {
      secondNum += digit;
      $("#screen").text(secondNum);
    }
  }

  function equalTo() {
    var temp = eval(firstNum + operater + secondNum);
    answer = temp;
    secondNum = "";
    $("#screen").text(temp);
    temp = "";
    opClick = false;
    eqClick = true;
  }

  function del() {
    secondNum = secondNum.split('');
    secondNum.pop();
    secondNum = secondNum.join('');
    $("#screen").text(secondNum);
    eqClick = false;
  }

  function percent() {
    if (secondNum === "") {
      $("#screen").text(" ");
    } else {
      var temp = eval(firstNum + operater + secondNum) * 100;
      $("#screen").text(temp);
    }
  }
  // Event handling
  $("#c").click(function() {
    on();
  });
  $("#ce").click(function() {
    on();
  });
  $("#del").click(function() {
    del();
  });
  $("#one").click(function() {
    getNum("1");
  });
  $("#two").click(function() {
    getNum("2");
  });
  $("#three").click(function() {
    getNum("3");
  });
  $("#four").click(function() {
    getNum("4");
  });
  $("#five").click(function() {
    getNum("5");
  });
  $("#six").click(function() {
    getNum("6");
  });
  $("#seven").click(function() {
    getNum("7");
  });
  $("#eight").click(function() {
    getNum("8");
  });
  $("#nine").click(function() {
    getNum("9");
  });
  $("#zero").click(function() {
    getNum("0");
  });
  $("#d-zero").click(function() {
    getNum("00");
  });
  $("#dot").click(function() {
    getNum(".");
  });
  $("#percent").click(function() {
    (secondNum != "" && firstNum != "" )? percent() : getOperater("%");
  });
  $("#divide").click(function() {
    getOperater("/");
  });
  $("#multiply").click(function() {
    getOperater("*");
  });
  $("#subtract").click(function() {
    getOperater("-");
  });
  $("#add").click(function() {
    getOperater("+");
  });
  $("#equal").click(function() {
    equalTo();
  });
  // keyboard key events handling
  $(document).keydown(function(event) {
    var ev = event.which;
    switch (ev) {
      case 48:
      case 96:
        getNum("0");
        break;
      case 49:
      case 97:
        getNum("1");
        break;
      case 50:
      case 98:
        getNum("2");
        break;
      case 51:
      case 99:  
        getNum("3");
        break;
      case 52:
      case 100:
        getNum("4");
        break;
      case 53:
      case 101:
        getNum("5");
        break;
      case 54:
      case 102:
        getNum("6");
        break;
      case 55:
      case 103:
        getNum("7");
        break;
      case 56:
      case 104:
        getNum("8");
        break;
      case 57:
      case 105:
        getNum("9");
        break;
      case 190:
        getNum(".");
        break;
      case 8:
        del();
        break;
      case 32:
        on();
        break;
      case 13:
        equalTo();
        break;
      case 106:
        getOperater("*");
        break;
      case 107:
        getOperater("+");
        break;
      case 109:
        getOperater("-");
        break;
      case 111:
        getOperater("/");
        break;
      default:
        break;
    }
  });

});