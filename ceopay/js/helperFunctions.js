/////////////////////////////////////////////////////////
////Wraps SVG text
//References: http://bl.ocks.org/mbostock/7555321
//            https://github.com/nbremer/Chord-Diagram-Storytelling
//            https://blockbuilder.org/kafunk/c17383ac5d1eccf97f397914c70053e9

function wrap(text, width, lineHeight) {
    if(typeof(lineHeight)==='undefined') lineHeight = 1.3;
    text.each(function() {
      let text = d3.select(this),
        words = text.text().split(/\s/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        x = text.attr("x"),
        y = text.attr("y"),
        dy = 0,
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    })
}

//function colorHighlight(text, word, color) {
//    
//}
//
//function boldHighlight(text) {
//    
//}

/////////////////////////////////////////////////////////
////Changes the top and bottom texts
//References: https://github.com/nbremer/Chord-Diagram-Storytelling
//https://gist.github.com/miguelmota/3faa2a2954f5249f61d9
//https://observablehq.com/@d3/transition-end

function changeTopText (newText, loc, delayDisappear, delayAppear, finalText, xloc, w) {
    //If finalText is not provided, it is not the last text of the Draw step
    //if(typeof(finalText)==='undefined') finalText = false;
    
    //if(typeof(xloc)==='undefined') xloc = dimensions.boundedWidth / 2;
    //if(typeof(w)==='undefined') w = 550;
    
    //Current text disappear
    middleTextTop
        .transition().delay(700 * delayDisappear).duration(fade)
        .attr("opacity", 0)
        .end()
        .then(
            //New text appear
            middleTextTop.text(newText)
                .attr("x", xloc)
                .attr("y", 50*loc)
                .call(wrap, w)
                .transition().delay(700 * delayAppear).duration(fade)
                .attr("opacity", 1)
                .end()
        )
    
//    if (finalText == true) {
//        d3.select("#clicker")
//            .text(buttonTexts[counter-2])
//            .style("pointer-events", "auto")
//            .transition().duration(400)
//            .style("border-color", "#363636")
//            .style("color", "#363636")
//            .end();
//     };
};

//Transition the bottom text
function changeBottomText (newText, loc, delayDisappear, delayAppear, finalText, xloc, w) {
    //if(typeof(finalText)==='undefined') finalText = false;
    
    //if(typeof(xloc)==='undefined') xloc = dimensions.boundedWidth / 2;
    //if(typeof(w)==='undefined') w = 550;
    
    middleTextBottom
        .transition().delay(700 * delayDisappear).duration(fade)
        .attr("opacity", 0)
        .end()
        .then(    
            middleTextBottom.text(newText)
                .attr("x", xloc)
                .call(wrap, w)
                .transition().delay(700 * delayAppear).duration(fade)
                .attr("opacity", 1)
                .end()
        )
};

/////////////////////////////////////////////////////////
////Animates the progress bar
//References: https://github.com/nbremer/Chord-Diagram-Storytelling
//https://gist.github.com/miguelmota/3faa2a2954f5249f61d9

function runProgressBar(time) {
    //Make the clicker invisible
//    d3.selectAll("#clicker")
//        .style("visibility", "hidden")
    
    d3.selectAll(".progressFront")
        .attr("width", progressWidth)
    //Increase width of bar until it hits full width, then hide it
    d3.selectAll(".progressFront")
        .transition().duration(time).ease(d3.easeLinear)
        .attr("width", 0)
        .attr("x", progressWidth)
        .end()
        .then(function() {
            //Reset clicker to visible
            d3.selectAll("#clicker")
                .style("visibility", "visible")
        
            //Reset bar to zero width
            d3.selectAll(".progressFront")
                .attr("width", 0)
                .attr("x", 0)
        })
}
              
         






















