/////////////////////////////////////////////////////////
////Finishes work hours chart
//References: 
//    https://github.com/nbremer/Chord-Diagram-Storytelling

async function Frame6() {
    
//Show & run progress bar
    runProgressBar(time=700*6);
    
/////////////////////////////////////////////////////////
////Update caption text
    
    captionBox.transition().duration(fade)
        .attr("height", 165)
    
    middleTextTop.attr("opacity", 0)
    changeTopText(newText = "Meanwhile, workers in 1965 worked about 40 hours a week and now they work…about 40 hours a week.",
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
    
    let radius = 16
    
    let labelWidth = 82
    let labelHeight = 30
    let labelYOffset = 24

    hourStartAmount.attr("x", xScale(dataset[0].ceoToWorkerRealized) + 25)
        .attr("y", yScale(15) - labelYOffset)
        .text("40 worker hours")
        .attr("fill", color)
        .attr("class", "amount-label")
        .call(wrap, 50, 1)
        .attr("opacity", 0)
    
    hourEndAmount.attr("x", xScale(dataset[7].ceoToWorkerRealized) + 25)
        .attr("y", yScale(15) - labelYOffset)
        .text("40 worker hours")
        .call(wrap, 50, 1)
        .attr("fill", color)
        .attr("class", "amount-label")
        .attr("opacity", 0)
    
/////////////////////////////////////////////////////////
////Make rest of chart visible
    
    hourStartAmount.transition().delay(fade*2).duration(fade*2)
        .attr("opacity", 1)
    
    hourEndAmount.transition().delay(fade*10).duration(fade)
        .attr("opacity", 1)     
    
}