import { UPDATE_CELL } from '../actions/actionTypes';


// window inner height and width
const { innerHeight, innerWidth } = window;

/* Cell Dimension */
const cellBorderWidth = 0.5;
const cellHeight = 15 + (cellBorderWidth * 2);
const cellWidth = 15 + (cellBorderWidth * 2);

// calculates board dimension as cell's height and width. 
const calculateBoardDimension = (boardDimension, cellDimension, part) => {
	// use {part} from	 window inner height and width. 
	const bD = boardDimension * ( part / 100 );
	
	// Number of cells 
	const cells = Math.floor(bD / cellDimension);

	// new height or width
	return cells * cellDimension;
};

/* Board Dimension */
const width = calculateBoardDimension(innerWidth, cellWidth, 70);
const height = calculateBoardDimension(innerHeight, cellHeight, 70);

// Number of cells
const horizontalCells = ( width / cellWidth );
const verticalCells = ( height / cellHeight );	 
const totalCells = horizontalCells * verticalCells; 


const cells = [];

// Create Cells data as board dimension. 
for(let i = 0; i < verticalCells; i++) {
	for( let j = 0; j < horizontalCells; j++) {
		const x = j * cellWidth;
		const y = i * cellHeight;
		const cellIndex = (( i * horizontalCells) + j);		
		cells.push({
			index: cellIndex,
			coords: [x,y],
			status: Math.random() > 0.7 ? 'live' : 'dead' // random 30% live cell
		});		
				
	}		
}

const boardInfo = {
	height,
	width,
	cellWidth,
	cellHeight,
	cellBorderWidth,
	totalCells,
	horizontalCells,
	verticalCells,
	cells
};

export default function(state = boardInfo, { type, payload }) {
	switch(type) {
		case UPDATE_CELL:
			return Object.assign({}, state, { cells: payload });
		default: 
			return state;
	}
}