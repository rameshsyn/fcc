$(document).ready(function() {
  var width = 800;
  var height = 600;
  var margins = {
    left: 60,
    right: 30,
    bottom: 60,
    top: 30
  };

function tooltip(d) {
  $("#tooltip").fadeIn();
  $("#tooltip").html(
    "<strong>Info: </strong><br><span><i>Name:</i> "+d.Name+"</span><br><span><i>Place:</i> "+d.Place + " </span> <span><i>Year:</i> " + d.Year+" </span><br><span><i>Time:</i> "+d.Time+"</span><br><span><i>Doping:</i> "+d.Doping+"</span>"
  )
}
var canvas = d3.select("#canvas");
  $.ajax({
    url: 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    dataType: 'json',
    success: function(data) {

      // y axis title 
      canvas.append("g")
            .attr("transform", "translate(30,"+(height/2)+") rotate(-90)")
            .append("text")
            .text("Ranking")
            .attr("class", "axis-title");
      // x-axis title 
      canvas.append("g")
            .attr("transform", "translate("+(width/3)+","+(height-15)+")")
            .append("text")
            .text("Minutes behind fastest time")
            .attr("class", "axis-title");
      // Indicater 
      canvas.append("g")
            .attr("transform", "translate(100,120)")
            .append("text")
            .text("No Doping allegation")
      canvas.append("g")
            .append("circle")
            .attr("cy",115)
            .attr("cx",90)
            .attr("r",5)
            .attr("fill","#Fff")
      canvas.append("g")
            .attr("transform", "translate(100,100)")
            .append("text")
            .text("Doping allegation")
      canvas.append("g")
            .append("circle")
            .attr("cy",95)
            .attr("cx",90)
            .attr("r",5)
            .attr("fill","red")
      // fastest Time
      var fastestTime = d3.min(data, function(d) {
        return d.Seconds;
      });
      // Seconds behind fastest timey
      data.forEach(function(d){
        return d.secBehindFT = (d.Seconds - fastestTime);
      });
      var yAxisRange = d3.scaleLinear()
      .domain([d3.max(data, function(d){
        return d.Place;
      }),d3.min(data, function(d){
        return d.Place;
      })])
      .range([margins.top, (height - margins.bottom)]);

      var yAxis = canvas.append("g")
      .attr("transform", "translate("+margins.left+",0)")
      .call(
        d3.axisLeft()
        .scale(yAxisRange)
        .tickSize(5)
      );

      var xAxisRange = d3.scaleLinear()
      .domain([0,210])
      .range([margins.left, (width-margins.right)]);

      var xAxis  = canvas.append("g")
      .attr("transform", "translate(0, "+(height-margins.bottom)+")")
      .call(
        d3.axisBottom()
        .scale(xAxisRange)
        .tickSize(5)
        .ticks(5)
        .tickFormat(function(d) {
          var t = new Date(2012, 0, 1, 0, d)
          t.setSeconds(t.getSeconds() + d);
          return d3.timeFormat("%H:%S")(t);
        })
      );

      canvas.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy",function(d) {return yAxisRange(d.Place);})
      .attr("cx", function(d) { return xAxisRange(d.secBehindFT);})
      .attr("r",5)
      .attr("fill", function(d){
          if(d.Doping === "") {
            return "#ddd";
          }
          else {
            return "red";
          }
      })
      .on("mouseover",tooltip)
      .on("mouseout", function(){
        $("#tooltip").hide();
      })

      canvas.append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("y",function(d) {return yAxisRange(d.Place);})
      .attr("x", function(d) { return xAxisRange(d.secBehindFT);})
      .text(function(d) { return d.Name;})
      .attr("transform", "translate(15,5)")
      .attr("fill", "#fff")
      .on("mouseover",tooltip)
      .on("mouseout", function(){
        $("#tooltip").hide();
      })

    }
  });
});