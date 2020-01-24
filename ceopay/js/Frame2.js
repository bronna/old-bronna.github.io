/////////////////////////////////////////////////////////
////Starts pay ratio chart
//References: 
//    https://github.com/nbremer/Chord-Diagram-Storytelling

async function Frame2() {
    
  //Show & run progress bar
    runProgressBar(time=700*4);
    
  //Disappear the text
    middleTextTop.transition().duration(fade).attr("opacity", 0)
    middleTextBottom.transition().duration(fade).attr("opacity", 0)
    
  //Axes visible
    xAxis.transition().duration(fade).attr("opacity", 1)
    yAxis.transition().duration(fade).attr("opacity", 1)
    
  //Source visible
    sourceLabel.transition().duration(fade).attr("opacity", 0.5)
    
  //Start amounts visible
    workerStartDot.transition().duration(fade).attr("opacity", 1)
    workerLabel.transition().duration(fade).attr("opacity", 1)
    ceoStartDot.transition().duration(fade).attr("opacity", 1)
    ceoLabel.transition().duration(fade).attr("opacity", 1)
    workerStartAmount.transition().duration(fade).attr("opacity", 1)
    ceoStartAmountBG.transition().duration(fade).attr("opacity", 1)
    ceoStartAmount.transition().duration(fade).attr("opacity", 1)
    
  //Caption visible
    captionBox.transition().duration(fade).attr("opacity", 1)
    caption
        .html("These inflation- adjusted numbers show what the average CEO and average worker made in 1965.")
        .call(wrap, 240) //figure out how to keep this function from removing the highlight class
        .transition().duration(fade).attr("opacity", 1)
    
//   //Start ratio visible, with a delay
//    startLine.transition().delay(fade*7).duration(fade).attr("opacity", 1)
//    startRatioBG.transition().delay(fade*7).duration(fade).attr("opacity", 1)
//    startRatioLabel.transition().delay(fade*7).duration(fade).attr("opacity", 1)
    
}