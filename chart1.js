/*
// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));
*/

d3.csv("apple-stock.csv", function(aapl){

    aapl.forEach(d => d.date = new Date(d.date));
    aapl.forEach(d => d.close = +d.close);
    console.log(aapl);
    //console.log(d3.extent(aapl, d => d.date));
    //console.log(d3.max(aapl, d => d.close));
    //console.log(d3.max(aapl, d => d.date));

    // Declare the chart dimensions and margins.
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  //const x = d3.scaleUtc(d3.extent(aapl, d => d.date), [marginLeft, width - marginRight]);
  const x = d3.scaleUtc()
    .domain(d3.extent(aapl, d => d.date))
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  //const y = d3.scaleLinear([0, d3.max(aapl, d => d.close)], [height - marginBottom, marginTop]);
  const y = d3.scaleLinear()
    .domain([0, d3.max(aapl, d => d.close)])
    .range([height - marginBottom, marginTop]);

  // Declare the line generator.
  const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.close));

  // Create the SVG container.
  const svg = d3.select("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  // Add the x-axis.
  svg.append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  // Add the y-axis, remove the domain line, add grid lines and a label.
  
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(/*↑*/ "Daily close ($)"));

  // Append a path for the line.
  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(aapl));

});