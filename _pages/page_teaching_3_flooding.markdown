---
layout: single
permalink: /teaching/flooding/
classes: wide
---

<html>
<head>
<style>
	 ul.parameters {
			 -webkit-column-count: 3;
			 -moz-column-count: 3;
			 -o-column-count: 3;
			  column-count: 3; 
			  border:2px solid #808080;
  			padding-left: 10px;
      }
	 ul.bc {
			 -webkit-column-count: 3;
			 -moz-column-count: 3;
			 -o-column-count: 3;
			  column-count: 2; 
      }
</style>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
  MathJax = {
    tex: {
      inlineMath: [['$', '$']]
    }
  };
</script>

<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
</style>
</head>
<body>
<b>Disclaimer</b>: This teaching lecture is meant to supplement two 1-hr lectures for the <a href="https://www.ywcampls.org/girls-inc-eureka">Eureka!</a> program.
<br>
<br>
<h1><b><span>Flooding on the Mississippi in St. Paul, MN</span></b></h1>
	<p style="text-align:justify">In late June 2024, the Mississippi River reached flows of 115,000 cubic feet per second. Below is a timelapse of the Mississippi River near St. Paul that was taken from a USGS river gage from June 23rd to July 7th, 2024. If you would like to see more images, click this <a href="https://apps.usgs.gov/hivis/camera/MN_Mississippi_River_at_St_Paul">link</a>.</p>

{% include video id="X0YyIFIt7Cg" provider="youtube" %}

<p style="text-align:justify">The flood peaked at 4:00 AM on Saturday June 29th, 2024; this is when the flood reached its highest height. For rivers, we call the height of the water the <b><i>gage height</i></b>. Using the <a href="https://fim.wim.usgs.gov/fim/?site_no=05331000">Flood Inundation Mapper</a>, estimate the peak height of the river by adjusting the gage height until it matches the flooded area in the video.</p>
</body> 

<h1><b><span>What is a 100-yr Flood?</span></b></h1>
	<p style="text-align:justify">A flow of 115,000 cubic feet per second corresponds to a ~18-yr flood. Meaning, there is a 1-in-18 chance that this flow or higher will occur in the river near St. Paul. That means a 100-yr flood is a flood that has a 1-in-100 chance to occur. Below is a graph of the highest flood for each year of record. On the y-axis, each flood corresponds to a different #-yr flood.</p>

<figure alt="flood frequency analysis" style="width:500px;height:550px" class="align-center">
	<img src="/assets/svgs/ffc.svg">
	<figcaption style="text-align:center"><b>Flood frequency analysis</b>: Larger floods are more rare and therefore have a larger reccurence interval.</figcaption>
</figure>

<h1><b><span>Simulating Floods</span></b></h1>
	<p style="text-align:justify">Simulating floods is just like a game of chance. We will use a random number generator, to select the highest flow of the year. Below, we will simulate annual flooding on a hypothetical river by hitting the big red button. We will view the river's cross-section, which is just a slice image that we take across the river.</p>

<figure alt="river_xs" style="width:600px;height:350px" class="align-center">
	<img src="/assets/images/river_xs.jpg">
	<figcaption style="text-align:center"><b>River Cross-Section</b>: This is a slice of the across a river.</figcaption>
</figure>

<figure alt="FloodModel" style="width:1000px;height:450px"  class="align-left">
	<div id="svg-container"></div>
	<figcaption style="text-align:center"><b>Click the big red button!</b>: This will randomly pick an annual flood.</figcaption>
</figure>
</html>

<script>

    const flood_rgb = "#1f77b4"

	d3.xml("/assets/svgs/xs.svg").then(function(data) {
    const svg_node= document.getElementById("svg-container").appendChild(data.documentElement);
	
	const svg_plot = d3.select(svg_node)
    
	let previous_flow = 1;
	let mode = 0;
	var pg_list = document.querySelectorAll('[id^="pg_"]');

	function click(event) {
        if (event.currentTarget.id.startsWith("MODE")){
			if (mode == 0){
				mode = 1;
				for (let i = 0; i < pg_list.length; i++) {
					pg_inv_num_round = pg_list[i].id.slice(3);
					d3.select("#pg_" + pg_inv_num_round).selectAll("path")
						.style("stroke-opacity", 1.0);
					}
				}
			else if (mode == 1){
				mode = 0;
				for (let i = 0; i < pg_list.length; i++) {
					pg_inv_num_round = pg_list[i].id.slice(3);
					d3.select("#pg_" + pg_inv_num_round).selectAll("path")
						.style("stroke-opacity", 0.0);
					d3.select("#wreck_pg_" + pg_inv_num_round).selectAll("path")
						.style("stroke-opacity", 0.0);
					}
				}
			}
        if (event.currentTarget.id.startsWith("BUTTON")){
			d3.select("#flood_" + previous_flow).selectAll("path")
				.style("fill", flood_rgb)
				.style("opacity", 0.0);

			var num = Math.random();
			var inv_num = 1.0 / num;
			if (inv_num > 10000){inv_num = 10000}
			var inv_num_round = Math.round(inv_num);

			var P = 10000.0 / inv_num_round;
			var P_round =  Math.round(P) / 100.;
			var H = Math.pow(((10000. + 32656.25 * Math.log10(inv_num_round)) / 156.25), 1.0 / 2.0)
			var H_round =  Math.round(H*10.) / 10.;

			d3.select("#flood_" + inv_num_round.toString()).selectAll("path")
				.style("fill", flood_rgb)
				.style("opacity", 1.0);

			d3.select("#Reccu_Val").selectAll("text")
				.text(inv_num_round.toString() + "-yr flood")
                .style("opacity",1);
			d3.select("#Proba_Val").selectAll("text")
				.text(P_round.toString() + "%")
                .style("opacity",1);
			d3.select("#Stage_Val").selectAll("text")
				.text(H_round.toString() + " ft")
                .style("opacity",1);

			if (mode == 1){
				for (let i = 0; i < pg_list.length; i++) {
					pg_inv_num_round = pg_list[i].id.slice(3);
					if (inv_num_round >= pg_inv_num_round){
						d3.select("#pg_" + pg_inv_num_round).selectAll("path")
							.style("stroke-opacity", 0.0);
						d3.select("#wreck_pg_" + pg_inv_num_round).selectAll("path")
							.style("stroke-opacity", 1.0);
						}
					else {
						d3.select("#pg_" + pg_inv_num_round).selectAll("path")
							.style("stroke-opacity", 1.0);
						d3.select("#wreck_pg_" + pg_inv_num_round).selectAll("path")
							.style("stroke-opacity", 0.0);
						}
					}
				}
			previous_flow = inv_num_round.toString();
		}
    }

	svg_plot.selectAll("g")
		.on("click", (event) => click(event))

	}).catch(function(error) {
    console.error(error);
	});


</script>


