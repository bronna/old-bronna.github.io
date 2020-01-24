/////////////////////////////////////////////////////////
////Makes main frame of Pay Ratio Chart
//References: 
//    https://github.com/nbremer/Chord-Diagram-Storytelling
//    https://bl.ocks.org/mbostock/6186172
//    https://stackoverflow.com/questions/21583032/custom-tick-size-on-axis-d3js/21583985#21583985


/////////////////////////////////////////////////////////
////Chart dimensions and variables

//Color scheme
//let colors = ["#4771D1","#2EB88C","#f17eff"]
let colors = ["#7477fa","#ef74ff","#3cc0dd"]
//let colors = ["#43af88","#37b8c7","#7477fa"]

//Dimensions of wrapper
let dimensions = {
    width: 375,
    height: 667,
    margin: {
        top: 65,
        right: 42,
        bottom: 50,
        left: 40,
    },
}

//Dimensions of bounds
dimensions.boundedWidth = dimensions.width 
    - dimensions.margin.left 
    - dimensions.margin.right
dimensions.boundedHeight = dimensions.height 
    - dimensions.margin.top 
    - dimensions.margin.bottom

/////////////////////////////////////////////////////////
////Create canvas

const wrapper = d3.select("#ceoPayRatio")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

const bounds = wrapper.append("g")
    .style("transform", `translate(${
        dimensions.margin.left
    }px, ${
        dimensions.margin.top
    }px)`)

/////////////////////////////////////////////////////////
////Initiate elements that will be drawn later
let xScale = d3.scaleLinear()
let xAxisGenerator = d3.axisTop()
let xAxis = bounds.append("g")

let yScale = d3.scaleLinear()
let yAxisGenerator = d3.axisLeft()
let yAxis = bounds.append("g")

const sourceLabel = bounds.append("text")

let workerLineGenerator = d3.line()
let workerLine = bounds.append("path")
let ceoLineGenerator = d3.line()
let ceoLine = bounds.append("path")

//let startLine = bounds.append("line")
let workerStartDot = bounds.append("circle")
let workerLabel = bounds.append("text")
let ceoStartDot = bounds.append("circle")
let ceoLabel = bounds.append("text")
let workerStartAmount = bounds.append("text")
let ceoStartAmountBG = bounds.append("rect")
let ceoStartAmount = bounds.append("text")

let captionBox = bounds.append("rect")
let caption = bounds.append("text")

//let startRatioBG = bounds.append("rect")
//let startRatioLabel = bounds.append("text")

//let endLine = bounds.append("line")
let workerEndDot = bounds.append("circle")
let ceoEndDot = bounds.append("circle")
let workerEndAmount = bounds.append("text")
let ceoEndAmountBG = bounds.append("rect")
let ceoEndAmount = bounds.append("text")

//let endRatioBG = bounds.append("rect")
//let endRatioLabel = bounds.append("text")

let fadeBG = bounds.append("rect")

let hourLine = bounds.append("path")

let startHourLine = bounds.append("line")
let hourStartDot = bounds.append("circle")
let hourStartLabel = bounds.append("text")
let hourStartAmount = bounds.append("text")
let hourEndAmount = bounds.append("text")

let endHourLine = bounds.append("line")
let hourEndDot = bounds.append("circle")
let hourEndLabel = bounds.append("text")
let ratioStartLabel = bounds.append("text")
let ratioEndLabel = bounds.append("text")

/////////////////////////////////////////////////////////
////Set animation transition duration
const fade = 400

/////////////////////////////////////////////////////////
////Intro text
let textCenter = bounds.append("g")
    .attr("class", "explanationWrapper")

let middleTextTop = textCenter.append("text")
    .attr("class", "headline")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.top)
    .text("How many hours a week would you work if it were based on how much your CEO makes?")
    .call(wrap, 350)

let middleTextBottom = textCenter.append("text")
    .attr("class", "headline")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.boundedHeight / 2 + 30)

/////////////////////////////////////////////////////////
////Initiate the chart-drawing function
async function payRatioMain() {
    
/////////////////////////////////////////////////////////
////Bring in data
    
    const dataset = await d3.csv("./data/ceo-worker-pay.csv")
    
  //Data accessors
    const yearAccessor = d => d.year
    const ceoRealized = d => d.ceoRealized
    const workerIncome = d => d.workerIncome

/////////////////////////////////////////////////////////
////Set scales
    
    xScale.domain(d3.extent(dataset, yearAccessor))
        .range([0, dimensions.boundedWidth])
    
    yScale.domain([0, 1000000])
        .range([dimensions.boundedHeight, 0])
    
/////////////////////////////////////////////////////////
////Draw background axes & periphery
    
  //X-axis
    xAxisGenerator.scale(xScale)
        .tickSizeInner(-20)
        .tickPadding(15)
        .tickFormat(d3.format(""))
        .tickValues([1965, 1975, 1985, 1995, 2005, 2018])
    
    xAxis.call(xAxisGenerator)
        .style("transform", `translateY(${
            -25
        }px)`)
        .attr("class", "axis")
        .attr("opacity", 0)
    
  //Y-axis
    yAxisGenerator.scale(yScale)
        .tickSizeInner(20)
        .tickFormat(d3.format(","))
    
    yAxis.call(yAxisGenerator)
        .style("transform", `translateX(${
            -20
        }px)`)
        .attr("class", "axis")
        .attr("opacity", 0)
        .selectAll("text")
            .attr("x", -20)
            .attr("y", 10)
            .style("text-anchor", "start")
    
    d3.selectAll(".tick text")
        .each(function(_,i){
            if(i !== 0 && i !== 5 && i !== 6 && i !== 11 && i !== 16) d3.select(this).remove()
        })
    
    d3.selectAll(".tick")
        .each(function(_,i){
            if(i === 0) d3.select(this).attr("opacity", 1)
            else d3.select(this).attr("opacity", 0.13)
        })
    
  //Source label
    sourceLabel.attr("x", dimensions.boundedWidth + 35)
        .attr("y", dimensions.boundedHeight + 50)
        .html("Data: Economic Policy Institute")
        .attr("class", "source-label")
        .attr("opacity", 0.5)
        .attr("opacity", 0)
    
/////////////////////////////////////////////////////////
////Draw data
    
    let radius = 12
    
    let labelWidth = 82
    let labelHeight = 30
    let labelYOffset = 24
 
  //Line of ratio spread 1965
//    startLine.attr("x1", xScale(dataset[0].year))
//        .attr("x2", xScale(dataset[0].year))
//        .attr("y1", yScale(dataset[0].workerIncome))
//        .attr("y2", yScale(dataset[0].ceoRealized))
//        .attr("stroke", "black")
//        .attr("stroke-width", 2)
//        .attr("stroke-dasharray", "10 7")
//        .attr("opacity", 0)
    
  //Pay amount dots 1965
    workerStartDot.attr("cx", xScale(dataset[0].year))
        .attr("cy", yScale(dataset[0].workerIncome))
        .attr("r", radius)
        .attr("fill", colors[1])
        .attr("opacity", 0)
        .attr("class", "dot")
    
    workerLabel.attr("x", xScale(dataset[0].year))
        .attr("y", yScale(dataset[0].workerIncome) - 19)
        .text("worker")
        .attr("text-anchor", "middle")
        .attr("fill", colors[1])
        .attr("opacity", 0)
        .attr("class", "small-label")
    
    ceoStartDot.attr("cx", xScale(dataset[0].year))
        .attr("cy", yScale(dataset[0].ceoRealized))
        .attr("r", radius)
        .attr("fill", colors[0])
        .attr("opacity", 0)
        .attr("class", "dot")
    
    ceoLabel.attr("x", xScale(dataset[0].year))
        .attr("y", yScale(dataset[0].ceoRealized) + 27)
        .text("ceo")
        .attr("text-anchor", "middle")
        .attr("fill", colors[0])
        .attr("opacity", 0)
        .attr("class", "small-label")
    
/////////////////////////////////////////////////////////
////2nd Frame
    
  //Data Lines
    workerLineGenerator
        .x(d => xScale(yearAccessor(d)))
        .y(d => yScale(workerIncome(d)))
    workerLine.attr("d", workerLineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", colors[1])
        .attr("stroke-width", 5)
        .attr("opacity", 0.8)
        .attr("opacity", 0)
        .attr("class", "data-line")
    
    ceoLineGenerator
        .x(d => xScale(yearAccessor(d)))
        .y(d => yScale(ceoRealized(d)))
    ceoLine.attr("d", ceoLineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", colors[0])
        .attr("stroke-width", 5)
        .attr("opacity", 0.8)
        .attr("opacity", 0)
        .attr("class", "data-line")
    
  //Line of ratio spread 2018
//    endLine.attr("x1", xScale(dataset[10].year))
//        .attr("x2", xScale(dataset[10].year))
//        .attr("y1", yScale(dataset[10].workerIncome))
//        .attr("y2", yScale(dataset[10].ceoRealized))
//        .attr("stroke", "black")
//        .attr("stroke-width", 2)
//        .attr("stroke-dasharray", "10 7")
//        .attr("opacity", 0)
    
  //Pay amount dots 2018
    workerEndDot.attr("cx", xScale(dataset[10].year))
        .attr("cy", yScale(dataset[10].workerIncome))
        .attr("r", radius)
        .attr("fill", colors[1])
        .attr("opacity", 0)
        .attr("class", "dot")
    
    ceoEndDot.attr("cx", xScale(dataset[10].year))
        .attr("cy", yScale(dataset[10].ceoRealized))
        .attr("r", radius)
        .attr("fill", colors[0])
        .attr("opacity", 0)
        .attr("class", "dot")
    
  //Pay amount labels 2018
    workerEndAmount.attr("x", xScale(dataset[10].year) - 15)
        .attr("y", yScale(dataset[10].workerIncome) + labelYOffset)
        .text(d3.format("$,")(dataset[10].workerIncome))
        .attr("fill", colors[1])
        .attr("class", "amount-label")
        .attr("text-anchor", "end")
        .attr("opacity", 0)
    
    ceoEndAmountBG.attr("x", xScale(dataset[10].year) - 125)
        .attr("y", yScale(dataset[10].ceoRealized) - 28)
        .attr("width", 90)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("opacity", 0)
        .attr("class", "bg")
    ceoEndAmount.attr("x", xScale(dataset[10].year) - 15)
        .attr("y", yScale(dataset[10].ceoRealized) - (labelYOffset / 2))
        .text(d3.format("$,")(dataset[10].ceoRealized))
        .attr("fill", colors[0])
        .attr("class", "amount-label")
        .attr("text-anchor", "end")
        .attr("opacity", 0)
    
  //Ratio line label for 2018
//    let endLabelPosition = yScale(dataset[10].workerIncome) 
//        - ((yScale(dataset[10].workerIncome) 
//            - yScale(dataset[10].ceoRealized)) / 2)
//    
//    endRatioBG.attr("x", xScale(dataset[10].year) - (labelWidth / 2))
//        .attr("y", endLabelPosition - (labelHeight / 2) + 1)
//        .attr("width", labelWidth)
//        .attr("height", labelHeight)
//        .attr("rx", labelHeight / 2)
//        .attr("ry", labelHeight / 2)
//        .attr("stroke-width", 2)
//        .attr("stroke", "white")
//        .attr("opacity", 0)
//        .attr("class", "bg")
//    
//    endRatioLabel.attr("x", xScale(dataset[10].year))
//        .attr("y", endLabelPosition + 8)
//        .text(dataset[10].ceoToWorkerRealized + "x")
//        .attr("class", "ratio-label")
//        .attr("fill", "white")
//        .attr("text-anchor", "middle")
//        .attr("opacity", 0)
    
/////////////////////////////////////////////////////////
////Caption text
    
    captionBox.attr("x", (dimensions.boundedWidth / 2) - 135)
        .attr("y", 148)
        .attr("width", 270)
        .attr("height", 190)
        .attr("rx", labelHeight / 2)
        .attr("ry", labelHeight / 2)
        .attr("class", "caption")
        .attr("stroke-width", 2)
        .attr("stroke", "white")
        .attr("opacity", 0)
        .attr("fill", "#262626")

    caption.attr("x", (dimensions.boundedWidth / 2))
        .attr("y", 180)
        .attr("class", "caption")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
//        .html("In 1965, the average <tspan class='highlight'>CEO</tspan> made nearly 20 times more than the average WORKER")
        //.call(colorHighlight, 'CEO', colors[0])
        .attr("opacity", 0)
    
/////////////////////////////////////////////////////////
////Draw rest of data
    
  //Ratio line label for 1965
//    let startLabelPosition = yScale(dataset[0].workerIncome)
//        + ((yScale(dataset[0].ceoRealized) 
//           - yScale(dataset[0].workerIncome)) / 2)
//    
//    startRatioBG.attr("x", xScale(dataset[0].year) - (labelWidth / 2))
//        .attr("y", startLabelPosition - (labelHeight / 2) + 1)
//        .attr("width", labelWidth)
//        .attr("height", labelHeight)
//        .attr("rx", labelHeight / 2)
//        .attr("ry", labelHeight / 2)
//        .attr("stroke-width", 2)
//        .attr("stroke", "white")
//        .attr("opacity", 0)
//        .attr("class", "bg")
//    
//    startRatioLabel.attr("x", xScale(dataset[0].year))
//        .attr("y", startLabelPosition + 8)
//        .text(dataset[0].ceoToWorkerRealized + "x")
//        .attr("class", "ratio-label")
//        .attr("fill", "white")
//        .attr("text-anchor", "middle")
//        .attr("opacity", 0)
    
  //Pay amount labels 1965
    workerStartAmount.attr("x", 15)
        .attr("y", yScale(dataset[0].workerIncome) + labelYOffset)
        .text(d3.format("$,")(dataset[0].workerIncome))
        .attr("fill", colors[1])
        .attr("class", "amount-label")
        .attr("opacity", 0)
    
    ceoStartAmountBG.attr("x", 15)
        .attr("y", yScale(dataset[0].ceoRealized) - 28)
        .attr("width", 90)
        .attr("height", 18)
        .attr("fill", "white")
        .attr("opacity", 0)
        .attr("class", "bg")
    ceoStartAmount.attr("x", 15)
        .attr("y", yScale(dataset[0].ceoRealized) - (labelYOffset / 2))
        .text(d3.format("$,")(dataset[0].ceoRealized))
        .attr("fill", colors[0])
        .attr("class", "amount-label")
        .attr("opacity", 0)
    
  //Rect to fade background with
    fadeBG.attr("x", - dimensions.margin.left)
        .attr("y", - dimensions.margin.top)
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("fill", "white")
        .attr("opacity", 0)
        .attr("class", "bg")
}
payRatioMain()

/////////////////////////////////////////////////////////
////Initiate progress bar behind button
let progressColor = ["#d1d1d1", "#262626"],
    progressClass = ["progressBehind", "progressFront"],
    progressWidth = 300,
    progressHeight = 40;

//Creates svg for progress bar to live in
const progressBar = d3.select("#progress").append("svg")
    .attr("width", progressWidth)
    .attr("height", progressHeight)

//Creates 2 bars that change width to visualize progress
progressBar.selectAll("rect")
    .data([progressWidth, 0])
    .enter()
    .append("rect")
    .attr("class", function(d,i) {return progressClass[i];})
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", function(d) {return d;})
    .attr("height", progressHeight)
    .attr("fill", function(d,i) {return progressColor[i];})

/////////////////////////////////////////////////////////
////Initiate button
let counter = 1,
    opacityValueBase = 0.8,
    opacityValue = 0.4

let startOver = function(e) {location.reload();}

d3.select("#clicker")
    .on("click", function(e){
    
        //intro
        if(counter === 1) Frame1();
        //start ratio chart
        else if(counter === 2) Frame2();
        //zoom out ratio chart
        else if(counter === 3) Frame3();
        //fade background
        else if(counter === 4) Frame4();
        //start workweek hours chart
        else if(counter === 5) Frame5();
        //finish workweek hours chart
        else if(counter === 6) Frame6();
        //more workweek hours chart
        else if(counter === 7) Frame7();
        //conclusion
        else if(counter === 8) Frame8();
        //start back at beginning
        else if(counter === 9) startOver();

        counter = counter + 1;
    });


















