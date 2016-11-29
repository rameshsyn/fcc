/*

				Developed by Ramesh syangtan (@rameshsyn | @ramesh_syn) :) 	


 						DATA VISUALIZATION WITH FORCE DIRECTED GRAPH

  					 ---------------- National Contiguity ----------------


  */
    



import '../css/style.scss'; // css styles
import '../css/flags.css'; // flag sprites

import * as d3 from 'd3';

// svg container size

const height = 700,
	  width = 1000;



// svg 

let svg = d3.select(".chart")
			.append("svg")
			.attr("height", height)
			.attr("width", width);


// Force link 
const forceLink = d3.forceLink()
					.id(d => d.index)  
					.distance(60) // distance of links


// Force Many Body - applies to all nodes

const forceManyBody = d3.forceManyBody()
						.strength(-50)  // repulsion between nodes
						.distanceMin(50) // minimum distance between nodes
						.distanceMax(110) // maximum distance between nodes



// Force center - starts from center

const forceCenter  = d3.forceCenter(width / 2, height /2 );


//  simulation | force

let simulation = d3.forceSimulation()
				   .force("link", forceLink)
				   .force("charge", forceManyBody)
				   .force("center", forceCenter);



// node dragging starts

const dragStarts = (d) => {
	if(!d3.event.active) 
		simulation
				.alphaTarget(0.3) 
				.restart();
	 d.fx = d.x;
	 d.fy = d.y;
}

// node dragging

const dragging = (d) => {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

// node dragging ends

const dragEnds = (d) => {
	if(!d3.event.active) 
		simulation
				.alphaTarget(0);

	d.fx = d.fy = null;
}

// Tooltip container
const tooltipBox = d3.select(".chart")
    					.append("div");



// tooltip
const toolTip =  (d) => {
			tooltipBox
				.style("opacity", 1)
				.html(d.country)
				.style("left", `${d3.event.pageX - 160}px`)
				.style("top", `${d3.event.pageY - 120}px`);
}

// data renders to svg

const render = (err, data) => {
	if( err ) throw err;  // throws error

	// Links - svg line
   	 
	let link = svg
				.append("g")
				.attr("class", "links")
				.selectAll("line")
				.data(data.links) 
				.enter()
					.append("line")
					.attr("stroke", "white")
					.attr("stroke-width", 1)

	// Nodes

    
	let node = d3.select('.chart')
				  .selectAll("img")
				  .data(data.nodes)
				  .enter()
				  		.append("img")
				  		.attr("class", d => `flag flag-${d.code}`)
				  		.on("mouseover", toolTip )
						.on("mouseout", (d) => {
							tooltipBox
								.style("opacity", 0)
						});
  		
    // When tick is updated , it runs
	const tick = (d) => {
		link
			.attr("x1", d => d.source.x)
			.attr("x2", d => d.target.x)
			.attr("y1", d => d.source.y)
			.attr("y2", d => d.target.y);

		 node
			.style("top", d => `${d.y - 8}px`)
			.style("left", d => `${d.x - 5 }px`);
	};


	// dragging initilize	

	node
		.call(
			d3.drag()
				.on("start", dragStarts)
				.on("drag", dragging)
				.on("end", dragEnds)
			);

   // setting our data (nodes) as simulation nodes
	simulation
			.nodes(data.nodes)
			.on("tick", tick);	// tick is listening

	
  
	simulation
			.force("link")
			.links(data.links);		


}; 
/// json data
d3.json("https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json", render);
