import { UPDATE_CELL } from './actionTypes';

export default function(cells) {
	return {
		type: UPDATE_CELL,
		payload: cells,
	};
}