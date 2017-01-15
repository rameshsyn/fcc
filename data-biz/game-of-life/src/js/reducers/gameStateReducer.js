/* Game of life overall state */

import { UPDATE_GENERATION } from '../actions/actionTypes';


const gameState = {
	generation: 0,
	speed: 100, // new board creation delay 
	colors: {
		dead: '#000',
		live: 'green',
		border: '#fff'
	}
};

export default function(state = gameState, { type, payload }) {
	switch(type) {
		case UPDATE_GENERATION: 
		return Object.assign({}, state, { generation: payload });
	}
	return state;
}