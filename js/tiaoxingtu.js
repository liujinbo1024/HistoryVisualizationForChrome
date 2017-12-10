function tiaoxingtu(d)
{

    var data= [];
    data = d;

	  d3.select("#Hourchart").remove();
      d3.select("#Weekchart").remove();
      d3.select("#Monthchart").remove();

		 var x=d3.timeFormat("%a");
		 
		 	var hours = new Array(25).join(Number(0)).split('');
		 	var weeks = new Array(8).join(Number(0)).split('');
		 	var days = new Array(33).join(Number(0)).split('');

		 	for (var i=0;i<data.length;i++)
		 	{
		 		var temp = String(data[i].lastVisitTime).split("/")[3].split(":");
		 		//console.log( data[i].lastVisitTime);
		 		var hour = temp[0];
		 		if (hour[0]=='A')
		 			hour =Number(hour.substring(2,hour.length));
		 		else 
		 			hour = (Number(hour.substring(2,hour.length))+12)%24;

		 		hours[hour]=Number(hours[hour])+Number(data[i].visitCount);
//-------------------------------------------------------------------------------
				var temp2 = data[i].lastVisitTime.split("/");

				var week=x(new Date(temp2[0],temp2[1],temp2[2]));
				var times;
				switch (week)
				{
					case "Mon": times=1; break;
					case "Tue": times=2;break;
					case "Wed": times=3;break;
					case "Thu": times=4;break;
					case "Fri": times=5;break;
					case "Sat": times=6;break;
					case "Sun": times=0;break;
				}

				weeks[times]=Number(weeks[times])+Number(data[i].visitCount);

//-------------------------------------------------------------------------------
				var temp3=data[i].lastVisitTime.split("/")[2];
				days[temp3]=Number(days[temp3])+Number(data[i].visitCount);
		 	}
		 	console.log(hours);
		 	console.log(weeks);
		 	console.log(days);
		 	draw(hours,"Hourchart");
 			draw(weeks,"Weekchart");
 			draw(days,"Monthchart");



 	function draw(dataset,AimSvg)
   	{
		   var padding={top:20,right:30,bottom:20,left:40};
		    var rectWidth=15;
		    var width=600;
		    var height=150;


		    var svg=d3.select("#zzchart")
		    			.append("svg")
		    			.attr("id",AimSvg)
		                .attr("width",width)
		                .attr("height",height);

		    svg.append("text")
		    		.text(function(){
		    			if (AimSvg=="Hourchart") return "Time of Day";
		    			else if (AimSvg=="Weekchart")  return "Day of Week";
		    			else return "Day of Month";
		    		})
		    		.attr("font-size","15px")
		    		.attr("transform","translate("+45+","+15+")");


		    var xAxisWidth=550;
		    var yAxisWidth=120;
		    var jiange = ((xAxisWidth-dataset.length*rectWidth)/dataset.length)+padding.left;

		    if (AimSvg=="Weekchart")
					jiange-=36;

					d3.scaleTime()
   	 		.domain([new Date(2017, 5, 7), new Date(2017, 7, 16)])
   		 	.range([0, xAxisWidth])
      		.clamp(true);
		    var xScale=d3.scaleBand()
		                        .domain(d3.range(dataset.length))
		                        .range([0,xAxisWidth])
		                        .round(true);

		    var yScale = d3.scaleLinear()
		                        .domain([0,d3.max(dataset)])
		                        .range([0,yAxisWidth]);                   

			var tooltip = d3.select("body").append("div").attr("class", "toolTip");
		    var rect=svg.selectAll("rect")
		                                .data(dataset)
		                                .enter()
		                                .append("rect")
		                                .attr("fill","rgb(107, 174, 214)")
		                                .attr("x",function(d,i){
		                                    return jiange+xScale(i);
		                                })
		                                .attr("y",function(d,i){
		                                    return height-padding.bottom-yScale(d);
		                                })
		                                .attr("width",rectWidth)
		                                .attr("height",function(d){
		                                    return yScale(d);
		                                })
								        .on('mouseover', function (d){
								        	 d3.select(this)
		                                            .transition()
		                                            .duration(500)
		                                            .attr("fill","rgb(253, 141, 60)");


								            tooltip
								              .style("left", d3.event.pageX-40 + "px")
								              .style("top", d3.event.pageY -80+ "px")
								              .style("display", "inline-block")
								      				.html(d);
								            })
								    		.on("mouseout", function(d){ 
 											 d3.select(this)
		                                        .transition()
		                                        .duration(500)
		                                        .attr("fill","rgb(107, 174, 214)")

								    			tooltip.style("display", "none");
								    	});

		     function Texttransform (y){
		     		if (AimSvg=="Hourchart") return y-140;
		     		else if (AimSvg=="Weekchart") return y-300;
		     		else return y-450;
		     }                         

		    var xAxis=d3.axisBottom(xScale);


		    yScale.range([yAxisWidth,0]);

		    var yAxis=d3.axisLeft(yScale)
		    				.ticks(5);

		    svg.append("g").attr("class","axis")
		                    .attr("transform","translate("+padding.left+","+
		                        (height-padding.bottom)+")")
		                         .call(xAxis);;
		    

		    svg.append("g").attr("class","axis")
		                    .attr("transform","translate("+padding.left+","+
		                        (height-yAxisWidth-padding.top)+")")
		                    .call(yAxis);
		    
		   var s=svg.selectAll(".axis").selectAll(".line")
		   						.attr("fill","none");

		 //console.log(s);
		}

}