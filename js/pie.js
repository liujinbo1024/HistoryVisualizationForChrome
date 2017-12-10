function piecharts(data,top) {

   // console.log(data);
    var d=data.slice(0,data.length);
  //  console.log(d);

    var compare = function (obj1, obj2) {
    var val1 = obj1.url;
    var val2 = obj2.url;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }            
} 

    d.sort(compare);
   // console.log(d);
    var history=new Array(); 

    var count=0;
    var Nowurl=d[0].url;

    history[count]=new Object();
    history[count].url=Nowurl;
    history[count].mounts=d[0].visitCount;

   // console.log(history);

    for (var i=1;i<d.length;i++)
    {
        if (Nowurl==d[i].url)
        {
          history[count].mounts+=d[i].visitCount;
                //  console.log(history);
        }
        else
        {
          count++;
          Nowurl=d[i].url;
          history[count]=new Object();
          history[count].url=Nowurl;
          history[count].mounts=d[0].visitCount;

                  //console.log(history);
        }

    }

    var compare2 = function (obj1, obj2) {
    var val1 = obj1.mounts;
    var val2 = obj2.mounts;
    if (val1 > val2) {
        return -1;
    } else if (val1 < val2) {
        return 1;
    } else {
        return 0;
    }            
};

    history.sort(compare2);

/*    for (var i=0;i<history.length;i++)
        console.log(history[i]);
   console.log("------------------------------------------------");*/

    var history=history.splice(0,top);


    console.log(history); 

    var width=400;
    var height=460;
   
    var svg=d3.select("#Piesvg")
                .attr("width",width)
                .attr("height",height);

    svg.selectAll("g").remove(); 


	var pie=d3.pie().value(function(d,i){return d.mounts;});

    var piedata=pie(history);

    console.log(piedata);

    var outerRadius=width/3;
    var innerRadius=outerRadius;

    var arc=d3.arc()
                    .innerRadius(innerRadius/2)
                    .outerRadius(outerRadius);

    var color = d3.scaleOrdinal(d3.schemeCategory20c);

    var arcs=svg.selectAll("g")
                    .data(piedata)
                    .enter()
                    .append("g")
                    .attr("transform","translate("+(width/2)+","+(height/2-height/8)+")");
var tooltip = d3.select("body").append("div").attr("class", "toolTip");


    arcs.append("path")
        .attr("fill",function(d,i){
            return color(i);
        })

        .attr("d",function(d){
            return arc(d);
        })
        .on("mouseover",function(d,i){
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .attr("fill","#c2b7b7");
                tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
                    .html(d.data.url+"<br>"+d.value);
              })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill",color(i));
                    tooltip.style("display", "none");

                });




    arcs.append("text")
         .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
        .attr("text-anchor","middle")
        .text(function(d,i){
            var percent=Number(d.value)/d3.sum(history,function(d,i){return d.mounts;})*100;
            if (percent>3)
            return percent.toFixed(0)+"%";
        });


/*        arcs.append("text")
                .attr("transform",function(d){
                    var x = arc.centroid(d)[0]*1.7;
                    var y = arc.centroid(d)[1]*1.7;
                    return "translate("+x+","+y+")";
                })
                .attr("text-anchor","middle")
                .text(function(d,i){
                    var percent=Number(d.value)/d3.sum(history,function(d,i){return d.mounts;})*100;
                          if (percent>5)
                    return d.data.url;
                })*/

                var right=piedata.splice(0,5);
                var left = piedata.splice(0,5);
                console.log(right);

        var biaozhi=d3.select("#Piesvg")
                      .append("g")
                      .attr("class","biaozhi")
                      .attr("fill", "none")
                      .attr("stroke", "#ccc")
                      .selectAll("rect")
                       .data(right)
                      .enter()
                      .append("rect")
                      .attr("width",20)
                      .attr("height",20)
                      .attr("fill",function(d,i){
                        return color(i);
                      })
                      .attr("x", 10)
                      .attr("y",function(d,i){return i*25+330;});

         var liangjiText=d3.select(".biaozhi")
                            .selectAll("text")
                            .data(right)
                            .enter()
                            .append("text")
                            .text(function(d){
                              return d.data.url;
                            })
                            .style("stroke-width",1)
                            .style("stroke",function(d,i){
                        return color(i);
                      })
                            .style("font-size",12)
                             .attr("x", 40)
                      .attr("y",function(d,i){return i*25+345;});

var biaozhix=d3.select("#Piesvg")
                      .append("g")
                      .attr("class","biaozhix")
                      .attr("fill", "none")
                      .attr("stroke", "#ccc")
                      .selectAll("rect")
                       .data(left)
                      .enter()
                      .append("rect")
                      .attr("width",20)
                      .attr("height",20)
                      .attr("fill",function(d,i){
                        return color(i+5);
                      })
                      .attr("x", 240)
                      .attr("y",function(d,i){return i*25+330;});

         var liangjiTextx=d3.select(".biaozhix")
                            .selectAll("text")
                            .data(left)
                            .enter()
                            .append("text")
                            .text(function(d){
                              return d.data.url;
                            })
                            .style("stroke-width",1)
                            .style("stroke",function(d,i){
                        return color(i+5);
                      })
                            .style("font-size",12)
                             .attr("x", 270)
                      .attr("y",function(d,i){return i*25+345;});

                 d3.select("#Piesvg")
                            .append("text")
                            .text("Top 10 websites")
                            .attr("font-size","15px")
                             .attr("x", 10)
                             .attr("y",20);


            function angle(d) {
                var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                return a > 90 ? a - 180 : a;
              }
}

