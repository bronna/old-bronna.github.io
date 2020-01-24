/////////////////////////////////////////////////////////
////Starts work hours chart
//References: 
//    https://github.com/nbremer/Chord-Diagram-Storytelling

async function Frame5() {
    
  //Show & run progress bar
    runProgressBar(time=700*6);
    
/////////////////////////////////////////////////////////
////Remove existing chart elements
    
    //d3.selectAll("line").remove()
    d3.selectAll(".data-line").remove()
    d3.selectAll(".dot").remove()
    d3.selectAll(".bg").remove()
    d3.selectAll(".amount-label").remove()
    d3.selectAll(".ratio-label").remove()
    d3.selectAll(".source-label").remove()
    d3.selectAll(".small-label").remove()
    d3.selectAll("#y-axis").remove()
    
/////////////////////////////////////////////////////////
////Set animation transition duration
    const fade = 500
    
/////////////////////////////////////////////////////////
////Bring in data
    
    const dataset = await d3.csv("./data/ceo-worker-hours.csv")
    
  //Data accessors
    const ceoToWorkerRatio = d => d.ceoToWorkerRealized
    const workweekHours = d => d.workweekHoursRealized
    
/////////////////////////////////////////////////////////
////Set scales and axes

    yScale.domain([0, 40])
    
  //X-axis
    xScale.domain([0, 370])

    xAxisGenerator.tickValues([0, 100, 200, 300, 400])
    
    xAxis.call(xAxisGenerator)
//        .style("transform", `translateY(${
//            540       
//        }px)`)
        .style("transform", `translateY(${
            350       
        }px)`)
        .attr("opacity", .13)
        .selectAll("text")
            .attr("y", 35)
    
/////////////////////////////////////////////////////////
////Draw data
    
    let color = colors[2]
    
    let radius = 16
    
    let labelWidth = 82
    let labelHeight = 30
    let labelYOffset = 24
    
  //Draw start line & data
    
    startHourLine.attr("x1", xScale(dataset[0].ceoToWorkerRealized))
        .attr("x2", xScale(dataset[0].ceoToWorkerRealized))
        //.attr("y1", yScale(0) - 10)
        .attr("y1", yScale(0) - 160)
        .attr("y2", yScale(15) + 10)
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5 5")
    
    hourStartDot.attr("cx", xScale(dataset[0].ceoToWorkerRealized))
        .attr("cy", yScale(15))
        .attr("r", radius)
        .attr("fill", color)
    
    hourStartLabel.attr("x", xScale(dataset[0].ceoToWorkerRealized))
        .attr("y", yScale(15) + 4)
        .text("1965")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
    
    ratioStartLabel.attr("x", xScale(dataset[0].ceoToWorkerRealized))
        //.attr("y", dimensions.boundedHeight + 10)
        .attr("y", yScale(15) + 60)
        .text("CEO pay 19.9x")
        .attr("fill", color)
        .style("text-anchor", "middle")
        .attr("class", "axis-label")
    
    endHourLine.attr("x1", xScale(dataset[7].ceoToWorkerRealized))
        .attr("x2", xScale(dataset[7].ceoToWorkerRealized))
        //.attr("y1", yScale(0) - 10)
        .attr("y1", yScale(0) - 160)
        .attr("y2", yScale(15) + 10)
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5 5")
        .attr("opacity", 0)
    
    hourEndDot.attr("cx", xScale(dataset[7].ceoToWorkerRealized))
        .attr("cy", yScale(15))
        .attr("r", radius)
        .attr("fill", color)
        .attr("opacity", 0)
    
    hourEndLabel.attr("x", xScale(dataset[7].ceoToWorkerRealized))
        .attr("y", yScale(15) + 4)
        .text("2018")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
        .attr("opacity", 0)
    
    ratioEndLabel.attr("x", xScale(dataset[7].ceoToWorkerRealized))
        .attr("y", yScale(15) + 60)
        .text("CEO pay 278.1x")
        .style("text-anchor", "middle")
        .attr("fill", color)
        .attr("class", "axis-label")
        .attr("opacity", 0)
    
/////////////////////////////////////////////////////////
////Draw caption
    
    captionBox
        .attr("x", (dimensions.boundedWidth / 2) - 100)
        .attr("y", 70)
        .attr("height", 190)
        .attr("opacity", 1)

    middleTextTop
        .attr("class", "caption")
        .attr("fill", "white")
        .attr("opacity", 0)
    
    changeBottomText(newText = "",
	loc = 1/2, delayDisappear = 0, delayAppear = 1, finalText = true, xloc = (dimensions.boundedWidth / 2 + 35), w = 230);
    
    changeTopText(newText = "Within firms, a CEO went from making 19.9 times more than their typical employee, to 278.1 times more.",
	loc = 4/2, delayDisappear = 0, delayAppear = 1, finalText = true, xloc = (dimensions.boundedWidth / 2 + 35), w = 230);
    
/////////////////////////////////////////////////////////
////Make rest of chart visible
    
    endHourLine.transition().delay(fade*8).duration(fade)
        .attr("opacity", 1)
    hourEndDot.transition().delay(fade*8).duration(fade)
        .attr("opacity", 1)
    hourEndLabel.transition().delay(fade*8).duration(fade)
        .attr("opacity", 1)
    ratioEndLabel.transition().delay(fade*8).duration(fade)
        .attr("opacity", 1) 
    
}













