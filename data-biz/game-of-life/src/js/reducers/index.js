import { combineReducers } from 'redux'; 
import  Board  from './boardReducer';
import GameState from './gameStateReducer';

const rootReducer = combineReducers({
	board: Board,
	gameState: GameState
});

export default rootReducer;