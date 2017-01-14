import 'font-awesome/css/font-awesome.min.css';
import '../style/style.scss';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './components';

const store = createStore(reducers);
const container = document.getElementById('app');
render(
	<Provider store={store}>
		<App/>
	</Provider>,
	container
	);