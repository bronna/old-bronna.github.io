// sources: https://blockbuilder.org/officeofjane/8092eaec170663cadea5da1647ca77aa
//http://bl.ocks.org/atmccann/8966400

async function drawLineChart() {

// 1. Access data
  const dataset = await d3.csv("./data/world-carbon-emissions.csv")
  //console.table(dataset[20])

  const highAccessor = d => d.highIncomeCountries
  const midAccessor = d => d.middleIncomeCountries
  const lowAccessor = d => d.lowIncomeCountries
  
  const dateParser = d3.timeParse("%Y")
  const xAccessor = d => dateParser(d.Year)

// 2. Create chart dimensions

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 65,
      right: 100,
      bottom: 50,
      left: 150,
    },
  }
  dimensions.boundedWidth = dimensions.width
    - dimensions.margin.left
    - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom

// 3. Draw canvas

  const wrapper = d3.select("#elapsingLine")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = wrapper.append("g")  
    .style("transform", `translate(${
        dimensions.margin.left
      }px, ${
        dimensions.margin.top
      }px)`)
  
  const boundsBackground = bounds.append("rect")
      .attr("fill", "#34495e")
      .attr("x", 0)
      .attr("width", dimensions.boundedWidth)
      .attr("y", 0)
      .attr("height", dimensions.boundedHeight)

// 4. Create scales
  const highMax = d3.max(dataset, highAccessor)
  
  const yScale = d3.scaleLinear()
    .domain([0, 14])
    .range([dimensions.boundedHeight, 0])

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])

// 5. Draw data

  const highLineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(highAccessor(d)))

  const highLine = bounds.append("path")
      .attr("d", highLineGenerator(dataset))
      .attr("fill", "none")
      .attr("stroke", "#f28e2c")
      .attr("stroke-width", 2)
  
  const highLineLength = highLine.node().getTotalLength()
  highLine.attr("stroke-dasharray", `${highLineLength} ${highLineLength}`)
      .attr("stroke-dashoffset", highLineLength)
      .transition()
          .duration(4000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
  
  const midLineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(midAccessor(d)))

  const midLine = bounds.append("path")
      .attr("d", midLineGenerator(dataset))
      .attr("fill", "none")
      .attr("stroke", "#af7aa1")
      .attr("stroke-width", 2)
  
  const midLineLength = midLine.node().getTotalLength()
  midLine.attr("stroke-dasharray", `${midLineLength} ${midLineLength}`)
      .attr("stroke-dashoffset", midLineLength)
      .transition()
          .duration(4000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
  
  const lowLineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(lowAccessor(d)))

  const lowLine = bounds.append("path")
      .attr("d", lowLineGenerator(dataset))
      .attr("fill", "none")
      .attr("stroke", "#76b7b2")
      .attr("stroke-width", 2)
    
  const lowLineLength = lowLine.node().getTotalLength()
  lowLine.attr("stroke-dasharray", `${lowLineLength} ${lowLineLength}`)
      .attr("stroke-dashoffset", lowLineLength)
      .transition()
          .duration(4000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)

// 6. Draw peripherals

  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)

  const yAxis = bounds.append("g")
    .call(yAxisGenerator)
    .attr("class", "climateYAxis allAxes")

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
      .attr("class", "climateXAxis allAxes")
      .style("transform", `translateY(${
        dimensions.boundedHeight
      }px)`)
  
  const title = bounds.append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .text("Carbon dioxide emissions")
    .attr("font-weight", 900)
    .style("font-size", "1.2em")
    .attr("fill", "#34495e")
  
  const byLine = bounds.append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", -30)
    .attr("text-anchor", "middle")
    .text("in metric tons per person")
    .attr("font-weight", 400)
    .style("font-size", "1em")
    .attr("fill", "#34495e")
  
  const highLabel = bounds.append("text")
    .attr("x", 10)
    .attr("y", dimensions.boundedHeight / 2)
    .attr("text-anchor", "left")
    .text("high-income countries")
    .attr("font-weight", 400)
    .style("font-size", "1em")
    .attr("fill", "#f28e2c")
    .attr("opacity", "0.7")
    .attr("letter-spacing", "0.4")
  
  const midLabel = bounds.append("text")
    .attr("x", 10)
    .attr("y", dimensions.boundedHeight * 9/10)
    .attr("text-anchor", "left")
    .text("mid-income countries")
    .attr("font-weight", 400)
    .style("font-size", "1em")
    .attr("fill", "#af7aa1")
    .attr("opacity", "0.7")
    .attr("letter-spacing", "0.4")
    
  const lowLabel = bounds.append("text")
    .attr("x", 10)
    .attr("y", dimensions.boundedHeight - 10)
    .attr("text-anchor", "left")
    .text("low-income countries")
    .attr("font-weight", 400)
    .style("font-size", "1em")
    .attr("fill", "#76b7b2")
    .attr("opacity", "0.7")
    .attr("letter-spacing", "0.4")
  
  const sourceLabel = bounds.append("text")
    .attr("class", "sourceLabel")      
    .attr("x", dimensions.boundedWidth - 300)
    .attr("y", dimensions.boundedHeight + 50)
    .html("Data: World Development Indicators, World Bank Data")

}

drawLineChart()






