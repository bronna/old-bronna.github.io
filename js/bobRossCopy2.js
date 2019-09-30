async function drawLineChart() {
  // Load Dataset
    const dataset = await d3.csv("./data/bob_ross.csv")
    console.log(dataset[0])
    
    const xAccessor = d => +d.SEASON
    const yAccessor = d => d.TREES
                                  
  // Define Dimensions
    const width = window.innerWidth * 0.9
    let dimensions = {
        width: width,
        height: width * 0.5,
        margin: {
            top: 70,
            right: 105,
            bottom: 50,
            left: 80,
        },
    }
    
    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom
    
  // Draw Canvas
    const bobross = d3.select("#bobross")
        .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)
    const bounds = bobross.append("g")
        .style("transform", `translate(${
            dimensions.margin.left
        }px, ${
            dimensions.margin.top
        }px)`)
    
  // Create scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth])
    
    const yScale = d3.scaleLinear()
        .domain([0, 14])
        .range([dimensions.boundedHeight,0])
    
    const element = [
        "TREES",
        "CLOUDS",
        "MOUNTAIN",
        "LAKE",
        "CABIN",
        "SNOW",
        "PATH",
        "WATERFALL",
        "OCEAN",
        "NIGHT",
    ]
    
    const elementColor = d3.scaleOrdinal()
        .domain(element)
        .range([
            "#96b6a1",//"#bab0ab",
            "#7fa3bd",//"#76b7b2",
            "#9a8a9f",//"#af7aa1",
            "#5d90a9",//"#f28e2c",
            "#cf8e4f",//"#e15759",
            "#d1cf42",//"#59a14f","#ff9da7",
            "#739c6d",//"#edc949",
            "#be6464",//"#9c755f",
            "#6cb0b3",//"#ff9da7",
            "#4e79a7",
        ])
    
//const drawChart = element => {
    //console.log(elementColor(element[0])) //color value for first element
    
//    const colorScale = d3.scaleLinear()
//        .domain([0, 1])
//        .range([elementColor(element), "white"])
//    
//    //console.log(colorScale.range())
//  
//    const defs = bounds.append("defs")
//    const gradientId = "element-gradient"
//    const gradient = defs.append("linearGradient")
//        .attr("id", gradientId)
//        .attr("y1", "0%")
//        .attr("y2", "100%")
//        .attr("x1", "0%")
//        .attr("x2", "0%")
//        .selectAll("stop")
//        .data(colorScale.range())
//        .enter()
//        .append("stop")
//            .attr("stop-color", d => d)
//            .attr("offset", (d, i) => `${
//                i * 100
//            }%`)
//    
////    const testPatch = bounds.append("circle")
////        .attr("cx", "100")
////        .attr("cy", "100")
////        .attr("r", "50")
////        .attr("fill", `url(#${gradientId})`)
//    
  // Draw the Data
    const areaGenerator = d3.area()
        .x(d => xScale(xAccessor(d)))
        .y0(dimensions.boundedHeight)
        .y1(d => yScale(yAccessor(d)))
        .curve(d3.curveBasis)
    const elementArea = bounds.append("path")
        .attr("d", areaGenerator(dataset))
        .attr("class", "selectedArea")
        .attr("fill", "#96b6a1")
        .attr("opacity", ".3")
    
    const lineGenerator = d3.line().curve(d3.curveBasis)
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)))
    const line = bounds.append("path")
        .attr("d", lineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", "#96b6a1")
        .attr("stroke-width", 2)
        .attr("opacity", ".4")
    
  // Labels
    const elementLabel = bounds.append("text")
        .attr("x", dimensions.boundedWidth + 5)
        .attr("y", yScale(dataset[31]["TREES"]))
        .text("TREES")
        .style("font-size", "0.75em")
        .attr("fill", "#96b6a1")
//}

    //element.forEach(drawChart)

  // Add axes
    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .attr("class", "allAxes bobross-axis")
        .style("transform", `translateY(${
               dimensions.boundedHeight
        }px)`)
    const xAxisLabel = xAxis.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.margin.bottom - 5)
        .attr("fill", "#34495e")
        .style("font-size", "1.2em")
        .html("TV Season")
    
    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
        .ticks(7)
    const yAxis = bounds.append("g")
        .call(yAxisGenerator)
        .attr("class", "allAxes bobross-axis")
    const yAxisLabel = yAxis.append("text")
        .attr("x", 60)
        .attr("y", -18)
        .attr("fill", "#34495e")
        .style("font-size", "1.2em")
        .html("# Paintings")
    
    const label = bounds.append("text")
        .attr("x", dimensions.boundedWidth + 5)
        .attr("y", -18)
        .attr("fill", "#34495e")
        .style("font-size", ".95em")
        .style("opacity", "0.85")
        .html("With:")

 //Chart Title
    const title = bounds.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("How Bob Ross's Paintings Changed (and Didn't) Over Time")
        .style("font-size", "1.2em")
        .attr("font-weight", 900)
        .attr("fill", "#34495e")
    
  // Interactions
    elementArea.on("mouseenter", onMouseEnter)
               .on("mouseleave", onMouseLeave)
    
    function onMouseEnter(datum) {
        console.log(datum)
////        const yAccessor = d => d[datum]
////        console.log(yAccessor(datum))
////        console.log(xAccessor(datum))
////    
////        const areaGenerator = d3.area() 
////            .x(xScale(xAccessor(datum)))
////            .y0(dimensions.boundedHeight)
////            .y1(yScale(yAccessor(datum)))
////            .curve(d3.curveBasis)
////        const highlight = bounds.append("path")
////            .attr("d", areaGenerator())
//            //.attr("fill", elementColor(datum))
//            //.attr("opacity", ".3")
//            //.attr("class", "highlightedArea")
    }
//    
    function onMouseLeave() {
//        d3.selectAll(".highlightedArea")
//            .remove()
    }
}

drawLineChart()





















