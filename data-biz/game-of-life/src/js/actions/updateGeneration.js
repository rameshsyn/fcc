import { UPDATE_GENERATION } from './actionTypes';

export default function(generation) {
	return {
		type: UPDATE_GENERATION,
		payload: generation
	};
}