/////////////////////////////////////////////////////////
////Makes 1st frame of Pay Ratio Chart
//References: 
//    https://github.com/nbremer/Chord-Diagram-Storytelling

function Frame1() {
    
  //Show & run progress bar
    runProgressBar(time=700*6);
    
  //Change the text
    middleTextTop.attr("class", "explanation")
    changeTopText(newText = "As leaders of their companies, CEOs typically make more money than the average worker.",
	loc = 4/2, delayDisappear = 0, delayAppear = 1, finalText = true, xloc = dimensions.boundedWidth / 2, w = 350);
	
    middleTextBottom.attr("class", "explanation")
    //change delayAppear back to ~8
	changeBottomText(newText = "How much more, though, has changed over time.",
	loc = 1/2, delayDisappear = 0, delayAppear = 6, finalText = true, xloc = dimensions.boundedWidth / 2, w = 350);
    
}