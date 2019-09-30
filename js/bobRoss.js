async function drawLineChart() {
  // Load Dataset
    const dataset = await d3.csv("./data/bob_ross.csv")
    //console.table(dataset[30])
    //console.log(dataset[30])
    //console.log(dataset[30]["WINTER"])
                                  
  // Define Dimensions
    const width = window.innerWidth * 0.9
    let dimensions = {
        width: width,
        height: width * 0.5,
        margin: {
            top: 70,
            right: 105,
            bottom: 80,
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
    const xAccessor = d => +d.SEASON
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
            "#f28e2c",//"#e15759",
            "#edc949",//"#59a14f","#ff9da7",
            "#59a14f",//"#edc949",
            "#ff9da7",//"#9c755f",
            "#6cb0b3",//"#ff9da7",
            "#4e79a7",
        ])
    
const drawChart = metric => {
    //console.log(elementColor(metric))
    
//    const colorScale = d3.scaleLinear()
//        .domain([0, 1])
//        .range([elementColor(metric), "white"])
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
    
//    const testPatch = bounds.append("circle")
//        .attr("cx", "100")
//        .attr("cy", "100")
//        .attr("r", "50")
//        .attr("fill", `url(#${gradientId})`)
    
  // Draw the Data
    const yAccessor = d => d[metric]
    
    const elementGroup = bounds.append("g")
        .attr("class", "selectedGroup")
    
    const areaGenerator = d3.area()
        .x(d => xScale(xAccessor(d)))
        .y0(dimensions.boundedHeight)
        .y1(d => yScale(yAccessor(d)))
        .curve(d3.curveBasis)
    const area = elementGroup.append("path")
        .attr("d", d => areaGenerator(dataset))
        .attr("class", "selectedArea")
        .attr("fill", elementColor(metric))
        .attr("opacity", ".2")
    
    const lineGenerator = d3.line().curve(d3.curveBasis)
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)))
    const line = elementGroup.append("path")
        .attr("d", lineGenerator(dataset))
        .attr("class", "selectedLine")
        .attr("fill", "none")
        //.attr("stroke", `url(#${gradientId})`)
        .attr("stroke", elementColor(metric))
        .attr("stroke-width", 2)
        .attr("opacity", ".4")
    
  // Labels
    const elementLabel = elementGroup.append("text")
        .attr("x", dimensions.boundedWidth + 5)
        .attr("y", yScale(dataset[31][metric]))
        .text(metric)
        .style("font-size", "0.75em")
        .attr("fill", elementColor(metric))
    
    //console.log(dataset[30][metric])
}

    element.forEach(drawChart)

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
        .attr("y", dimensions.margin.bottom - 35)
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

 //Other Chart Labels
    const title = bounds.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("How Bob Ross's Paintings Changed (and Didn't) Over Time")
        .style("font-size", "1.2em")
        .attr("font-weight", 900)
        .attr("fill", "#34495e")
    
    const sourceLabel = bounds.append("text")
        .attr("class", "sourceLabel")      
        .attr("x", dimensions.boundedWidth - 232)
        .attr("y", dimensions.boundedHeight + 70)
        .html("Data: Bob Ross Elements By Episode, FiveThirtyEight Data")
    
  // Interactions
    var allGroups = d3.selectAll(".selectedGroup")
    
    allGroups.on("mouseenter", onMouseEnter)
             .on("mouseleave", onMouseLeave)
    
    transitionDuration = 300
    
    function onMouseEnter() {
        allGroups.transition().duration(transitionDuration)
            .style("opacity", 0.15)
        
        const hoveredGroup = d3.select(this)
            .transition().duration(transitionDuration)
            .style("opacity", 1)
    }
    
    function onMouseLeave() {
        allGroups.transition().duration(transitionDuration)
            .style("opacity", 1)
    }

}

drawLineChart()





















