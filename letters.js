// Variables to toggle interation
var colorToggled = false;
var sizeToggled = false;
var animationTriggered = false;

// Set the size and margins of the chart
var margin = { top: 50, right: 50, bottom: 100, left: 50 },
  width = 500 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;
// Add the chart to the page.
var svg = d3
  .select("#letterFrequency")
  .append("svg")
  .attr("viewBox", "0 0 500 500")
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Get the data from the csv file.
d3.csv("./letter_frequency.csv").then(function (data) {
  // Create the x axis
  var x = d3
    .scaleBand()
    .padding(0.5)
    .range([0, width])
    .domain(data.map((d) => d.Letter));
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text");

  // Create the y axis
  var y = d3.scaleLinear().domain([0, 15]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // create the bars on the chart
  svg
    .selectAll("mybar")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.Letter))
    .attr("width", x.bandwidth())
    .attr("fill", "blue");
  // .attr("y", (d) => y(0));

  // add animations.
  svg
    .selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", (d) => y(d.Percentage))
    .attr("height", (d) => height - y(d.Percentage))
    .delay((d, i) => {
      return i * 100;
    });
});
// Toggle colour of bars on chart
function toggleColor() {
  // Toggle value
  colorToggled = !colorToggled;
  // The colour to be used
  var color = colorToggled ? "red" : "blue";
  // Impement the new colour with a transition
  d3.selectAll("rect").transition().duration(300).style("fill", color);
}
// Function to trigger animation
function triggerAnimation() {
  // Get Y axis
  var y = d3.scaleLinear().domain([0, 15]).range([height, 0]);
  // Select bars and trigger animation
  d3.selectAll("rect")
    .transition()
    .duration(800)
    .attr("height", (d) => (animationTriggered ? height - y(d.Percentage) : 0))
    .delay((d, i) => {
      return i * 100;
    });
  // Toggle animation trigger value
  animationTriggered = !animationTriggered;
}
// Function to change size of graph
function changeSize() {
  // Get d3 HTML element
  var chart = document.getElementById("letterFrequency");
  // Set width of chart
  chart.style.width = sizeToggled ? 500 + "px" : 700 + "px";
  // Set height of chart
  chart.style.height = sizeToggled ? 500 + "px" : 700 + "px";
  // Toggle boolean
  sizeToggled = !sizeToggled;
}
