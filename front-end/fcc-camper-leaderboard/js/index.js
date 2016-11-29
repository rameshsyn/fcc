'use strict';

// Coded By Ramesh Syangtan @rameshsyn

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      search: '',
      data: [],
      arrowRecent: true
    };
  },
  loadData: function loadData() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? 'https://fcctop100.herokuapp.com/api/fccusers/top/recent' : arguments[0];

    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({
          data: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function componentDidMount() {
    this.loadData(this.state.dataUrl);
  },
  updateDataUrl: function updateDataUrl(url, opt) {
    this.loadData(url);
    if (opt) {
      this.setState({
        arrowRecent: true
      });
    } else {
      this.setState({
        arrowRecent: false
      });
    }
  },
  updateSearch: function updateSearch(event) {
    this.setState({
      search: event.target.value
    });
  },
  render: function render() {
    var _this = this;

    var recent = undefined,
        alltime = undefined;
    var filteredCamper = this.state.data.filter(function (camper) {
      return camper['username'].toLowerCase().indexOf(_this.state.search.toLowerCase()) !== -1;
    });
    this.state.arrowRecent ? recent = "arrow-down" : alltime = "arrow-down";
    return React.createElement(
      'div',
      { className: 'panel panel-success' },
      React.createElement(
        'div',
        { className: 'panel-heading' },
        React.createElement(
          'b',
          null,
          'Camper Leaderboard '
        )
      ),
      React.createElement(
        'div',
        { className: 'panel-body' },
        React.createElement(
          'table',
          { className: 'table table-responsive table-bordered table-hover' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                { colSpan: '4' },
                React.createElement(
                  'span',
                  { className: 'search-area' },
                  React.createElement('input', { type: 'text', className: 'search', placeholder: 'Search camper', value: this.state.search, onChange: this.updateSearch.bind(this) }),
                  React.createElement('i', { className: 'search-icon glyphicon glyphicon-search' })
                )
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                null,
                '# SN'
              ),
              React.createElement(
                'th',
                null,
                'Campers '
              ),
              React.createElement(
                'th',
                { onClick: this.updateDataUrl.bind(this, 'https://fcctop100.herokuapp.com/api/fccusers/top/recent', true) },
                React.createElement(
                  'div',
                  { className: 'options' },
                  'Recent (30 Days)'
                ),
                React.createElement('div', { className: recent })
              ),
              React.createElement(
                'th',
                { onClick: this.updateDataUrl.bind(this, 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime', false) },
                React.createElement(
                  'div',
                  { className: 'options' },
                  'All the time'
                ),
                React.createElement('div', { className: alltime })
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            filteredCamper.map(function (camper, index) {
              return React.createElement(Camper, { camper: camper, sn: index + 1 });
            })
          )
        )
      )
    );
  }
});

var Camper = React.createClass({
  displayName: 'Camper',

  render: function render() {
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        null,
        this.props.sn
      ),
      React.createElement(
        'td',
        { className: 'text-left' },
        React.createElement('img', { className: 'camper-img', src: this.props.camper['img'] }),
        React.createElement(
          'a',
          { href: "https://freecodecamp.com/" + this.props.camper['username'], target: '_blank' },
          this.props.camper['username']
        )
      ),
      React.createElement(
        'td',
        null,
        this.props.camper['recent']
      ),
      React.createElement(
        'td',
        null,
        this.props.camper['alltime']
      )
    );
  }

});
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));