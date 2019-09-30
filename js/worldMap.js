async function drawMap() {
  
  // Bring in data
    const countryShapes = await d3.json("./data/world-geojson.json")
    const dataset = await d3.csv("./data/internet-access.csv")
    
    const countryNameAccessor = d => d.properties["NAME"]
    const countryIdAccessor = d => d.properties["ADM0_A3_IS"]
    
    const metric = "Individuals using the Internet (% of population)"
    let metricDataByCountry = {} //stores key value pairs for country codes & percentages
    
    dataset.forEach(d => {
        metricDataByCountry[d["Country Code"]] = +d["2017 [YR2017]" || ".."]
    })
    
    //console.table(metricDataByCountry)
    
  // Set dimensions
    let dimensions = {
        width: window.innerWidth * 0.9,
        margin: {
            top: 60,
            right: 10,
            bottom: 30,
            left: 50,
        }
    }
    
    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.right
        - dimensions.margin.left
    
    const sphere = ({type: "Sphere"})
    const projection = d3.geoNaturalEarth1()
        .fitWidth(dimensions.boundedWidth, sphere)
    const pathGenerator = d3.geoPath(projection)
    const [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere)
    
    dimensions.boundedHeight = y1
    dimensions.height = dimensions.boundedHeight
        + dimensions.margin.top
        + dimensions.margin.bottom
    
  // Create Canvas
    const worldMap = d3.select("#worldMap")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
    
    const bounds = worldMap.append("g")
        .style("transform", `translate(${
            dimensions.margin.left
        }px, ${
            dimensions.margin.top
        }px)`)
    
  //Set Scales
    const metricValues = Object.values(metricDataByCountry)
    //console.log(metricDataByCountry)
    //console.log(metricValues)

    const colorScale = d3.scaleLinear()
        .domain([0, 100])
        .range(["cornsilk", "cadetblue"])
    
  // Draw Data
    const earth = bounds.append("path")
        .attr("class", "earth")
        .attr("d", pathGenerator(sphere))
    
    const countries = bounds.selectAll(".country")
        .data(countryShapes.features)
        .enter().append("path")
        .attr("class", "country")
        .attr("d", pathGenerator)
        .attr("fill", d => {
            const metricValue = metricDataByCountry[countryIdAccessor(d)]
            if (metricValue == ".0001") return "#e6e6e6"
            return colorScale(metricValue)
        })
    
    //make legend
    const legendGroup = worldMap.append("g")
        .attr("transform", `translate(${
            dimensions.width < 800
            ? 120
            : 180
        }, ${
            dimensions.width < 800
            ? dimensions.boundedHeight - 30
            : dimensions.boundedHeight * 0.75
        })`)
    
    const defs = worldMap.append("defs")
    const legendGradientId = "legend-gradient"
    const gradient = defs.append("linearGradient")
        .attr("id", legendGradientId)
        .selectAll("stop")
        .data(colorScale.range())
        .enter().append("stop")
            .attr("stop-color", d => d)
            .attr("offset", (d, i) => `${
                i * 100
            }%`)
    const legendWidth = 120
    const legendHeight = 16
    const legendGradient = legendGroup.append("rect")
        .attr("x", -legendWidth / 2)
        .attr("height", legendHeight)
        .attr("width", legendWidth)
        .style("fill", `url(#${legendGradientId})`)
    
    const legendValueRight = legendGroup.append("text")
        .attr("class", "legend-value")
        .attr("x", legendWidth / 2 + 45)
        .attr("y", legendHeight / 2)
        .text("100%")
    const legendValueLeft = legendGroup.append("text")
        .attr("class", "legend-value")
        .attr("x", -legendWidth / 2 - 5)
        .attr("y", legendHeight / 2)
        .text("0%")
        .style("text-anchor", "end")
    
    const title = bounds.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .text("Population With Internet Access in 2017")
        .attr("font-weight", 900)
        .style("font-size", "1.2em")
        .attr("fill", "#34495e")
    
    const sourceLabel = bounds.append("text")
        .attr("class", "sourceLabel")      
        .attr("x", dimensions.boundedWidth - 330)
        .attr("y", dimensions.boundedHeight + 20)
        .html("Data: World Development Indicators, World Bank Data")
    
  // Interactions
    countries.on("mouseenter", onMouseEnter)
        .on("mouseleave", onMouseLeave)
    
    const tooltipWorld = d3.select("#tooltipWorld")
    
    function onMouseEnter(datum) {
        console.log(datum)
        tooltipWorld.style("opacity", 1)
        
        const metricValue = metricDataByCountry[countryIdAccessor(datum)]
        
        tooltipWorld.select("#country")
            .text(countryNameAccessor(datum))
        tooltipWorld.select("#value")
            .text(`${d3.format(",.2f")(metricValue || 0)}%`)
        
        const [centerX, centerY] = pathGenerator.centroid(datum)
        const x = centerX + dimensions.margin.left
        const y = centerY + dimensions.margin.top
        
        tooltipWorld.style("transform", `translate(`
            + `calc( -50% + ${x}px),`
            + `calc(-20% + ${y}px)`
            + `)`)
    }
    
    function onMouseLeave() {
        tooltipWorld.style("opacity", 0)
    }
  
}
drawMap()