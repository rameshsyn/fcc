// Coded by Ramesh syangtan @rameshsyn || @ramesh_syn

$(document).ready(function() {

  var width = 1000;
  var height = 500;
  var margins = {
    top: 20,
    right: 30,
    bottom: 100,
    left: 100
  };
  // Fetching us gdp data
  $.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(d) {
    var data = d.data;
    // tool tip
    var tip = d3.tip()
    .attr('class', 'tooltip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>GDP : </strong><span>$"+ d[1] +" Billion </span><br><br><strong>Time : </strong><span>" + d[0] + "</span>";
    });

    // canvas : svg container
    var canvas = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(tip);

    // Y axis title
    canvas.append("g")
    .append("text")
    .text("GDP ( $ Billion )") 
    .attr("transform","  translate(30,"+ (height/2) +") rotate(-90)")
    .attr("fill","white");

    // X axis title
    canvas.append("g")
    .append("text")
    .text("Time scale ( Year ) ") 
    .attr("transform","  translate("+(width/2)+","+ (height - 50)+")")
    .attr("fill","white");

    // Bar chart title
    canvas.append("g")
    .append("text")
    .text("US - Domestic Gross Product ") 
    .attr("transform","  translate("+(width/5)+","+ (height / 5)+")")
    .attr("font-size", 45)
    .attr("fill","white");

    //  X axis date range 
    var xAxisRange = d3.time.scale()
    .range([margins.left, (width - margins.right)])
    .domain([new Date(d.from_date), new Date(d.to_date)]);


    // Y axis gdp range
    var yAxisRange = d3.scale.linear()
    .range([margins.top, height - margins.bottom])
    .domain([d3.max(data,function(d){
      return d[1];
    }), 0]);

    // X axis assign to svg container
    var xAxis = canvas.append("g")
    .attr("class", "x axis")
    .attr('transform', "translate(0, " + (height - margins.bottom) + ")")
    .call(d3.svg.axis()
      .scale(xAxisRange)
      .tickSize(5)
      .ticks(d3.time.years, 5)
      .orient("bottom")
      );

    // Y axis assign to svg container
    var yAxis = canvas.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate( " + margins.left + ", 0)")
    .call(d3.svg.axis()
      .scale(yAxisRange)
      .tickSize(5)
      .ticks(10,"$")
      .orient("left")
      );
    
    // data elements
    canvas.selectAll("rect")
    .data(data)
    .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
       return xAxisRange(new Date(d[0]));
     })
      .attr("y", function(d) {
       return yAxisRange(d[1]);
     })
      .attr("height", function(d) {
        return (height - margins.bottom) - yAxisRange(d[1]);
      })
      .attr("width", 5)
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
  });
});