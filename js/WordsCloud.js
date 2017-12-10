
var layout;
function X(dataset){

//alert("aaaa")
 var format_number = d3.format(".3");  //保留3位小数

 layout = d3.layout.cloud()
    .size([500, 350])
    .words(dataset.map(function(d) {
       return {text: d.url, size: Math.floor(format_number(Math.log10(d.mounts))*10)};
     }))//
    .padding(1)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

    layout.start();

}

//console.log(words);

function draw(words) {

  var fill = d3.scaleOrdinal(d3.schemeCategory20c);

  d3.select("#wordcloud").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + (layout.size()[0] / 2 + 30) + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) {
       return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });


}