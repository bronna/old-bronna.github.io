/////////////////////////////////////////////////////////
////Starts transition to work hours chart
//References: 
//    https://github.com/nbremer/Chord-Diagram-Storytelling

async function Frame4() {

  //Show & run progress bar
    runProgressBar(time=700*7);
    
  //Fade the background
    fadeBG.transition().duration(fade).attr("opacity", 0.9)
    
  //Remove the previous caption
    bounds.selectAll(".caption").transition().duration(fade)
        .attr("opacity", 0)
    
  //Change the text
    changeTopText(newText = "Some say that the dramatic increase in CEO pay is unjustified and unfair to workers.",
	loc = 4/2, delayDisappear = 0, delayAppear = 1, finalText = true, xloc = dimensions.boundedWidth / 2, w = 350);
    
  //Add bottom text
    changeBottomText(newText = "But, this could be an opportunity for workers to get a lot more vacation time…",
	loc = 1/2, delayDisappear = 0, delayAppear = 7, finalText = true, xloc = dimensions.boundedWidth / 2, w = 350);
    
}