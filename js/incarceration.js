async function drawScatter() {
    
  // Access data
    let datasetPeace = await d3.csv("./data/peaceIndex.csv")
    //console.log(datasetPeace)
    
//    let datasetGDP = await d3.csv("GDP/Data-Table1.csv")
//    console.table(datasetGDP[0])
    
    const xAccessor = d => +d.IncarcerationRate
    const countryNameAccessor = d => d.Country
    
  //Set Dimensions
    let dimensions = {
        width: window.innerWidth * 0.8,
        height: 450,
        margin: {
            top: 50,
            right: 50,
            bottom: 90,
            left: 170,
        },
    }
    
    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.right
        - dimensions.margin.left
    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom
    
  //Draw Canvas
    const incarceration = d3.select("#incarceration")
        .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)
    
    const bounds = incarceration.append("g")
        .style("transform", `translate(${
            dimensions.margin.left
        }px, ${
            dimensions.margin.right
        }px)`)
    
  //Create Scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(datasetPeace, xAccessor))
        .range([0, dimensions.boundedWidth])
        .nice()
    
    const colorScale = d3.scaleLinear()
        .domain(d3.extent(datasetPeace, xAccessor))
        .range(["yellow", "salmon"])
    
    const highIncarcRateThreshold = xScale(5)
    const highIncarcRate = bounds.append("rect")
        .attr("x", highIncarcRateThreshold - 25)
        .attr("width", dimensions.boundedWidth - highIncarcRateThreshold + 50)
        .attr("y", 0)
        .attr("height", dimensions.boundedHeight)
        .attr("fill", "#e6ecf3")
    
  //Draw Data
    const radius = 10
    
    var force = d3.forceSimulation()
        .force("collision", d3.forceCollide(radius * 1.1))
        .force("x", d3.forceX(d => xScale(d.IncarcerationRate)).strength(1))
        .force("y", d3.forceY(160))
        .nodes(datasetPeace)
        .on("tick", updateNetwork)
    
    var dots = bounds.selectAll("circle")
        .data(datasetPeace)
        .enter()
        .append("circle")
            .attr("class", "node")
            .attr("fill", d => colorScale(xAccessor(d)))
            .attr("opacity", ".9")
            .attr("r", radius)
            //.attr("class", d => d.Country == "United Kingdom" ? "activeDot": "dot")
    
    function updateNetwork() {
        d3.selectAll("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    }
    
  //Add Axes, Labels, Legend
    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .attr("class", "incarc-rate-axis allAxes")
        .style("transform", `translateY(${dimensions.boundedHeight}px)`)
    
    const manuallyMadeAxis = bounds.append("rect")
        .attr("x", -25)
        .attr("width", dimensions.boundedWidth + 50)
        .attr("y", dimensions.boundedHeight)
        .attr("height", "2")
        .attr("fill", "#34495e")
        .attr("opacity", "0.2")
    
    const title = bounds.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .text("Which Countries Have the Highest Incarceration Rate?")
        .attr("font-weight", 900)
        .style("font-size", "1.2em")
        .attr("fill", "#34495e")
    
    const xAxisLabel = xAxis.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.margin.bottom - 45)
        .attr("fill", "#34495e")
        .style("font-size", "1.2em")
        .html("Per 1000 People")
    
    const sourceLabel = bounds.append("text")
        .attr("class", "sourceLabel")      
        .attr("x", dimensions.boundedWidth - 290)
        .attr("y", dimensions.boundedHeight + 65)
        .html("Data: Global Peace Index, Institute for Economics & Peace")
    const sourceLabel2 = bounds.append("text")
        .attr("class", "sourceLabel")      
        .attr("x", dimensions.boundedWidth - 290)
        .attr("y", dimensions.boundedHeight + 80)
        .html("and World Prison Brief")
    
  //Interactions
    dots.on("mouseenter", onMouseEnter)
        .on("mouseleave", onMouseLeave)
    
    const tooltipIR = d3.select("#tooltipIR")
    
    const activeDot = dots.filter(d => d.Country == "United Kingdom")
    const activeCountry = datasetPeace.filter(d => d.Country == "United Kingdom")
    const activeX = xScale(activeCountry[0].IncarcerationRate)
    
//    console.log(activeDot)
//    console.log(activeCountry[0].IncarcerationRate)
//    console.log(activeX)
    
    function highlightDot(datum) {
        datum.attr("fill", "purple")
        tooltipIR.transition().duration(200)
            .style("opacity", 1)
        
        tooltipIR.select("#incarceration-country")
            .text(activeCountry[0].Country)
        tooltipIR.select("#incarceration-value")
            .text(activeCountry[0].IncarcerationRate)
        
        const x = activeX
            + dimensions.margin.left
        const y = 130
            + dimensions.margin.bottom
        
        tooltipIR.style("transform", `translate(`
            + `calc( -50% + ${x}px),`
            + `calc(20% + ${y}px)`
            + `)`)
    }
    highlightDot(activeDot)
    
    function onMouseEnter(datum) {
        activeDot.attr("fill", d => colorScale(xAccessor(d)))
        
        tooltipIR.transition().duration(200)
            .style("opacity", 1)
        
        tooltipIR.select("#incarceration-country")
            .text(countryNameAccessor(datum))
        tooltipIR.select("#incarceration-value")
            .text(xAccessor(datum))
        
        const x = datum.x
            + dimensions.margin.left
        const y = datum.y
            + dimensions.margin.bottom
        
        tooltipIR.style("transform", `translate(`
            + `calc( -50% + ${x}px),`
            + `calc(20% + ${y}px)`
            + `)`)
    }
    
    function onMouseLeave() {
        tooltipIR.transition().duration(200)
            .style("opacity", 0)
    }
}

drawScatter()


