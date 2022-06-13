// Declare rainfall data array
var rainfallPercent = [
  { month: "January", percent: 116 },
  { month: "Febuary", percent: 136 },
  { month: "March", percent: 88 },
  { month: "April", percent: 33 },
  { month: "May", percent: 167 },
  { month: "June", percent: 38 },
  { month: "July", percent: 100 },
  { month: "August", percent: 98 },
  { month: "September", percent: 85 },
  { month: "October", percent: 113 },
  { month: "November", percent: 48 },
  { month: "December", percent: 108 },
];
// Variables to toggle interation
var colorToggled = false;
var sizeToggled = false;
var animationTriggered = false;

// set the size and margins of the graph
var margin = { top: 50, right: 50, bottom: 100, left: 50 };
// add the graph to the page.
var svg = d3
  .select("#rain")
  .append("svg")
  .attr("viewBox", "0 0 500 500")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create the x axis and rotate the months
var x = d3
  .scaleBand()
  .padding(0.5)
  .range([0, 450])
  .domain(rainfallPercent.map((d) => d.month));
svg
  .append("g")
  .attr("transform", `translate(0,${300})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "rotate(-90), translate(-15, -15)")
  .style("text-anchor", "end");

// Create the y axis
var y = d3.scaleLinear().domain([0, 300]).range([300, 0]);
svg.append("g").call(d3.axisLeft(y));
// Declare the path
var path = svg
  .append("path")
  .attr("fill", "none")
  .attr("transform", "translate(8,0)")
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 5)
  .attr(
    "d",
    d3
      .line()
      .curve(d3.curveBasis)
      .x(function (d) {
        return x(d.month);
      })
      .y(function (d) {
        return y(d.percent);
      })(rainfallPercent)
  );

// Get the length of the path for animation
var pathLength = path.node().getTotalLength();

// add animations.
path
  .attr("stroke-dashoffset", pathLength)
  .attr("stroke-dasharray", pathLength)
  .transition()
  .ease(d3.easeSin)
  .duration(2500)
  .attr("stroke-dashoffset", 0);

// Toggle colour of bars on chart
function toggleColor() {
  // Toggle value
  colorToggled = !colorToggled;
  // The colour to be used
  var color = colorToggled ? "red" : "blue";
  // Impement the new colour with a transition
  path.transition().duration(300).style("stroke", color);
}
// Function to trigger animation
function triggerAnimation() {
  // Get Y axis
  var y = d3.scaleLinear().domain([0, 300]).range([300, 0]);
  // Select line and trigger animation
  path
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition()
    .ease(d3.easeSin)
    .duration(2500)
    .attr("stroke-dashoffset", 0);
  // Toggle animation trigger value
  animationTriggered = !animationTriggered;
}
// Function to change size of graph
function changeSize() {
  // Get d3 HTML element
  var graph = document.getElementById("rain");
  // Set width of chart
  graph.style.width = sizeToggled ? 500 + "px" : 700 + "px";
  // Set height of chart
  graph.style.height = sizeToggled ? 500 + "px" : 700 + "px";
  // Toggle boolean
  sizeToggled = !sizeToggled;
}
