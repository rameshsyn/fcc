// Coded by ========== Ramesh Syangtan ==============

$(document).ready(function() {
  var session = true;  
  // pomodoro object
  pomodoro = {
      SCountDown: 25,
      BCountDown: 5,
      minutes: 0,
      seconds: 00,
      progressV: 0,
      perSecWidth: 0,
      stopIt: '',
      cProgress: undefined,
      sessionTime: undefined,
      progressToggle: function(whichSession) {
        if(this.cProgress){
          this.cProgress = false; 
        }  
        else {
           this.progressV = 0;
           this.perSecWidth = 378 / (whichSession * 60);
           this.cProgress = false;
        }
      },
      assignNewS: function() {
        this.progressToggle(this.SCountDown);
        this.sessionTime = true;
        this.minutes = this.SCountDown;
        arrowToggle("#arrow-b", "#arrow-s", ".session");
      },
      assignNewB: function() {
        this.progressToggle(this.BCountDown);
        this.sessionTime = false;
        this.minutes = this.BCountDown;
        arrowToggle("#arrow-s", "#arrow-b", ".break");
      },
      timeFormat: function() {
        if (this.seconds < 10) {
          return this.minutes + " : " + "0" + this.seconds;
        }
        return this.minutes + " : " + this.seconds;
      },
      secondsDown: function() {
        $("#cd-time").text(this.timeFormat());
        this.progress();
        if ((this.minutes === 0) && (this.seconds === 0)) {
          (this.sessionTime) ? this.assignNewB(): this.assignNewS();
        }
        if (this.seconds === 0) {
          this.minutes--;
          this.seconds = 60;
        }
        this.seconds--;
      },
      start: function() {
        this.perSecWidth = 378 / (this.SCountDown * 60);
        this.assignNewS();
        this.stopIt = setInterval(secondDown, 1000);
      },
      stop: function() {
        this.cProgress = true;
        this.SCountDown = this.minutes;
        clearInterval(this.stopIt);
      },
      reset: function() {
        clearInterval(this.stopIt);
        this.cProgress = false;
        this.SCountDown = 25;
        this.BCountDown = 5;
        this.seconds = 0;
        this.progressV = 0;
        this.minutes = this.SCountDown;
        var widthValue = this.progressV + 'px';
        $(".count-down #progress").css("width", widthValue);
        $("#s-time").text(this.SCountDown);
        $("#b-time").text(this.BCountDown);
        $("#cd-time").text("25 : 00");
        $("#start-stop img").attr('src', '../img/pp.png');
        $("#arrow-s").removeClass('arrow-down');
        $("#arrow-b").removeClass('arrow-down');
        $("#progress").css("background", "none");
        $("#percent").css("display", "none");
      },
      customization: function(chooseSession, type) {
        this.seconds = 0;
        this.progressV = 0;
        this.cProgress = false;
        var SClass;
        var currentSession = chooseSession;
        (chooseSession) ? chooseSession = this.SCountDown: chooseSession = this.BCountDown;
        if (chooseSession <= 1) return;
        (type) ? chooseSession++ : chooseSession--;
        (currentSession) ? this.SCountDown = chooseSession: this.BCountDown = chooseSession;
        (currentSession) ? SClass = "#s-time": SClass = "#b-time";
        $(SClass).text(chooseSession);
        $("#cd-time").text(chooseSession);
        var widthValue = this.progressV + 'px';
        $(".count-down #progress").css("width", widthValue);
      },
      progress: function() {
        this.progressV = this.progressV + this.perSecWidth;
        var widthValue = this.progressV + 'px';
        var percentV = Math.floor((this.progressV / 378) * 100);
        percentV = 100 - percentV;
        if (percentV < 0) percentV = 0;
        $("#percent").text(percentV + "%");
        $(".count-down #progress").css("width", widthValue);
        $("#progress").css("background", "green");
        $("#progress").css("background", "-webkit-linear-gradient(right,#d00,#090,#010)");
        $("#percent").css("display", "block");
      }
    }
    // supporter functions

  function secondDown() {
    pomodoro.secondsDown();
  }

  function start() {
    session = false;
    pomodoro.start();
    $("#start-stop img").attr('src', './img/p.png');
    $(".customize").addClass('unclickable');
  }

  function stop() {
    session = true;
    pomodoro.stop();
    $("#start-stop img").attr('src', './img/pp.png');
    $(".customize").removeClass('unclickable');
  }

  function arrowToggle(classRemove, classAdd, classAnimate) {
    classAnimate = classAnimate + ", .arrow-down, .count-down";
    $(classRemove).removeClass('arrow-down');
    $(classAdd).addClass('arrow-down');
    $(classAnimate).addClass("animated flash");
  }

  // Click Events 
  $("#start-stop").click(function() {
    (session) ? start(): stop();
  });
  $("#reset").click(function() {
    pomodoro.reset();
    session = true;
    $(".customize").removeClass('unclickable');
  });
  $("#s-plus").click(function() {
    pomodoro.customization(true, true); // session time increment
  });
  $("#s-minus").click(function() {
    pomodoro.customization(true, false); // session time decrement
  });
  $("#b-plus").click(function() {
    pomodoro.customization(false, true);
  });
  $("#b-minus").click(function() {
    pomodoro.customization(false, false);
  });
});