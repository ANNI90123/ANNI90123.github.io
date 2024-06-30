async function bar_plot(dataPath, svgID){
    
    const alphabet = await d3.csv(dataPath);
    console.log(alphabet);

    const plot = Plot.plot({
        y: {
          grid: true,
          percent: true
        },
        marks: [
          Plot.ruleY([0]),
          Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: "y", reverse: true}})
        ]
      });

    const div = document.querySelector(svgID);
    div.append(plot); 

}




async function scatter_plot(dataPath, svgID, attribute){

    const data = await d3.csv(dataPath);
    console.log(data);

    data.forEach(d => d.rank = +d.rank);
    data.forEach(d => d[attribute] = +d[attribute]);

    const plot = Plot.plot({
        y: {
          grid: true
        },
        marks: [
          Plot.dot(data, {x: "rank", y: attribute})
        ]
      });

    const svg = document.querySelector(svgID);
    svg.append(plot); 

}


async function box_plot(dataPath, svgID, attribute){
    const data = await d3.csv(dataPath);
    console.log(data);

    data.forEach(d => d.rank = +d.rank);
    data.forEach(d => d[attribute] = +d[attribute]);

    const plot = Plot.plot({
        y: {
          grid: true
        },
        marks: [
          Plot.boxY(data, {x: "rank", y: attribute})
        ]
      });

    const svg = document.querySelector(svgID);
    svg.append(plot); 

}



async function grouped_box_plot(dataPath, svgID, attribute){

    const data = await d3.csv(dataPath);
    data.forEach(d => d.Rank = +d.Rank);
    data.forEach(d => d[attribute] = +d[attribute]);


    const plot = Plot.plot({
        marginBottom: 200,
        x: {
            tickRotate: 90, label: null
        },
        y: {
          grid: true
        },
        
        marks: [
          Plot.barY(data, {y: attribute, fx: "Rank",  x: "Query", fill: "Query"})
        ]
      });

    const div = document.querySelector(svgID);
    div.append(plot); 



}











//---------------------------------------------------------------------------------------------

function barChart (dataPath, svgID, x_data, y_data){
    d3.csv(dataPath, function(firstdata) {
        
        const data = firstdata.sort((a, b) => b[y_data] - a[y_data]);
        
        //console.log(data);

        // Declare the chart dimensions and margins.
        const width = 928;
        const height = 500;
        const marginTop = 30;
        const marginRight = 0;
        const marginBottom = 30;
        const marginLeft = 40;

        
        // Declare the x (horizontal position) scale.
        const x = d3.scaleBand()
            .domain(data.map(d => d[x_data])) // descending frequency
            .range([marginLeft, width - marginRight])
            .padding(0.1);
        
        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => d[y_data])])
            .range([height - marginBottom, marginTop]);

        // Create the SVG container.
        const svg = d3.select(svgID)
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
            .attr("x", (d) => x(d[x_data]))
            .attr("y", (d) => y(d[y_data]))
            .attr("height", (d) => y(0) - y(d[y_data]))
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
}


//barChart("js/alphabet.csv", "#chart2", "letter", "frequency");


function lineChart(dataPath, svgID){

    d3.csv(dataPath, function(aapl){

        aapl.forEach(d => d.date = new Date(d.date));
        aapl.forEach(d => d.close = +d.close);
        //console.log(aapl);
    
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
        const svg = d3.select(svgID)
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


}


function dountChart(dataPath, svgID){

    d3.csv(dataPath, function(data) {
        //console.log(data);

        const width = 500;
        const height = Math.min(width, 500);
        const radius = Math.min(width, height) / 2;

        const arc = d3.arc()
            .innerRadius(radius * 0.67)
            .outerRadius(radius - 1);

        const pie = d3.pie()
            .padAngle(1 / radius)
            .sort(null)
            .value(d => d.value);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

        const svg = d3.select(svgID)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        svg.append("g")
            .selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("fill", d => color(d.data.name))
            .attr("d", arc)
            .append("title")
            .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(pie(data))
            .enter()
            .append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .call(text => text.append("tspan")
                .attr("y", "-0.4em")
                .attr("font-weight", "bold")
                .text(d => d.data.name))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .text(d => d.data.value.toLocaleString("en-US")));
    });

}

function dotChart(dataPath, svgID, attribute){

    d3.csv(dataPath, function(data){

            data.forEach(d => d.rank = +d.rank);
            data.forEach(d => d[attribute] = +d[attribute]);

            //console.log(data);


            const attributeSum = new Array(20).fill(0);
            const attributeAverage = new Array(20).fill(0);
            const count = new Array(20).fill(0);

            let rank = 0;
            data.forEach(function(d){
                rank = d.rank -1;
                attributeSum[rank] += d[attribute]
                count[rank] ++;
            });

            for(let i = 0; i < 20; i++){
                attributeAverage[i] = attributeSum[i] / count[i];
            }

            const max = d3.max(data, d => d[attribute]);
            const min = d3.min(data, d => d[attribute]);

            const svg = d3.select(svgID);
            const bbox = svg.node().getBoundingClientRect();

            const width = bbox.width;
            const height = bbox.height;
            const marginTop = 20;
            const marginRight = 30;
            const marginBottom = 30;
            const marginLeft = 40;


            const x = d3.scaleLinear()
                .domain([0, 20])
                .range([marginLeft, width - marginRight]);
            
            const y = d3.scaleLinear()
                .domain([min, max])
                .range([height - marginBottom, marginTop]);


            var numberTicks = 20;    
            if(width < 400){
                numberTicks = 10;
            }
            svg.append("g")
                .attr("transform", `translate(0,${height - marginBottom})`)
                .call(d3.axisBottom(x).ticks(numberTicks))
                .call(g => g.append("text")
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "end")
                    .text("Rank"));


            svg.append("g")
                .attr("transform", `translate(${marginLeft},0)`)
                .call(d3.axisLeft(y))
                .call(g => g.append("text")
                    .attr("x", -marginLeft)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text(attribute));


            for(let i = 0; i < 20; i++){
                svg.append("g")
                    .attr("stroke", "#000")
                    .attr("stroke-opacity", 0.2)
                    .append("circle")
                    .attr("cx", x(i+1))
                    .attr("cy", y(attributeAverage[i]))
                    .attr("r", 2.5);
            }
            
        }
    );

}


function plot(dataPath, svgID, attribute){

    d3.csv(dataPath, function(data){

        //prepare Data
        data.forEach(d => d.rank = +d.rank);
        data.forEach(d => d[attribute] = +d[attribute]);

        const values_per_rank = Array.from({length: 20}, e => Array());
        let rank = 0;
        data.forEach(function(d){
            rank = d.rank -1;
            values_per_rank[rank].push(d[attribute]);
        });

        // Select SVG
        const svg = d3.select(svgID);
        const bbox = svg.node().getBoundingClientRect();

        // Decalre mesurements
        var margin = {top: 30, right: 30, bottom: 30, left: 40};
        var width = bbox.width;
        var height = bbox.height;

        


        const min = d3.min(data, d => d[attribute]);
        const max = d3.max(data, d => d[attribute]);

        // decalre x- and y-axis
        var x = d3.scaleLinear()
            .domain([0,20])
            .range([margin.left, width - margin.right]);
        var y = d3.scaleLinear()
            .domain([min,max])
            .range([height - margin.bottom, margin.top]);
        //show x- and y-axis
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(20));/*
            .call(g => g.append("text")
                .attr("text-anchor", "end")
                .attr("x", width- margin.right)
                .attr("y", height - 10)
                .text("Rank"));*/
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.append("text")
                .attr("x",-margin.left)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(attribute));

        // add the boxes
        var x_delta = (width - margin.left - margin.right)/20;
        for(let i = 0; i < 20; i++){
            console.log("Rank: " + (i+1));
            box(values_per_rank[i], svgID, margin.left + x_delta*(i+1), y);
        }

    });

}


function box(dataArray, svgID, x, y_axis){
    // declare mesurements for the box
    var width = 15;

    // sort dataArray
    var data_sorted = dataArray.sort(d3.ascending);


    console.log(data_sorted);
    // Caluculate neede values for the box
        var q1 = d3.quantile(data_sorted, .25);
        var median = d3.quantile(data_sorted, .5);
        var q3 = d3.quantile(data_sorted, .75);
        var interQuantileRange = q3 - q1;
        var min = q1 - 1.5 * interQuantileRange;
        var max = q1 + 1.5 * interQuantileRange;
        let min_index = 0;
        var min_point = data_sorted[min_index];
        while(min_point < min){
            min_index++;
            min_point = data_sorted[min_index];
        }
        let max_index = data_sorted.length-1;
        var max_point = data_sorted[max_index];
        while(max_point > max){
            max_index--;
            max_point=data_sorted[max_index];
        }


    console.log("min interval: " + min);
    console.log("max interval: " + max);
    console.log("Min: " + min_point);
    console.log("Max: " + max_point);
    

    // Show the boxplot

    // Select SVG
    const svg = d3.select(svgID);

    // Show the main vertical line
    svg
    .append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", y_axis(min_point) )
    .attr("y2", y_axis(max_point) )
    .attr("stroke", "black");

    // Show the box
    svg
    .append("rect")
    .attr("x", x - width/2)
    .attr("y", y_axis(q3) )
    .attr("height", (y_axis(q1)-y_axis(q3)) )
    .attr("width", width )
    .attr("stroke", "black")
    .style("fill", "#808080");

    
    // show median, min and max horizontal lines
    svg
    .selectAll("toto")
    .data([min_point, median, max_point])
    .enter()
    .append("line")
    .attr("x1", x-width/2)
    .attr("x2", x+width/2)
    .attr("y1", function(d){ return(y_axis(d))} )
    .attr("y2", function(d){ return(y_axis(d))} )
    .attr("stroke", "black");






}




function scatterPlot(dataPath, svgID, attribute){

    d3.csv(dataPath, function(data){

            data.forEach(d => d.rank = +d.rank);
            data.forEach(d => d[attribute] = +d[attribute]);

            //console.log(data);

            const max = d3.max(data, d => d[attribute]);
            const min = d3.min(data, d => d[attribute]);

            const svg = d3.select(svgID);
            const bbox = svg.node().getBoundingClientRect();

            const width = bbox.width;
            const height = bbox.height;
            const marginTop = 20;
            const marginRight = 30;
            const marginBottom = 30;
            const marginLeft = 40;

            console.log(width + " , " + height);

            

            const x = d3.scaleLinear()
                .domain([0, 20])
                .range([marginLeft, width - marginRight]);
            
            const y = d3.scaleLinear()
                .domain([min, max])
                .range([height - marginBottom, marginTop]);

            var numberTicks = 20;    
            if(width < 400){
                numberTicks = 10;
            }
            svg.append("g")
                .attr("transform", `translate(0,${height - marginBottom})`)
                .call(d3.axisBottom(x).ticks(numberTicks))
                .call(g => g.append("text")
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "end")
                    .text("Rank"));


            svg.append("g")
                .attr("transform", `translate(${marginLeft},0)`)
                .call(d3.axisLeft(y))
                .call(g => g.append("text")
                    .attr("x", -marginLeft)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text(attribute));



            data.forEach(function(d){
                svg.append("g")
                    .attr("stroke", "#000")
                    .attr("stroke-opacity", 0.2)
                    .append("circle")
                    .attr("cx", x(d.rank))
                    .attr("cy", y(d[attribute]))
                    .attr("r", 2.5);
            });
                
            
            
        });
}



// ================================================================================
// ================================================================================














function filter(){

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#charti")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    //Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv", function(data) {
    
        // List of groups (here I have one group per column)
        var allGroup = d3.map(data, function(d){return(d.name)}).keys()
    
        // add the options to the button
        d3.select("#selectButton")
          .selectAll('myOptions')
             .data(allGroup)
          .enter()
            .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; }) // corresponding value returned by the button
    
        // A color scale: one color for each group
        var myColor = d3.scaleOrdinal()
          .domain(allGroup)
          .range(d3.schemeSet2);
    
        // Add X axis --> it is a date format
        var x = d3.scaleLinear()
          .domain(d3.extent(data, function(d) { return d.year; }))
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(7));
    
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return +d.n; })])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));
    
        // Initialize line with first group of the list
        var line = svg
          .append('g')
          .append("path")
            .datum(data.filter(function(d){return d.name==allGroup[0]}))
            .attr("d", d3.line()
              .x(function(d) { return x(d.year) })
              .y(function(d) { return y(+d.n) })
            )
            .attr("stroke", function(d){ return myColor("valueA") })
            .style("stroke-width", 4)
            .style("fill", "none")
    
        // A function that update the chart
        function update(selectedGroup) {
    
          // Create new data with the selection?
          var dataFilter = data.filter(function(d){return d.name==selectedGroup})
    
          // Give these new data to update line
          line
              .datum(dataFilter)
              .transition()
              .duration(1000)
              .attr("d", d3.line()
                .x(function(d) { return x(d.year) })
                .y(function(d) { return y(+d.n) })
              )
              .attr("stroke", function(d){ return myColor(selectedGroup) })
        }
    
        // When the button is changed, run the updateChart function
        d3.select("#selectButton").on("change", function(d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        })
    
    })
    }
    
function myDountChart(dataPath, svgID){

    d3.csv(dataPath, function(data) {
        //console.log(data);

        const width = 500;
        const height = Math.min(width, 500);
        const radius = Math.min(width, height) / 2;

        const arc = d3.arc()
            .innerRadius(radius * 0.67)
            .outerRadius(radius - 1);

        const pie = d3.pie()(dataPath);

        console.log(pie);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

        const svg = d3.select(svgID)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        svg.append("g")
            .selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("fill", d => color(d.data.name))
            .attr("d", arc)
            .append("title")
            .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(pie(array))
            .enter()
            .append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .call(text => text.append("tspan")
                .attr("y", "-0.4em")
                .attr("font-weight", "bold")
                .text(d => d.data.name))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .text(d => d.data.value.toLocaleString("en-US")));
    });


    function update(rank){

        var frequency
        const values_per_attribute = Array.from({length: 6}, e => Array());

        data.forEach(function(d){
            if(d.rank == rank){
                for(let i = 0; i < 6; i++){
                    let string = "h"+ (i+1) + " Word Count";
                    values_per_attribute[i].push(d[string]);

                }
                

            }
            
        });
    }

}


function test(array){

    const pie = d3.pie()(array);

        console.log(pie);



    svg.append("g")
        .attr("text-anchor", "middle")
        .selectAll()
        .data(pie)
        .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .call(text => text.append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .text(d => d.data.name))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text(d => d.data.value.toLocaleString("en-US")));

}


function update(dataPath, rank){

    d3.csv(dataPath, function(data) {

        for (let i= 0; i < 6; i++){
            let attribute = "h"+ (i+1) + " Word Count";
            data.forEach(d => d[attribute] = +d[attribute]);
        }
        data.forEach(d => d.Total_h_Word_Count = +d.Total_h_Word_Count);
        
        const values_per_attribute = new Array(7).fill(0);

        var counter = 0;
        data.forEach(function(d){
            if(d.rank == rank){
                values_per_attribute[0] += d.Total_h_Word_Count;
                for(let i = 1; i <= 6; i++){
                    let string = "h"+ (i) + " Word Count";
                    values_per_attribute[i] += d[string];
                    
                }
            }
        });

        //console.log(values_per_attribute[0] + ", " + values_per_attribute[1]);
        for(let i = 1; i <= 6; i++){
            values_per_attribute[i] /= values_per_attribute[0];
        }

        console.log(values_per_attribute);

        test(values_per_attribute);

    });

    

    
}







