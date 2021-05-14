// function buildPlot() {
//     /* data route */
//     // const species_url = "/api/species";
//     // d3.json(species_url).then(function(response) {
//     //     console.log(response);
//     // });

//     fungi_heatmap();

//     // const distribution_url = "/api/distribution";
//     // var geojson1Path = "static/Distribution JSON/level1.geojson";
//     // var distribution = d3.json(distribution_url)
//     // var geojsonLevel1 = d3.json(geojson1Path)
//     // var distributionData;
//     // var geojsonData;
//     // var allData = Promise.all([distribution, geojsonLevel1])
//     // allData.then(function(response) {
//     //     distributionData = response[0]
//     //     geojsonData = response[1]
//     //     console.log(response);

//     // });
     
    
// };

// buildPlot();


//level 1-3 geojson paths
// var distribution_url = "/api/distribution";
// var geojson1Path = "./static/Distribution JSON/level1.geojson";
// var geojson2Path = "./static/Distribution JSON/level2.geojson";
// var geojson3Path = "./static/Distribution JSON/level3.geojson";
// var distribution = d3.json(distribution_url)
// var geojsonLevel1 = d3.json(geojson1Path)
// var geojsonLevel2 = d3.json(geojson2Path)
// var geojsonLevel3 = d3.json(geojson3Path)
// var distributionData;
// var geojsonData1;
// var geojsonData2;
// var geojsonData3;

//level 1
// var allData1 = Promise.all([distribution, geojsonLevel1])
// allData1.then(function(response) {
//     var distributionData = JSON.parse(response[0])
//     var geojsonData1 = response[1]
//     console.log(response);

// mapping level 1 species counts onto level 1 regions (features)

// data1 = geojsonData1.features.map(feature => {
//     var match = distributionData.filter(d => (d.tdwg_level == 1) && (d.tdwg_code == feature.properties.LEVEL1_COD))[0];
//     feature.properties.species_count = match.species_count;
//     return feature})

// //level 2
// var allData2 = Promise.all([distribution, geojsonLevel2])
// allData2.then(function(response) {
//     var distributionData = JSON.parse(response[0])
//     var geojsonData2 = response[1]
//     console.log(response);

// //level 3
// var allData3 = Promise.all([distribution, geojsonLevel3])
// allData3.then(function(response) {
//     var distributionData = JSON.parse(response[0])
//     var geojsonData3 = response[1]
//     console.log(response);



// // Grab the width of the containing box
// // edit for #map
// var width = parseInt(d3.select("#scatter").style("width"));  
// var height = width - width / 3.9;
// var margin = 20;
// var labelArea = 110;
// var textPadBottom = 40;
// var textPadLeft = 40;

// //create svg for map 
// // edit for map not scatter - where do we put #map
// var svg = d3.select("#scatter") 
//             .append("svg") 
//             .attr("width", width) 
//             .attr("height", height) 
//             .classed("chart", true);

// //x axis group - this will be either plants or fungi as the options
// var xText = svg.append("g")

// // X AXIS
// // 1. Plants
// xText.append("text")  // append a "text" element to the xText group
//       .attr("y", -26) // set the "y" attribute to -26
//       .attr("data-name", "poverty") // set the 'data-name' attribute to 'poverty'
//       .attr("data-axis", "x") // set the data-axis attribute to 'x'
//       .classed("axisText active x", true) // give it class of axisText, active, and x
//       .text("Poverty"); // set the text to be a human readable label

// // 2. Fungi
// xText.append("text") // append a "text" element to the xText group
//       .attr("y", 0) // set the "y" attribute to 0
//       .attr("data-name", "age") // set the 'data-name' attribute to 'age'
//       .attr("data-axis", "x") // set the data-axis attribute to 'x'
//       .classed("axisText inactive x", true) // give it class of axisText, inactive, and x
//       .text("Age"); // set the text to be a human readable label

// // Y AXIS
// var leftTextX = margin + textPadLeft;
// var leftTextY = (height + labelArea) / 2 - labelArea;

// var yText = svg.append("g") // append a 'g' element to the svg
//                 .classed("yText", true);

// function yTextRefresh() {
//   yText.attr("transform", `translate(${leftTextX}, ${leftTextY})rotate(-90)`
//   );
// }
// yTextRefresh();

// // 1. Level 1
// yText.append("text") // append a "text" element to the yText group
//       .attr("y", -26) // set the "y" attribute to -26
//       .attr("data-name", "obesity") // set the 'data-name' attribute to 'obesity'
//       .attr("data-axis", "y") // set the data-axis attribute to 'y'
//       .classed("axisText active y", true) // give it class of axisText, active, and y
//       .text("Obesity"); // set the text to be a human readable label

// // 2. Level 2
// yText.append("text") // append a "text" element to the yText group
//       .attr("y", 0) // set the "y" attribute to 0
//       .attr("data-name", "smokes") // set the 'data-name' attribute to 'smokes'
//       .attr("data-axis", "y") // set the data-axis attribute to 'y'
//       .classed("axisText inactive y", true) // give it class of axisText, inactive, and y
//       .text("Smokes"); // set the text to be a human readable label

// // 3. Level 3
// yText.append("text") // append a "text" element to the yText group
//       .attr("y", 26) // set the "y" attribute to 0
//       .attr("data-name", "healthcare") // set the 'data-name' attribute to 'healthcare'
//       .attr("data-axis", "y") // set the data-axis attribute to 'y'
//       .classed("axisText inactive y", true) // give it class of axisText, inactive, and y
//       .text("Healthcare"); // set the text to be a human readable label


// function visualize(data) {
//     var currentX = "Plants";
//     var currentY = "Level 1";

//     function labelChange(axis, clickedText) {
//         // Switch the currently active to inactive.
//         d3.selectAll(".axisText") // d3.selectAll() the elements with class .axisText
//           .filter(`.${axis}`) // .filter() to only those with class `.${axis}`
//           .filter(".active") // .filter() to only those with class .active
//           .classed("active", false) // remove the class active from the element 
//           .classed("inactive", true); // give the element class inactive
    
//         // Switch the text just clicked to active.
//         clickedText.classed("inactive", false) // remove the class inactive from the element 
//                     .classed("active", true); // give the element class active
//       }
//       d3.selectAll(".axisText").on("click", function() {
//         // Make sure we save a selection of the clicked text,
//         // so we can reference it without typing out the invoker each time.
//         var selectedLabel = d3.select(this); // d3.select() the this (the thing that was clicked)
//         console.log(selectedLabel.classed("inactive"))
    
//         // We only want to run this on inactive labels.
//         // It's a waste of the processor to execute the function
//         // if the data is already displayed on the graph.
//         if (selectedLabel.classed("inactive")) { // if the selectedLabel has the class 'inactive'
//           // Grab the name and axis saved in label.
//           var axis = selectedLabel.attr("data-axis"); // grab the 'data-axis' .attr() from the selectedLabel
//           var name = selectedLabel.attr("data-name"); // grab the 'data-name' attr()
    
//           // When x is the saved axis, execute this:
//           if (axis === "x") { // if the axis is equal to 'x'
//             // Make currentX the same as the data name.
//             currentX = name;
    
//             // Change the min and max of the x-axis
//             xMinMax(); // call the xMinMax() function
    
//             // Update the domain of x.
//             xScale.domain([xMin, xMax]); // set the .domain() of xScale to be the [xMin, and xMax]
    
//             // Now use a transition when we update the xAxis.
//             svg.select(".xAxis")// select the .xAxis elements on the svg
//                 .transition() // set a transition()
//                 .duration(300) // give it a duration() of 300ms
//                 .call(xAxis); // call the xAxis
    
//             // With the axis changed, let's update the location of the state circles.
//             d3.selectAll('circle').each(function() { // d3.selectAll() 'circle' elements, and then use .each to fire off an anonymous function with no arguments
//               // Each state circle gets a transition for it's new attribute.
//               // This will lend the circle a motion tween
//               // from it's original spot to the new location.
//               d3.select(this) // use d3.select(this)
//                 .transition() // set a transition
//                 .attr("cx", d => xScale(d[currentX])) // set the 'cx' attribute to go from d => xScale applied to d[currentX]
//                 .duration(300); // set the duration to 300ms
//             });
    
//             // We need change the location of the state texts, too.
//             d3.selectAll(".stateText").each(function() { // d3.selectAll() '.stateText' elements, and then use .each to fire off an anonymous function with no arguments
//               // We give each state text the same motion tween as the matching circle.
//               d3.select(this) // use d3.select(this)
//                 .transition() // set a transition
//                 .attr("dx", d => xScale(d[currentX])) // set the 'dx' attribute to go from d => xScale applied to d[currentX]
//                 .duration(300); // set the duration to 300ms
//             });
    
//             // Finally, change the classes of the last active label and the clicked label.
//             labelChange(axis, selectedLabel); // call the labelCahnge function with axis and selectedLabel as arguments
//           }
//           else { 
//             currentY = name;
//             yMinMax();
//             yScale.domain([yMin, yMax]);
    
//             svg.select(".yAxis")
//                 .transition() 
//                 .duration(300) 
//                 .call(yAxis);
    
//             d3.selectAll('circle').each(function() { 
//               d3.select(this) 
//                 .transition() 
//                 .attr("cy", d => yScale(d[currentY])) 
//                 .duration(300); 
//             });
    
//             d3.selectAll(".stateText").each(function() { // d3.selectAll() '.stateText' elements, and then use .each to fire off an anonymous function with no arguments
//               // We give each state text the same motion tween as the matching circle.
//               d3.select(this) // use d3.select(this)
//                 .transition() // set a transition
//                 .attr("dy", d => yScale(d[currentY])) // set the 'dx' attribute to go from d => xScale applied to d[currentX]
//                 .duration(300); // set the duration to 300ms
//             });
    
//             // Finally, change the classes of the last active label and the clicked label.
//             labelChange(axis, selectedLabel);
//           }
//         }
      
    
//       // Part 5: Mobile Responsive
//       // =========================
//       // With d3, we can call a resize function whenever the window dimensions change.
//       // This makes it possible to add true mobile-responsiveness to our charts.
//       d3.select(window).on("resize", resizeChart) // d3.select() the window, and on resize event call the function resizeChart
        
//       // One caveat: we need to specify what specific parts of the chart need size and position changes.
//       function resizeChart() { // define a function called resizeChart that takes no arguments
//         // Redefine the width, height and leftTextY (the three variables dependent on the width of the window).
//         width = parseInt(d3.select("#scatter").style("width"));
//         height = width - width / 3.9;
//         leftTextY = (height + labelArea) / 2 - labelArea;
    
//         // Apply the width and height to the svg canvas.
//         svg.attr("height", height) // set the width and height attributes of the svg with the above variables
//         svg.attr("width", width)
    
//         // Change the xScale and yScale ranges
//         xScale.range([margin + labelArea, width - margin]);
//         yScale.range([height - margin - labelArea, margin]);
    
//         // With the scales changes, update the axes (and the height of the x-axis)
//         svg.select(".xAxis") // select the .xAxis elements in the svg
//             .call(xAxis) // call the xAxis function
//             .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
    
//         svg.select(".yAxis") // select the .yAxis elements in the svg
//             .call(yAxis) // call the yAxis function
    
//         // Update the ticks on each axis.
//         .call(tickCount()); // call the tickCount() function
    
//         // Update the labels.
//         xtextRefresh(); // call xtextRefresh() 
//         ytextRefresh(); // and yTextRefresh()
                        
    
//         // Update the radius of each dot.
//         getCircleRadius();; // call getCircleRadius()
    
//         // With the axis changed, let's update the location and radius of the state circles.
//         d3.selectAll("circle") // d3.selectAll() 'circle' elements
//           .attr("cy", d => yScale(d[currentY])) // set the 'cy' attribute to use the yScale() d[currentY]
//           .attr("cx", d => xScale(d[currentX])) // set the 'cy' attribute to use the xScale() d[currentX]
//           .attr("r", circleRadius); // set the 'r' attribute to be the circleRadius
    
//         // We need change the location and size of the state texts, too.
//          // do the same for the .stateText elements, but remember to use 'dx'/'dy' and scale appropriately
//          d3.select(".stateText")
//             .attr("cy", d => yScale(d[currentY])) // set the 'cy' attribute to use the yScale() d[currentY]
//             .attr("cx", d => xScale(d[currentX])) // set the 'cy' attribute to use the xScale() d[currentX]
//             .attr("r", circleRadius);
//       }
//       }
//      ) };