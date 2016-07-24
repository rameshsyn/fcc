'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 Coded by Ramesh Syangtan @rameshsyn || @ramesh_syn

		======= SIMON =========
 		======= GAME ==========
*/
var tonePlayInterval, simonTimeOut; // setInterval global variables

var Simon = function (_React$Component) {
  _inherits(Simon, _React$Component);

  function Simon() {
    _classCallCheck(this, Simon);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      simonOn: false,
      strict: false,
      random: false,
      colors: ['#1d4c1d', '#902828', '#868612', '#131a50'],
      colorHighlights: ['green', 'red', 'yellow', 'blue'],
      randomTones: [],
      toneSeriesCount: 0,
      level: 0,
      tones: [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')]
    };
    return _this;
  }
  // Initialization

  Simon.prototype.init = function init() {
    clearInterval(tonePlayInterval);
    clearInterval(simonTimeOut);
    this.setState({
      randomTones: [],
      level: 0,
      toneSeriesCount: 0,
      random: false

    }, function () {
      // Pushing random tone on callback
      this.state.randomTones.push(this.randomTone());
    });
    this.toneButtonClickable(false);
  };
  // Generates random Tone

  Simon.prototype.randomTone = function randomTone() {
    return Math.floor(Math.random() * 4);
  };
  // Strict Mode

  Simon.prototype.strict = function strict() {
    if (this.state.strict) {
      this.setState({
        strict: false
      });
      $("#strict").css('color', '#fff');
    } else {
      this.setState({
        strict: true
      });
      $("#strict").css('color', 'green');
    }
  };
  // 5 Seconds Timer

  Simon.prototype.timer = function timer() {
    clearInterval(simonTimeOut);
    var second = 0;
    simonTimeOut = setInterval(timeOut.bind(this), 1000);

    function timeOut() {
      if (second === 5) {
        if (this.state.strict) {
          this.start();
          $("#s-buttons").addClass("alert-flash");
          this.toneButtonClickable(false);
          this.state.tones[3].play();
        } else {
          this.wrongInput();
        }
        clearInterval(simonTimeOut);
      } else {
        second++;
      }
    }
  };
  // Plays and sets correspoding tone and color respectively

  Simon.prototype.correspondToneColor = function correspondToneColor(id) {
    this.state.tones[id].play();
    $("#" + id.toString()).css("background", this.state.colorHighlights[id]);
    // turns background color to initial state after one second
    setTimeout(function () {
      $("#" + id.toString()).css("background", this.state.colors[id]);
    }.bind(this), 700);
  };
  // Plays tone Automatically

  Simon.prototype.playTone = function playTone() {
    var toneSeriesId = this.state.randomTones[this.state.toneSeriesCount];
    this.correspondToneColor(toneSeriesId);
    this.timer();
    // Go to next step
    if (this.state.toneSeriesCount + 1 === this.state.randomTones.length) {
      clearInterval(tonePlayInterval);
      this.toneButtonClickable(true);
      this.setState({
        toneSeriesCount: 0
      });
    } else {
      // wait , i am not finished yet
      this.setState({
        toneSeriesCount: this.state.toneSeriesCount + 1
      });
    }
  };
  // user: Do as i do

  Simon.prototype.userPlay = function userPlay(event) {
    var toneId = event.target.id;
    // Go random
    if (this.state.random) {
      this.correspondToneColor(toneId);
    } else {

      var toneSeriesId = this.state.randomTones[this.state.toneSeriesCount];
      this.timer();
      $("#s-buttons").removeClass("alert-flash");
      // Wrong input ? Computer: I will repeat this
      if (Number(toneId) !== toneSeriesId) {
        if (this.state.strict) {
          this.start();
          $("#s-buttons").addClass("alert-flash");
          this.toneButtonClickable(false);
          this.state.tones[3].play();
        } else {
          this.wrongInput();
        }
        return false;
      }
      // Computer: Are you done ? Go to next level
      else if (this.state.toneSeriesCount + 1 === this.state.randomTones.length) {
          this.setState({
            toneSeriesCount: 0
          });
          this.toneButtonClickable(false);
          this.setState({
            level: this.state.level + 1
          });
          if (this.state.level === 20) {
            alert("Congratulation, It's Victory !!!");
          }
          this.state.randomTones.push(this.randomTone());
          this.repeatThis();
        } else {
          this.setState({
            toneSeriesCount: this.state.toneSeriesCount + 1
          });
        }
      this.correspondToneColor(toneId);
    }
  };
  // I am repeater

  Simon.prototype.repeatThis = function repeatThis() {
    tonePlayInterval = setInterval(function () {
      this.playTone();
      $("#s-buttons").removeClass('alert-flash');
    }.bind(this), 1500);
  };
  // Let's start

  Simon.prototype.start = function start() {
    this.init();
    $("#start").css('color', 'green');
    $("#random").css('color', '#fff');
    this.toneButtonClickable(false);
    this.repeatThis();
  };
  // I warn you not to input wrong

  Simon.prototype.wrongInput = function wrongInput() {
    $("#s-buttons").addClass("alert-flash");
    this.toneButtonClickable(false);
    this.state.tones[3].play();
    this.setState({
      toneSeriesCount: 0
    });
    this.repeatThis();
  };
  // Let me be what these fucking guys say

  Simon.prototype.toneButtonClickable = function toneButtonClickable(value) {
    if (value) {
      $("#0,#1,#2,#3").removeClass("unclickable");
    } else {
      $("#0,#1,#2,#3").addClass("unclickable");
    }
  };
  // Computer: Wanna play random ? It's your time

  Simon.prototype.playRandom = function playRandom() {
    this.init();
    this.toneButtonClickable(true);
    $("#start").css('color', '#fff');
    if (this.state.random) {
      this.setState({
        random: false
      });
      $("#random").css('color', '#fff');
    } else {
      this.setState({
        random: true
      });
      $("#random").css('color', 'green');
    }
  };
  // Live Or die

  Simon.prototype.onOff = function onOff(event) {
    this.init();
    this.state.simonOn ? this.setState({
      simonOn: false
    }) : this.setState({
      simonOn: true
    });
    if (this.state.simonOn) {
      $("#random,#strict,#start").removeClass("unclickable");
      $("#onOff").css("color", "green");
    } else {
      $("#random,#strict,#start").addClass("unclickable");
      $("#onOff").css("color", "#fff");
    }
    this.toneButtonClickable(false);
    $("#start").css('color', '#fff');
  };

  Simon.prototype.componentDidMount = function componentDidMount() {
    this.onOff();
  };

  Simon.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'simon' },
      React.createElement(
        'div',
        { className: 's-on-off', onClick: this.onOff.bind(this) },
        React.createElement('i', { className: 'fa fa-power-off fa-3x', id: 'onOff', 'aria-hidden': 'true', title: 'Switch on/off' })
      ),
      React.createElement(
        'div',
        { className: 's-controls' },
        React.createElement(
          'div',
          { className: 's-info', id: 'info', title: 'Level' },
          this.state.level
        ),
        React.createElement(
          'div',
          { className: 'controls' },
          React.createElement('i', { className: 'fa fa-random fa-2x', 'aria-hidden': 'true', id: 'random', title: 'Play Random', onClick: this.playRandom.bind(this) }),
          React.createElement('i', { className: 'fa fa-ban fa-2x', 'aria-hidden': 'true', id: 'strict', title: 'Strict', onClick: this.strict.bind(this) })
        )
      ),
      React.createElement(
        'div',
        { className: 's-buttons', id: 's-buttons' },
        React.createElement('div', { className: 'top-left', id: '0', onMouseDown: this.userPlay.bind(this) }),
        React.createElement('div', { className: 'top-right', id: '1', onMouseDown: this.userPlay.bind(this) }),
        React.createElement('div', { className: 'btm-left', id: '2', onMouseDown: this.userPlay.bind(this) }),
        React.createElement('div', { className: 'btm-right', id: '3', onMouseDown: this.userPlay.bind(this) }),
        React.createElement(
          'div',
          { className: 'center' },
          React.createElement('i', { className: 'fa fa-play-circle-o fa-4x', 'aria-hidden': 'true', id: 'start', title: 'Start', onClick: this.start.bind(this) })
        )
      )
    );
  };

  return Simon;
}(React.Component);

ReactDOM.render(React.createElement(Simon, null), document.getElementById('simon'));