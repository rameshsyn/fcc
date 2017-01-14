import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCell, updateGeneration } from '../actions';


let newBoard = [];

/* Game */
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			generation: props.gameState.generation,
			play: true, // For play/pause icon toggle
			interval: null
		};
	}

	/* Resets board to initial state */
	reset() {
		const { totalCells, cells,  cellHeight, cellWidth } = this.props.board;
		//const cells = this.state.cells;
		const { colors } = this.props.gameState;
		const canvas = document.querySelector('canvas');
		const ctx = canvas.getContext('2d');

		// draws dead rectangle and updates every cell to dead. 
		for(let i = 0; i < totalCells; i++) {
			this.updator(cells, cells[i].index, 'dead');
			//this.props.updateCell(this.state.cells);
			this.drawRectOnCanvas(ctx, cells[i].coords[0], cells[i].coords[1], cellWidth, cellHeight, colors.dead);
		}

		// set generation to zero
		this.updateGeneration(0);

		// Toggle play/pause icon
		this.setState({ 
			play: false
		});

		// Clear interval
		clearInterval(this.state.interval);

		// update board to dead cells
		this.props.updateCell(newBoard);
		newBoard = [];
	}

	/* Stop / run game */
	playPause() {
		// Toggle play/pause icon
		this.setState({
			play: !this.state.play
		});

		// Toggle interval. 
		if(this.state.play) {
			clearInterval(this.state.interval);

		} else {
			const { speed } = this.props.gameState;
			const interval =  setInterval( () => {
					this.updateGeneration(this.state.generation + 1);
					this.drawCellsOnCanvas();
				}, speed);
			this.setState({
				interval
			});
		}		
	}
	

	/* Counts live neighbors */
	liveNeighborsCount(neighbors, cells) {
		let count = 0;
		neighbors.forEach(neighbor => {
			if(cells[neighbor].status  === 'live') {
				count++;
			}
		});
		return count;

	}

	/* Calculates neighbor and it's Corresponding cell
	   if clicked cell is in the corner/end */
	correspondingCell(cells, index) {
		const { horizontalCells, totalCells } = this.props.board;
		
		/* Neighbor */
		// Assuming clicked cell in the middle.
		let top = index - horizontalCells; 
		let topLeft = top - 1;
		let topRight = top + 1;
		let left = (index - 1);
		let right = (index + 1);
		let bottom = index + horizontalCells;
		let bottomLeft = bottom - 1;
		let bottomRight = bottom + 1;

		/* Calculates correponding cell */
		// top 
		if(cells[top] === undefined) {
			top =  totalCells - (horizontalCells - index);
			topLeft = top - 1;
			topRight = top + 1;
		}
		// bottom
		if(cells[bottom] === undefined) {
			bottom =  horizontalCells - (totalCells - index);
			bottomLeft = bottom - 1;
			bottomRight = bottom + 1;
		}
		
		// right 		
		if((index + 1) % horizontalCells === 0) {
			right = index - horizontalCells + 1;
			topRight = top - horizontalCells + 1;
			bottomRight = bottom - horizontalCells + 1;
		}

		// left
		if((index + 1) % horizontalCells === 1) {
			left = index + horizontalCells - 1;
			topLeft = top + horizontalCells - 1;
			bottomLeft = bottom + horizontalCells - 1;
		}

		return [ topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight ];
	}

	/* Neighbor */
	neighbors(context, cells, index, cellWidth, cellHeight, colors) {

		const neighbors = this.correspondingCell(cells, index);
		const liveNeighbors = this.liveNeighborsCount(neighbors, cells);
		this.checkLiveOrDead(context, cells, index, cellWidth, cellHeight, liveNeighbors, colors);
	}

	/* Cell updator to data layer  */
	updator(cells, index, status) {
		
		newBoard.push({
			index: index,
			coords: [cells[index].coords[0], cells[index].coords[1]],
			status: status
		});
		
	}

	/* Checks a cell is live or dead and update */
	checkLiveOrDead(context, cells, index, cellWidth, cellHeight, liveNeighbors, colors) {

		// lives if it has 2 | 3 neighbors
		if((cells[index].status === 'live') && (liveNeighbors === 2 || liveNeighbors === 3)) {
			this.updator(cells, index, 'live');
			this.drawRectOnCanvas(context, cells[index].coords[0], cells[index].coords[1], cellWidth, cellHeight, colors.live);
		
		// reproduce if it has 3 live neighbors	
		} else if (cells[index].status === 'dead' && liveNeighbors === 3) {
			this.updator(cells, index, 'live');
			this.drawRectOnCanvas(context, cells[index].coords[0], cells[index].coords[1], cellWidth, cellHeight, colors.live);
		
		} else {
			this.updator(cells, index, 'dead');
			this.drawRectOnCanvas(context, cells[index].coords[0], cells[index].coords[1], cellWidth, cellHeight, colors.dead);
		}

	}

	// draws a rectangle shape (cell) on canvas
	drawRectOnCanvas(context, x, y, width, height, color) {
		context.beginPath();
		context.fillStyle = color;
		context.rect(x, y, width, height);				
		context.fill();
		context.stroke();
		context.closePath();
	}

	// Creates Cells in canvas
	drawCellsOnCanvas() {
		const { totalCells, cells, cellWidth, cellHeight, height, width, cellBorderWidth } = this.props.board;
		const { colors } = this.props.gameState;
		const canvas = document.querySelector('canvas');
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');	
		ctx.lineWidth = cellBorderWidth;
		ctx.strokeStyle = colors.border;
		let deadCells = 0;
		
		// Draws cells on canvas
		for(let i = 0; i < totalCells; i++) {	
			// count dead cells
			if(cells[i].status === 'dead') {
				deadCells++;
			} 

			// if all cells are dead
			if(deadCells === totalCells) {
				clearInterval(this.state.interval);
				// Toggle play/pause icon
				this.setState({
					play: !this.state.play
				});
				this.updateGeneration(0);
			}

			this.neighbors(ctx, cells, cells[i].index, cellWidth, cellHeight, colors);

		}	
		
		// Update new board.
		this.props.updateCell(newBoard);

		// new board
		newBoard = [];
		
	}

	/* Finds a index of clicked cell and draws rectangle on clicked cell */ 
	findClickedCellIndex(e) {
		const { cellWidth,cells, cellHeight} = this.props.board;
		//const cells = this.state.cells;
		const { colors } = this.props.gameState;
		const canvas = document.querySelector('canvas');
		const ctx = canvas.getContext('2d');

		// canvas position relative to viewport
		const rect = canvas.getBoundingClientRect();

		// Mouse position on canvas
		let x = (e.clientX - rect.left);
		let y = (e.clientY - rect.top);

		// Actual cell position
		x = Math.floor( x / cellWidth) * cellWidth;
		y = Math.floor( y / cellHeight) * cellHeight;	

		// Searches clicked cell index
		const clickedIndex = cells.findIndex(el => {
			return el.coords[0] === x & el.coords[1] === y;
		});

		if(cells[clickedIndex].status === 'live') {
			// update clicked cell to live
			// but sorry Redux, small mutation :P
			cells[clickedIndex].status = 'dead';
			// draw new rectangle on clicked position
			this.drawRectOnCanvas(ctx, x, y, cellWidth, cellHeight, colors.dead);

		} else {
			// update clicked cell to live
			// but sorry Redux, small mutation :P
			cells[clickedIndex].status = 'live';
			// draw new rectangle on clicked position
			this.drawRectOnCanvas(ctx, x, y, cellWidth, cellHeight, colors.live);
		}
		
		return clickedIndex;		
	}

	/* Updates generation */
	updateGeneration(value) {
		this.setState({
			generation: value
		});
		this.props.updateGeneration(value);

	}
	
	componentDidMount() {
		const { speed } = this.props.gameState;
		const interval =  setInterval( () => {
					this.updateGeneration(this.state.generation + 1);
					this.drawCellsOnCanvas();
				}, speed);
		

		this.setState({
			interval
		});
	}

	render() {	
		return (
			<div>
			<i className='title'>Game of life</i>
			<div className='info-box'>
				<div>
					Generations: <span>{ this.state.generation }</span>
				</div>
				<hr/>
				<div>
					<i 
						className={`fa ${this.state.play ? 'fa-pause-circle-o': 'fa-play-circle-o'} fa-2x`}
						onClick={ () => this.playPause() }>
					</i>
					<i 
						className='fa fa-undo fa-2x' 
						onClick={ () => this.reset() }>
					</i>					
				</div>
			</div>
			<canvas 
			className='board'
			onClick={ (e) => this.findClickedCellIndex(e) }
			/>
			</div>
			);
	}
	
}

// maps redux store to react props
const mapStateToProps = ({ board, gameState }) => {
	return { board, gameState };
};

// maps redux actions to react props
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ updateCell, updateGeneration }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

