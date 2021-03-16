async function drawBars(data, location) {

  // 1. Access data
  const dataset = await d3.json(data)
  console.log(dataset)

  // 2. Create chart dimensions

  const width = 500
  let dimensions = {
    width: width,
    height: width * 0.7,
    margin: {
      top: 100,
      right: 10,
      bottom: 70,
      left: 100,
    },
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // 3. Draw canvas

  const barCharts = d3.select("#barCharts")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

  const bounds = barCharts.append("g")
      .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

  // init static elements
  bounds.append("g")
      .attr("class", "bins")
  bounds.append("line")
      .attr("class", "mean")
  bounds.append("g")
      .attr("class", "x-axis")
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)
    .append("text")
      .attr("class", "x-axis-label")
      .attr("x", dimensions.boundedWidth / 2)
      .attr("y", dimensions.margin.bottom - 10)

  const drawHistogram = metric => {
    const metricAccessor = d => d[metric]
    const yAccessor = d => d.length

    // 4. Create scales

    const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset, metricAccessor))
      .range([0, dimensions.boundedWidth])
      .nice()

    const binsGenerator = d3.histogram()
      .domain(xScale.domain())
      .value(metricAccessor)
      .thresholds(12)

    const bins = binsGenerator(dataset)

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, yAccessor)])
      .range([dimensions.boundedHeight, 0])
      .nice()

    // 5. Draw data

    const barPadding = 1
    
    const exitTransition = d3.transition()
        .duration(600)
        .ease(d3.easePolyOut)
    const updateTransition = d3.transition()
        .duration(600)
        .ease(d3.easePolyOut)

    let binGroups = bounds.select(".bins")
      .selectAll(".bin")
      .data(bins)

    const oldBinGroups = binGroups.exit()
    oldBinGroups.selectAll("rect")
        .transition(exitTransition)
            .attr("y", dimensions.boundedHeight)
            .attr("height", 0)
    oldBinGroups.selectAll("text")
        .transition(exitTransition)
            .attr("y", dimensions.boundedHeight)
      
    oldBinGroups.transition(exitTransition).remove()

    const newBinGroups = binGroups.enter().append("g")
        .attr("class", "bin")

    newBinGroups.append("rect")
        .attr("height", 0)
        .attr("x", d => xScale(d.x0) + barPadding)
        .attr("y", dimensions.boundedHeight)
        .attr("width", d => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
      
    newBinGroups.append("text")
        .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
        .attr("y", dimensions.boundedHeight)

    // update binGroups to include new points
    binGroups = newBinGroups.merge(binGroups)

    const barRects = binGroups.select("rect")
        .transition(updateTransition)
            .attr("x", d => xScale(d.x0) + barPadding)
            .attr("y", d => yScale(yAccessor(d)))
            .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
            .attr("width", d => d3.max([
              0,
              xScale(d.x1) - xScale(d.x0) - barPadding
            ]))
        .transition()
            .style("fill", "#8c80b3")

    const mean = d3.mean(dataset, metricAccessor)

    const meanLine = bounds.selectAll(".mean")
        .transition(updateTransition)
            .attr("x1", xScale(mean))
            .attr("x2", xScale(mean))
            .attr("y1", -20)
            .attr("y2", dimensions.boundedHeight)

    // 6. Draw peripherals

    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)

    const xAxis = bounds.select(".x-axis")
        //.transition(updateTransition)    
        .call(xAxisGenerator)

    const xAxisLabel = xAxis.select(".x-axis-label")
        .text(metric)
        .attr("y", dimensions.margin.bottom - 30)
  }
  
  const title = bounds.append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .text(location)
    .attr("font-weight", 400)
    .style("font-size", "1em")
    .attr("fill", "#34495e")
    
  // const byLine = bounds.append("text")
  //   .attr("x", dimensions.boundedWidth / 2)
  //   .attr("y", -55)
  //   .attr("text-anchor", "middle")
  //   .text("In 2017 (Sunnyvale, CA)")
  //   .attr("font-weight", 400)
  //   .style("font-size", "1em")
  //   .attr("fill", "#34495e")
  
  // const sourceLabel = bounds.append("text")
  //   .attr("class", "sourceLabel")      
  //   .attr("x", dimensions.boundedWidth - 157)
  //   .attr("y", dimensions.boundedHeight + 65)
  //   .html("Data: The Dark Sky Company")

  const metrics = [
    "humidity",
    "temperatureMin",
    "temperatureMax",
    "cloudCover",
    "precipProbability",
    "moonPhase"
  ]
  let selectedMetricIndex = 0
  drawHistogram(metrics[selectedMetricIndex])

  const button = d3.select(".weatherButton")

  button.node().addEventListener("click", onClick)
  function onClick() {
    selectedMetricIndex = (selectedMetricIndex + 1) % (metrics.length - 1)
    drawHistogram(metrics[selectedMetricIndex])
  }
}
drawBars("./data/New-York-weather_data.json", "New York City")
drawBars("./data/Portland-weather_data.json", "Portland")