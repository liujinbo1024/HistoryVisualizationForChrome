function daytime(data) {

    var hours = new Array(25).join(Number(0)).split('');

    for (var i=0;i<data.length;i++){
        var temp = String(data[i].lastVisitTime).split("/")[3].split(":");
        //console.log( data[i].lastVisitTime);
        var hour = temp[0];
        if (hour[0]=='A')
            hour =Number(hour.substring(2,hour.length));
        else
            hour = (Number(hour.substring(2,hour.length))+12)%24;

        hours[hour]=Number(hours[hour])+Number(data[i].visitCount);
    }

    var temp_time=new Array(7).join(Number(0)).split('');

    for(var j=0;j<25;j++){
        var nums=0;
        nums= Number(hours[j]);

        if(j>=1 && j<7){
            temp_time[0] =nums+Number(temp_time[0]);
        }
        else if(j>=7 && j<12){
            temp_time[1] = nums+Number(temp_time[1]);
        }
        else if(j>=12 && j<14){
            temp_time[2] = nums+Number(temp_time[2]);
        }
        else if(j>=14 && j<17){
            temp_time[3] = nums+Number(temp_time[3]);
        }
        else if(j>=17 && j<19){
            temp_time[4] = nums+Number(temp_time[4]);
        }
        else if(j>=19 && j<=23){
            temp_time[5] = nums+Number(temp_time[5]);
        }
    }

    //console.log(temp_time);
    var day_section=new Array();
    var section={};
    section.section = "midnight";
    section.times = temp_time[0];
    day_section.push(section);
    section={};
    section.section = "morning";
    section.times = temp_time[1];
    day_section.push(section);
    section={};
    section.section = "noon";
    section.times = temp_time[2];
    day_section.push(section);
    section={};
    section.section = "afternoon";
    section.times = temp_time[3];
    day_section.push(section);
    section={};
    section.section = "evening";
    section.times = temp_time[4];
    day_section.push(section);
    section={};
    section.section = "night";
    section.times = temp_time[5];
    day_section.push(section);

    //console.log(day_section);

//-------------------------------------------------------------------------------


 var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.4 * radius;

    var svg=d3.select("#daytime")
                .append("svg")
                .attr("width",500)
                .attr("height",350)
                .attr("transform", "translate(" + 90 + "," + 0 + ")");

    //svg.selectAll("g").remove();

        var x=d3.scaleLinear()
                  .domain([d3.min(day_section,function(d){return d.times;}),
                        d3.max(day_section,function(d){return d.times;})])
                  .range([5,70]);

     day_section.forEach(function(d,i) {
        // console.log(d);
         d.yuannlai=d.times;
         d.times=x(d.times);
         d.sort=i;
    });


    var pie=d3.pie()
            .sort(comparex)
            .value(function(d,i){return d.times;});


 var comparex = function (val1, val2)
                  {

                          if (val1.sort < val2.sort) {
                              return -1;
                          } else if (val1.sort > val2.sort) {

                              return 1;
                          } else {
                              return 0;
                          }
                   }


    console.log(day_section);

    var arc=d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(function (d) {
    return ((innerRadius) * (d.data.times / 50.0) + innerRadius);
  });


    var color = d3.scaleOrdinal(d3.schemeCategory20c);



   // console.log(day_section);
    var arcs=svg.selectAll("g")
                    .data(pie(day_section))
                    .enter()
                    .append("g")
                    .attr("transform","translate("+(350/2-30)+","+(350/2)+")");

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
              .style("left", d3.event.pageX - 40 + "px")
              .style("top", d3.event.pageY - 80 + "px")
              .style("display", "inline-block")
               .html(d.data.section+"<br>"+d.data.yuannlai);
              })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill",color(i));
                    tooltip.style("display", "none");

                });

            //console.log(day_section);
        var biaozhi=d3.select("#daytime").select("svg")
                      .append("g")
                      .attr("class","biaozhi")
                      .attr("fill", "none")
                      .attr("stroke", "#ccc")
                      .selectAll("rect")
                      .data(day_section)
                      .enter()
                      .append("rect")
                      .attr("width",20)
                      .attr("height",20)
                      .attr("fill",function(d,i){
                        return color(i);
                      })
                      .attr("x", 310)
                      .attr("y",function(d,i){return i*25+80;});


        var liangjiText=d3.select(".biaozhi")
                            .selectAll("text")
                            .data(day_section)
                            .enter()
                            .append("text")
                            .text(function(d){
                              return d.section;
                            })
                            .style("stroke-width",1)
                            .style("stroke",function(d,i){
                        return color(i);
                      })
                            .style("font-size",12)
                            .attr("x", 335)
                            .attr("y",function(d,i){return i*25+93;});


        d3.select(".biaozhi").append("text")
                            .text("Time Of Day")
                            .style("stroke-width",1)
                            .style("stroke" ,"black")
                            .style("font-size",12)
                            .attr("x", 310)
                            .attr("y",70);



        return day_section;
}
