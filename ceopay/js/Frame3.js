/////////////////////////////////////////////////////////
////Makes 2nd frame of Pay Ratio Chart
//References: 
//    https://github.com/nbremer/Chord-Diagram-Storytelling

async function Frame3() {

  //Show & run progress bar
    runProgressBar(time=700*3);
    
  //Make the data accessible
    const dataset = await d3.csv("./data/ceo-worker-pay.csv")
    
  //Needed variables
    let labelHeight = 30
    let labelYOffset = 24
    
/////////////////////////////////////////////////////////
////Make rest of chart visible
  //Data lines visible
    workerLine.transition().delay(fade*5).duration(fade)
        .attr("opacity", 0.8)
    ceoLine.transition().delay(fade*5).duration(fade)
        .attr("opacity", 0.8)
    
  //End ratio line & dots visible
//    endLine.transition().delay(fade*5).duration(fade)
//        .attr("opacity", 1)
    workerEndDot.transition().delay(fade*5).duration(fade)
        .attr("opacity", 1)
    ceoEndDot.transition().delay(fade*5).duration(fade)
        .attr("opacity", 1)
    workerEndAmount.transition().delay(fade*5).duration(fade)
        .attr("opacity", 1)
    ceoEndAmountBG.transition().delay(fade*5).duration(fade)
        .attr("opacity", 1)
    ceoEndAmount.transition().delay(fade*5).duration(fade)
        .attr("opacity", 1)
    
//  //Ratio label visible
//    endRatioBG.transition().delay(fade*5).duration(fade)
//        .attr("opacity", 1)
//    endRatioLabel.transition().delay(fade*5).duration(fade)
//        .attr("opacity", 1)
    
/////////////////////////////////////////////////////////
////Zoom out y-axis
    
    yScale.domain([0, 20000000])
    
    yAxis.transition().duration(fade*5)
        .call(yAxisGenerator)
        .attr("class", "axis")
        .attr("id", "y-axis")
        .selectAll("text")
            .attr("x", -20)
            .attr("y", 10)
            .style("text-anchor", "start")
        .end()
        .then(function() {
            d3.selectAll(".tick")
            .each(function(_,i){
                if(i === 0 || i === 5) d3.select(this)
                    .transition().duration(fade)
                    .attr("opacity", 1)
            })
        })
    
    d3.selectAll(".tick text")
        .each(function(_,i){
            if(i > 2 && i !== 4 && i !== 9 && i !== 14)         
                d3.select(this).remove()
        })
    
//Redraw elements to match zoomed out y-axis
    
    let startLabelPosition = yScale(dataset[0].workerIncome)
        + ((yScale(dataset[0].ceoRealized) 
           - yScale(dataset[0].workerIncome)) / 2)
    
    let endLabelPosition = yScale(dataset[10].workerIncome) 
        - ((yScale(dataset[10].workerIncome) 
            - yScale(dataset[10].ceoRealized)) / 2)
    
    workerLine.attr("d", workerLineGenerator(dataset))
    ceoLine.attr("d", ceoLineGenerator(dataset))
    
//    startLine.transition().duration(fade*5)
//        .attr("y1", yScale(dataset[0].workerIncome))
//        .attr("y2", yScale(dataset[0].ceoRealized))
    workerStartDot.transition().duration(fade*5)
        .attr("cy", yScale(dataset[0].workerIncome))
    workerLabel.transition().duration(fade)
        .attr("opacity", 0)
    ceoStartDot.transition().duration(fade*5)
        .attr("cy", yScale(dataset[0].ceoRealized))
    ceoLabel.transition().duration(fade)
        .attr("opacity", 0)
    workerStartAmount.transition().duration(fade*5)
        .attr("y", yScale(dataset[0].workerIncome) + labelYOffset)
    ceoStartAmountBG.transition().duration(fade*5)
        .attr("y", yScale(dataset[0].ceoRealized) - 28)
    ceoStartAmount.transition().duration(fade*5)
        .attr("y", yScale(dataset[0].ceoRealized) - (labelYOffset / 2))
//    startRatioBG.transition().duration(fade*5)
//        .attr("y", startLabelPosition - (labelHeight / 2) + 1)
//    startRatioLabel.transition().duration(fade*5)
//        .attr("y", startLabelPosition + 8)
    
//    endLine
//        .attr("y1", yScale(dataset[10].workerIncome))
//        .attr("y2", yScale(dataset[10].ceoRealized))
    workerEndDot
        .attr("cy", yScale(dataset[10].workerIncome))
    ceoEndDot
        .attr("cy", yScale(dataset[10].ceoRealized))
    workerEndAmount
        .attr("y", yScale(dataset[10].workerIncome) + labelYOffset)
    ceoEndAmountBG
        .attr("y", yScale(dataset[10].ceoRealized) - 28)
    ceoEndAmount
        .attr("y", yScale(dataset[10].ceoRealized) - (labelYOffset / 2))
    
//    endRatioBG
//        .attr("y", endLabelPosition - (labelHeight / 2) + 1)
//    endRatioLabel
//        .attr("y", endLabelPosition + 8)
    
/////////////////////////////////////////////////////////
////Update caption text
    captionBox.transition().duration(fade)
        .attr("height", 115)
    caption
        .html("Over the next 53 years, average CEO pay exploded.")
        .call(wrap, 230) //figure out how to keep this function from removing the highlight class
        .transition().duration(fade*5).attr("opacity", 1)
    
}