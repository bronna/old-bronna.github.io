/////////////////////////////////////////////////////////
////Conclusion
//References: 
//    https://github.com/nbremer/Chord-Diagram-Storytelling

async function Frame8() {
    
  //Change clicker
    d3.select("#clicker")
        .html("Start Over")
    
  //Change the text
    middleTextTop
        .attr("class", "explanation")
        .attr("fill", "black")
        .attr("opacity", 0)
    changeTopText(newText = "So the next time you only want to go to work for the first 36 minutes of the day, you can feel a little justified.",
	loc = 4/2, delayDisappear = 0, delayAppear = 1, finalText = true, xloc = dimensions.boundedWidth / 2, w = 350);
    
    changeBottomText(newText = "",
	loc = 1/2, delayDisappear = 0, delayAppear = 1, finalText = true, xloc = dimensions.boundedWidth / 2, w = 350);
    
    let sourceTitle1 = bounds.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.boundedHeight / 2 + 100)
        .text("Data Source:")
        //.attr("fill", colors[0])
        .attr("font-size", "14px")
        .style("text-transform", "uppercase")
        .attr("text-anchor", "middle")
        .attr("opacity", 0)
    
    let source1 = bounds.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.boundedHeight / 2 + 130)
        .html("'CEO compensation, CEO-to-worker compensation ratio, and stock prices (2018$), selected years, 1965-2018' Lawrence Mishel and Julia Wolfe at Economic Policy Institute")
        //.attr("fill", colors[0])
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .call(wrap, 350)
        .attr("opacity", 0) 
    
    let sourceTitle2 = bounds.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.boundedHeight / 2 + 250)
        .text("Code Inspiration:")
        //.attr("fill", colors[0])
        .attr("font-size", "14px")
        .style("text-transform", "uppercase")
        .attr("text-anchor", "middle")
        .attr("opacity", 0)
    
    let source2 = bounds.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.boundedHeight / 2 + 280)
        .html("'Switching between phone brands' by Nadieh Bremer")
        //.attr("fill", colors[0])
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .call(wrap, 350)
        .attr("opacity", 0)
    
//https://www.epi.org/publication/ceo-compensation-2018/
        
    
  //Remove the previous elements
    d3.selectAll("line").remove()
    d3.selectAll("path").remove()
    d3.selectAll("circle").remove()
    d3.selectAll(".axis").remove()
    d3.selectAll(".caption").remove()
    d3.selectAll(".amount-label").remove()
    d3.selectAll(".axis-label").remove()
    d3.selectAll(".source-label").remove()
    d3.selectAll(".caption-big").remove()
    d3.selectAll(".caption-big-bg").remove()
    
//Make source labels visible
    sourceTitle1.transition().delay(fade*8).duration(fade)
        .attr("opacity", 1)
    source1.transition().delay(fade*8).duration(fade)
        .attr("opacity", 1)
    
    sourceTitle2.transition().delay(fade*8).duration(fade)
        .attr("opacity", 1)
    source2.transition().delay(fade*8).duration(fade)
        .attr("opacity", 1)
}
