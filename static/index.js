var graphData = {{ data }}

var margin = {top: 30, right: 50, bottom: 30, left: 50};
var svgWidth = 600;
var svgHeight = 270;
var graphWidth = svgWidth - margin.left - margin.right
var graphHeight = svgHeight - margin.bottom - margin.top;

console.log(graphHeight)

var svg = d3.select("#graphDiv")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform",
            "translate("+margin.left+","+margin.top+")");

var x = d3.time.scale().range([0, graphWidth]);
var y = d3.scale.linear().range([graphHeight, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

var closeLine = d3.svg.line()
    .x(function(d) { return x(d.datetime); })
    .y(function(d) { return y(d.close); });

function drawGraph(data) {
    data.forEach(function(d) {
        d.datetime = parseDate(d.datetime);
        d.close = +d.close;
    });

    x.domain(d3.extent(data, function(d) { return d.datetime; }));
    y.domain([d3.min(data, function(d) {
        return Math.min(d.close) }), 
        d3.max(data, function(d) {
            return Math.max(d.close) })
        ]);
    
    svg.append("path")
    .style("stroke", "blue")
    .style("fill", "none")
    .style("stroke-dasharray", ("3, 3"))
    .attr("d", closeLine(data));

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + graphHeight + ")")
      .call(xAxis);
    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    };
// call function
drawGraph(graphData);