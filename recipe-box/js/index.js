'use strict';

// Coded By Ramesh Syangtan @rameshsyn

var Modal = ReactBootstrap.Modal,
    // Modal component of React - Bootstrap
editClickValue = false,
    recipeData;

// Local Storage checker
function storageAvailable(type) {
  try {
    var storage = window[type],
        x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}
// Checking Local storage in user browser
// True: checks user added recipes
//       True: saves user added recipes in recipeData Array
//       False: Sets some Recipes in recipeData Array
// False: alerts - No local storage supports
if (storageAvailable('localStorage')) {
  if (localStorage.getItem('rameshsyn_recipes')) {
    recipeData = JSON.parse(localStorage.getItem('rameshsyn_recipes'));
  } else {
    recipeData = [{
      "name": "Momo",
      "gradient": ["Meat", "veg", "Sup", "Maida", "Tomato"]
    }, {
      "name": "Khir",
      "gradient": ["Milk", "Sugar", "Cocunot", "Rice", "Sukamel"]
    }];
  }
} else {
  alert("Sorry, Your Browser doesn't support Local Storage :D ");
}

// Updates changes like edit, delete , add recipes
function updateChanges() {
  recipeData = JSON.parse(localStorage.getItem('rameshsyn_recipes'));
  ReactDOM.render(React.createElement(App, { data: recipeData }), document.getElementById('app'));
}

function _editClick(value) {
  editClickValue = value;
}

// A parent react component (App)
var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      recipes: this.props.data
    };
  },
  editClick: function editClick() {
    _editClick(false);
  },
  render: function render() {
    var _this = this;

    return React.createElement(
      'div',
      { className: 'container-fluid' },
      React.createElement(
        'h1',
        { className: 'app-title' },
        'Recipe Box'
      ),
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { title: 'Add New Recipe', className: 'glyphicon glyphicon-plus add-recipe pull-right', onClick: this.editClick.bind(this) },
          React.createElement(AddEdit, { data: this.state.recipes })
        ),
        React.createElement(
          'div',
          { className: 'container recipe-box' },
          this.state.recipes.map(function (recipe, i) {
            return React.createElement(Recipe, { data: _this.state.recipes, name: recipe['name'], gradient: recipe['gradient'], id: i });
          })
        )
      )
    );
  }
});

var Recipe = React.createClass({
  displayName: 'Recipe',

  getInitialState: function getInitialState() {
    return {
      showModal: false
    };
  },

  close: function close() {
    this.setState({
      showModal: false
    });
  },
  open: function open() {
    this.setState({
      showModal: true
    });
  },
  removeRecipe: function removeRecipe(event) {
    var recipeId = event.target.id;
    this.props.data.splice(recipeId, 1);
    localStorage.setItem('rameshsyn_recipes', JSON.stringify(this.props.data));
    updateChanges();
    this.setState({
      showModal: false
    });
  },
  editClick: function editClick() {
    _editClick(true);
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'recipe', id: this.props.id },
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          'div',
          { className: 'modal-content' },
          React.createElement(
            'div',
            { className: 'modal-header' },
            React.createElement(
              'button',
              { type: 'button', className: 'close', onClick: this.close },
              React.createElement(
                'span',
                { 'aria-hidden': 'true' },
                '×'
              )
            ),
            React.createElement(
              'h4',
              { className: 'modal-title' },
              'Confirm Delete ! '
            )
          ),
          React.createElement(
            'div',
            { className: 'modal-footer' },
            React.createElement(
              'button',
              { type: 'button', className: 'btn btn-danger', id: this.props.id, onClick: this.removeRecipe },
              'Confirm'
            ),
            React.createElement(
              'button',
              { type: 'button', className: 'btn btn-success', onClick: this.close },
              'Cancel'
            )
          )
        )
      ),
      React.createElement(
        'h3',
        null,
        this.props.name,
        React.createElement('i', { title: 'Remove Recipe', className: 'glyphicon glyphicon-remove pull-right remove-recipe', id: this.props.id, onClick: this.open })
      ),
      React.createElement('hr', null),
      React.createElement(
        'div',
        { title: 'Ingradients', className: 'gradient' },
        this.props.gradient.map(function (gradient) {
          return React.createElement(
            'span',
            null,
            gradient
          );
        })
      ),
      React.createElement('hr', null),
      React.createElement(
        'div',
        { title: 'Edit Recipe', className: 'glyphicon glyphicon-edit edit', id: this.props.id, onClick: this.editClick.bind(this) },
        React.createElement(AddEdit, { data: this.props.data, id: this.props.id, show: true })
      )
    );
  }
});

var AddEdit = React.createClass({
  displayName: 'AddEdit',

  getInitialState: function getInitialState() {
    return {
      showModal: false
    };
  },

  close: function close() {
    this.setState({
      showModal: false
    });
  },
  open: function open() {
    this.setState({
      showModal: true
    });
  },
  getInput: function getInput(event) {
    event.preventDefault();
    var data = this.props.data;
    var recipes = undefined;
    var name = $('#name').val();
    if (name === "") name = "untitiled";
    var gradient = $('#gradient').val().split(',');
    var recipeId = event.target.id;
    var recipe = {
      name: name,
      gradient: gradient
    };
    if (editClickValue) {
      data.splice(recipeId, 1, recipe);
      _editClick(false);
    } else {
      data.push(recipe);
    }
    localStorage.setItem('rameshsyn_recipes', JSON.stringify(data));
    updateChanges();
    this.setState({
      showModal: false
    });
  },
  render: function render() {
    var title = "Add New Recipe";
    var action = "Add New Recipe";
    var actionClass = "glyphicon glyphicon-plus add-recipe pull-right";
    var recipeId = undefined,
        name = undefined,
        gradient = undefined;
    if (editClickValue) {
      recipeId = this.props.id;
      name = this.props.data[recipeId]['name'];
      gradient = this.props.data[recipeId]['gradient'];
      title = "Edit Recipe";
      action = "Edit";
    }
    return React.createElement(
      'div',
      null,
      React.createElement('i', { className: 'add-edit', onClick: this.open }),
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          'div',
          { className: 'modal-content' },
          React.createElement(
            'div',
            { className: 'modal-header' },
            React.createElement(
              'button',
              { type: 'button', className: 'close', onClick: this.close },
              React.createElement(
                'span',
                { 'aria-hidden': 'true' },
                '×'
              )
            ),
            React.createElement(
              'h4',
              { className: 'modal-title' },
              title
            )
          ),
          React.createElement(
            'div',
            { className: 'modal-body' },
            React.createElement(
              'form',
              null,
              React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                  'label',
                  { 'for': 'name', className: 'control-label' },
                  'Name:'
                ),
                React.createElement('input', { type: 'text', className: 'form-control', id: 'name', defaultValue: name, placeholder: 'Recipe Name' })
              ),
              React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                  'label',
                  { 'for': 'gradient', className: 'control-label' },
                  'Gradients:'
                ),
                React.createElement('textarea', { className: 'form-control', id: 'gradient', defaultValue: gradient, placeholder: 'Separated by comma ....' })
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'modal-footer' },
            React.createElement(
              'button',
              { type: 'button', className: 'btn btn-success', onClick: this.getInput, id: this.props.id },
              action
            ),
            React.createElement(
              'button',
              { type: 'button', className: 'btn btn-danger', onClick: this.close },
              'Close'
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(App, { data: recipeData }), document.getElementById('app'));