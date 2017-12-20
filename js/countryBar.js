// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


// add the SVG element
var svg2 = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// load the data


// scale the range of the data

x.domain(cc.map(function (d) {
    return d.Country;
}));
y.domain([0, d3.max(cc, function (d) {
    return d.Count;
})]);

console.log(cc[0].Count);
console.log(cc[0].Country);
// add axis
svg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)");


svg2.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 5)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Count of Satellites");


// Add bar chart
svg2.selectAll("#bar")
    .data(cc)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
        return x(d.Country);
    })
    .attr("width", x.rangeBand())
    .attr("y", function (d) {
        return y(d.Count);
    })
    .attr("height", function (d) {
        return height - y(d.Count);
    });


