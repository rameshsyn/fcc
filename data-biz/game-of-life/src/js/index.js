/*
		============== GAME OF LIFE ================ 

		How does it work ? 
		1. Checks user window inner height and width, 
			 and calculates game of life board's width 
			 and height as cell area. [reducers/boardReducer.js]

		2. Calculates total cells as board area, and
			 creates array of cells. [reducers/boardReducer.js]

		3. Set up canvas board, and as a setted time interval, 
			 new board is created. [containers/board.js]  


*/

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