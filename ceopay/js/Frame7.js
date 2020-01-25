/////////////////////////////////////////////////////////
////Finishes work hours chart
//References: 
//    https://github.com/nbremer/Chord-Diagram-Storytelling

async function Frame7() {
    
//Show & run progress bar
    runProgressBar(time=700*8);
    
/////////////////////////////////////////////////////////
////Update caption text
    
    captionBox.transition().duration(fade)
        .attr("height", 165)
    
    middleTextTop.attr("opacity", 0)
    changeTopText(newText = "If, by the hour, the ceo-to-worker pay ratio had remained the same, you would only need to work...",
	loc = 4/2, delayDisappear = 0, delayAppear = 1, finalText = true, xloc = (dimensions.boundedWidth / 2 + 35), w = 230);
    
/////////////////////////////////////////////////////////
////Bring in data
    
    const dataset = await d3.csv("./data/ceo-worker-hours.csv")
    
  //Data accessors
    const ceoToWorkerRatio = d => d.ceoToWorkerRealized
    const workweekHours = d => d.workweekHoursRealized
    

    
/////////////////////////////////////////////////////////
////Draw rest of data

    let color = colors[2]
    
    let radius = 12
    
    let labelWidth = 82
    let labelHeight = 30
    let labelYOffset = 24
    
    //Y-axis
    yAxisGenerator.tickFormat(d3.format(""))
        .tickValues([0, 10, 20, 30, 40])
    
    let yAxis = bounds.append("g")
        .call(yAxisGenerator)
        .style("transform", `translateX(${
            -20
        }px)`)
        .attr("class", "axis")
        .attr("id", "y-axis")
        .attr("opacity", 0)
        .selectAll("text")
            .attr("x", -20)
            .attr("y", 10)
            .style("text-anchor", "start")
    
    let hourLineGenerator = d3.line()
        .x(d => xScale(ceoToWorkerRatio(d)))
        .y(d => yScale(workweekHours(d)))
    hourLine.attr("d", hourLineGenerator(dataset))    
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 5)
        .attr("opacity", 0)
    
    let captionBigBG = bounds.append("rect")
        .attr("x", (dimensions.boundedWidth / 2) - 120)
        .attr("y", 277)
        .attr("width", 310)
        .attr("height", 100)
        .attr("class", "caption-big-bg")
        .attr("fill", color)
        .attr("opacity", 0)
    let captionBig = bounds.append("text")
        .attr("x", (dimensions.boundedWidth / 2) + 35)
        .attr("y", 345)
        .attr("class", "caption-big")
        .attr("fill", color)
        .attr("text-anchor", "middle")
        .text("3 hours")
        .attr("font-size", "62px")
        .attr("opacity", 0)
    
    let captionBottomBG = bounds.append("rect")
        .attr("x", (dimensions.boundedWidth / 2) - 100)
        .attr("y", 395)
        .attr("width", 270)
        .attr("height", 75)
        .attr("rx", labelHeight / 2)
        .attr("ry", labelHeight / 2)
        .attr("class", "caption")
        .attr("stroke-width", 2)
        .attr("stroke", "white")
        .attr("fill", "#262626")
        .attr("opacity", 0)
    let captionBottom = bounds.append("text")
        .attr("x", (dimensions.boundedWidth / 2) + 35)
        .attr("y", 425)
        .attr("class", "caption")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .text("…per week to get paid what you do.")
        .call(wrap, 230)
        .attr("opacity", 0)
    
/////////////////////////////////////////////////////////
////Make rest of chart visible
    
    xAxis.transition().delay(fade*13).duration(fade)
        .style("transform", `translateY(${
            540       
        }px)`)
    
    yAxis.transition().delay(fade*13).duration(fade)
        .attr("opacity", 1)
    
    ratioStartLabel.transition().delay(fade*13).duration(fade)
        .attr("y", dimensions.boundedHeight + 10)
        
    ratioEndLabel.transition().delay(fade*13).duration(fade)
        .attr("y", dimensions.boundedHeight + 10)
    
    hourLine.transition().delay(fade*13).duration(fade)
        .attr("opacity", .8)
    
    captionBigBG.transition().delay(fade*13).duration(fade*2)
        .attr("opacity", .2)
    captionBig.transition().delay(fade*13).duration(fade*2)
        .attr("opacity", 1)
    captionBottomBG.transition().delay(fade*13).duration(fade*2)
        .attr("opacity", 1)
    captionBottom.transition().delay(fade*13).duration(fade*2)
        .attr("opacity", 1)
    
  //Move hour dots
    startHourLine.transition().delay(fade*13).duration(fade*2)
        .attr("y1", yScale(0) - 10)
        .attr("y2", yScale(dataset[0].workweekHoursRealized))
    hourStartDot.transition().delay(fade*13).duration(fade*2)
        .attr("cy", yScale(dataset[0].workweekHoursRealized))
    hourStartLabel.transition().delay(fade*13).duration(fade*2)
        .attr("y", yScale(dataset[0].workweekHoursRealized) + 4)
    hourStartAmount.transition().delay(fade*13).duration(fade*2)
        .text("40 hours")
        .attr("y", yScale(dataset[0].workweekHoursRealized) + labelYOffset)
    hourEndAmount.transition().delay(fade*13).duration(fade*2)
        .text("3 hours")
        .attr("y", yScale(dataset[7].workweekHoursRealized) + labelYOffset)
    endHourLine.transition().delay(fade*13).duration(fade*2)
        .attr("y1", yScale(0) - 10)
        .attr("y2", yScale(dataset[7].workweekHoursRealized))
    hourEndDot.transition().delay(fade*13).duration(fade*2)
        .attr("cy", yScale(dataset[7].workweekHoursRealized))
    hourEndLabel.transition().delay(fade*13).duration(fade*2)
        .attr("y", yScale(dataset[7].workweekHoursRealized) + 4)
    
}
