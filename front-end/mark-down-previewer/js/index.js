"use strict";

var App = React.createClass({
  displayName: "App",

  getInitialState: function getInitialState() {
    return {
      markedTexts: 'Markdown Previewer - FCC\n=====================\n### Heading\n*italic*\n**bold**\n### List\n* List 1\n* List 2\n* List 3\n\n[Ramesh Syangtan](http://freecodecamp.com/rameshsyn)'
    };
  },
  rawMarkup: function rawMarkup(text) {
    var rawMarkup = marked(text, { sanitize: true });
    return { __html: rawMarkup };
  },
  update: function update(event) {
    this.setState({
      markedTexts: event.target.value
    });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "row container" },
      React.createElement(
        "div",
        { className: "col-xs-6" },
        React.createElement("textarea", { className: "textarea", type: "text", cols: "60", rows: "20", defaultValue: this.state.markedTexts, onChange: this.update.bind(this) })
      ),
      React.createElement(
        "div",
        { className: "col-xs-6 previewer" },
        React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup(this.state.markedTexts) })
      )
    );
  }

});
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));