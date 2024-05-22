/*// Set Dimensions
const xSize = 500; 
const ySize = 500;
const margin = 40;
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;

// Create Random Points
const numPoints = 100;
const data = [];
for (let i = 0; i < numPoints; i++) {
data.push([Math.random() * xMax, Math.random() * yMax]);
}

// Append SVG Object to the Page
const svg = d3.select("svg")
.append("svg")
.append("g")
.attr("transform","translate(" + margin + "," + margin + ")");

// X Axis
const x = d3.scaleLinear()
.domain([0, 500])
.range([0, xMax]);

svg.append("g")
.attr("transform", "translate(0," + yMax + ")")
.call(d3.axisBottom(x));

// Y Axis
const y = d3.scaleLinear()
.domain([0, 500])
.range([ yMax, 0]);

svg.append("g")
.call(d3.axisLeft(y));

// Dots
svg.append('g')
.selectAll("dot")
.data(data).enter()
.append("circle")
.attr("cx", function (d) { return d[0] } )
.attr("cy", function (d) { return d[1] } )
.attr("r", 3)
.style("fill", "Red");*/




d3.csv("alphabet.csv", function(firstdata) {
    
    const data = firstdata.sort((a, b) => b.frequency - a.frequency);
    
    console.log(data);
 // Declare the chart dimensions and margins.
 const width = 928;
 const height = 500;
 const marginTop = 30;
 const marginRight = 0;
 const marginBottom = 30;
 const marginLeft = 40;

 
 // Declare the x (horizontal position) scale.
 const x = d3.scaleBand()
    .domain(data.map(d => d.letter)) // descending frequency
     .range([marginLeft, width - marginRight])
     .padding(0.1);
 
 // Declare the y (vertical position) scale.
 const y = d3.scaleLinear()
     .domain([0, d3.max(data, (d) => d.frequency)])
     .range([height - marginBottom, marginTop]);

 // Create the SVG container.
 const svg = d3.select("svg")
     .attr("width", width)
     .attr("height", height)
     .attr("viewBox", [0, 0, width, height])
     .attr("style", "max-width: 100%; height: auto;");

 // Add a rect for each bar.
 svg.append("g")
     .attr("fill", "steelblue")
   .selectAll("rect")
   .data(data)
   .enter()
   .append("rect")
     .attr("x", (d) => x(d.letter))
     .attr("y", (d) => y(d.frequency))
     .attr("height", (d) => y(0) - y(d.frequency))
     .attr("width", x.bandwidth());

 // Add the x-axis and label.
 svg.append("g")
     .attr("transform", `translate(0,${height - marginBottom})`)
     .call(d3.axisBottom(x).tickSizeOuter(0));

 // Add the y-axis and label, and remove the domain line.
 svg.append("g")
     .attr("transform", `translate(${marginLeft},0)`)
     .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
     .call(g => g.select(".domain").remove())
     .call(g => g.append("text")
         .attr("x", -marginLeft)
         .attr("y", 10)
         .attr("fill", "currentColor")
         .attr("text-anchor", "start")
         .text("↑ Frequency (%)"));

});