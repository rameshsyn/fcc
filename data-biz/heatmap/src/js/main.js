 	/*        
						Developed by Ramesh syangtan (@rameshsyn | @ramesh_syn) :) 

 						DATA VISUALIZATION WITH HEAT MAP 

   ---------------- Monthly Global land surface temperature ----------------
    

		TECHNICAL OVERVIEW (Accordingly)
		- Meta informations like margins, witdth, height of svg are put on the top
		- Document title and Axis titles 
		- Temparature variance identifier
		- Tooltip - separate function named tooltip
		- Data rendering function which includes axis scaling and data rendering to svg
		- Json data call
  	*/

import '../scss/style.scss'; // css styles
import * as d3 from 'd3';


/* Meta Info */

//  Margins 

const margins = {
	top: 10,
	left: 100,
	right: 5,
	bottom: 150
};

const fullWidth = 950;
const fullHeight = 580;

const width = fullWidth - margins.left - margins.right;
const height = fullHeight - margins.top - margins.bottom;



//  Title 
d3.select(".heatmap")
	.append("h2")
	.text("Monthly Global Land Surface Temperature")
	.attr("class","title");


// svg -  Main chart
var svg = d3.select(".heatmap")
			.append("svg")
			.attr("height", fullHeight)
			.attr("width", fullWidth);

/* # Axis titles */

// y-axis title
svg
	.append("g")
	.attr("transform", `translate(25, ${height/2}) rotate(-90)`)
	.append("text")
	.text("Months");

// x-axis title
svg
	.append("g")
	.attr("transform", `translate(${width/2} , ${height + 60})`)
	.append("text")
	.text("Year")

/*# Temperature variance Indentifier */

const variance = [0,2.7,3.9,5,6.1,7.2,8.3,9.4,10.5,11.6,12.7];
const colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];

//  variance scale
const vScale = d3.scaleLinear()
					.domain(d3.extent(variance, d => d))
					.range([0, variance.length * 50]);

// color scale
const cScale = d3.scaleOrdinal()
					.domain(variance)
					.range(colors);

// identifier container
const identifier = svg
					.append("g")
					.attr("transform", `translate(${fullWidth - (variance.length * 50)}, ${height + (margins.bottom - 50)})`);

// rectangle colored identifier			
			identifier
					.selectAll("rect")
					.data(variance)
					.enter()
						.append("rect")
						.attr("height", 30)
						.attr("width", 50)
						.attr("fill", (d) => cScale(d))
						.attr("x", (d,i) => vScale(i))

// text identifier
			identifier
					.selectAll("text")
					.data(variance)
					.enter() 
						.append('text')
						.text(d => d)
						.attr("x", (d,i) => vScale(i) + 8) // plus 8 to center text
						.attr("fill", "#fff")
						.attr("y", 50);			

/*# Tooltip*/ 

const div = d3.select(".heatmap")
				.append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);


const tooltip = (d) => {
				div
				    .style('opacity', 0.8)
					.html(`
							<b>${d.year} - ${d.month}</b>
							<br>
							${d.variance} &#8451;
						`)
					.style("left",	`${d3.event.pageX}px`)
					.style("top", `${d3.event.pageY}px`);

			};

/* # Data Renderer to svg*/
const render = (rawData) => {
	let data = rawData.monthlyVariance;
	let months = ["Janaury", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	// changing monthly index number to month's name
	data.forEach((d,i) => {		
		months.forEach((m,j) => {
			if((d.month - 1) === j) 
				d.month = months[j];
		});
	});
	// y Scale - ( Months )
	let yScale = d3.scaleBand() 
					.domain(months)
					.range([0, height]);

	// rendering y axis
	svg
		.append("g")
		.attr("class", "y-axis")
		.attr("transform", `translate(${margins.left}, ${margins.top})`)
		.call(
			d3.axisLeft(yScale)
			);

	// x Scale - ( Year )
	let xScale = d3.scaleLinear()
					.domain(d3.extent(data, (d) => d.year))
					.range([0, width]);

	// rendering x axis

	svg
		.append("g")
		.attr("class", "x-axis")
		.attr("transform", `translate(${margins.left}, ${height + 15})`)
		.call(
			d3.axisBottom(xScale)
			);
    // colors scale
    let colorScale = d3.scaleQuantize()
    					.domain(d3.extent(data, d => d.variance))
    					.range(colors);

    //  rendering data to svg
	svg
		.append("g")
		.attr("transform", `translate(${margins.left}, ${margins.top})`)
		.selectAll("rect")
		.data(data)
		.enter()
			.append("rect")
			.attr("x", d => xScale(d.year))
			.attr("y", d => yScale(d.month))
			.attr("height", yScale.bandwidth())
			.attr("width", 15)
			.style("cursor","pointer")
			.attr("fill", d => colorScale(d.variance))
			.on("mouseover", tooltip)
			.on("mouseout", d => {
				div
					.style("opacity", 0);
			});
			

};

// land surface temperature json data
d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json", render)



// To dos - tests
  // do = #
  // doing = ##
  // done = ###

/*	1. Date (year) axis - x axis ###
	2. Identifier ###
	3. Months axis - y axis ###
	4. title ###
	6. data render to svg ###
	5. tooltip ###
	6. axis title ###

 */