//Width and Height of the SVG
var
    w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementById('svg')[0],
    x = (e.clientWidth || g.clientWidth),
    y = (e.clientHeight || g.clientHeight - 100);


//Satellite orbit variables
var resolution = 5,
    speedUp = 4*4000000,
    phi = 0, //rotation of ellipses
    radiusSizer = 10, //radii of satellites - is based on launch mass - radius sizer just scales them.
    satelliteOpacity = 0.8;
    scalingFactor = 0.0029; //scaling what to show on screen.



var zoom = d3.behavior.zoom()
    .scaleExtent([1, 5])
    .on("zoom", zoomed);

//Create SVG
var svg = d3.select("#svg").append("svg")
    .attr("width", x)
    .attr("height", y)
    .call(zoom) .on("wheel.zoom", null);;

//Create a container for everything with the centre in the middle
var container = svg.append("g").attr("class", "container")
    .attr("transform", "translate(" + x / 4 + "," + y / 2 + ")");


//Earth in middle
var ImageWidth = "40";
container.append("svg:image")
    .attr("x", -ImageWidth)
    .attr("y", -ImageWidth)
    .attr("class", "earth")
    .attr("xlink:href", "img/earth.png")
    .attr("width", ImageWidth * 2)
    .attr("height", ImageWidth * 2)
    .attr("text-anchor", "middle");


//Create color gradient for satellites
var colors = ["#FB1108", "#FD150B", "#FA7806", "#FBE426", "#FCFB8F", "#F3F5E7", "#C7E4EA", "#ABD6E6", "#9AD2E1", "#42A1C1", "#1C5FA5", "#172484"];
var colorScale = d3.scale.linear()
    .domain([2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 14000, 20000, 30000])
    .range(colors);

//Set scale for radius according to launch mass of satellites of circles
var rScale = d3.scale.linear()
    .range([1, 20])
    .domain([0, d3.max(satellites, function (d) {
        return d.LaunchMass * 0.0001;
    })]);

//Format with 2 decimals
var formatSI = d3.format(".2f");

//Creating gradients to color up satellites
createGradients();

// Plot and move satellites
//Drawing a line for the orbit
var orbitsContainer = container.append("g").attr("class", "orbitsContainer");
var orbits = orbitsContainer.selectAll("g.orbit")
    .data(satellites).enter().append("ellipse")
    .attr("class", "orbit")
    .attr("cx", function (d) {
        return d.cx * scalingFactor;
    })
    .attr("cy", function (d) {
        return d.cy * scalingFactor;
    })
    .attr("rx", function (d) {
        return d.major * scalingFactor;
    })
    .attr("ry", function (d) {
        return d.minor * scalingFactor;
    })
    .style("fill", "#3E5968")
    .style("fill-opacity", 0)
    .style("stroke", "#999999")
    .style("stroke-width","0.05em")
    .style("stroke-opacity", 0.7);

//Drawing the satellites
var satContainer = container.append("g").attr("class", "satContainer");
var satellite = satContainer.selectAll("g.sat")
    .data(satellites).enter()
    .append("circle")
    .attr("class", "sat")
    .attr("r", function (d) {
        return radiusSizer * d.Radius;
    })
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .style("fill", function (d) {
        return "url(#gradientLinear)";
    })
    .style("opacity", satelliteOpacity)
    .style("stroke-opacity", 0.5)
    .style("stroke-width", "1px")
    .style("stroke", "red")
    .on("mouseover", function (d, i) {
    })
    .on("mouseout", function (d, i) {
        showEllipse(d, i, 0);
    })
.append('title') // Tooltip
            .text(function (d) { return d.NameofSatellite +
                '\nLaunch Site: ' + d.LaunchSite +
                '\nLaunch Vehicle: ' + d.LaunchVehicle +
                '\nOwner: ' + d.Owner+
                '\nLaunch Mass(kg): ' + d.LaunchMass
            });

function zoomed() {
    container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


