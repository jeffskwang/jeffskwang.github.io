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

<p style="text-align:justify">The flood peaked at 4:00 AM on Saturday June 29, 2024; this is when the flood reached its highest height. For rivers, we call the height of the water the <b><i>gage height</i></b>. Using the <a href="https://fim.wim.usgs.gov/fim/?site_no=05331000">Flood Inundation Mapper</a>, estimate the peak height of the river by adjusting the gage height until it matches the flooded area in the video.</p>
</body> 

<figure alt="FloodModel" style="width:1000px;height:450px"  class="align-left">
	<div id="svg-container"></div>
	<figcaption style="text-align:center"><b>Click the big red button!</b>: This will randomly pick a river flow.</figcaption>
</figure>

<h1><b><span>What is the 100-yr Flood?</span></b></h1>
	<p style="text-align:justify">The flow of 115,000 cubic feet per second corresponds to a ~18-yr flood. Meaning, there is a 1-in-18 chance that this flow or higher will occur in the river near Saint Paul. So that means a 100-yr flood is a flood that has a 1-in-100 chance to occur.</p>



<h2><b> Design your own USGS Keychain. Note: This is only availible for the Eureka! 2024 workshop participants. Code will be shared in the future to design your own.</b> <a href="https://forms.gle/pf4Fbo3AEwCjwnXq8">Google Form</a>.</h2>



</html>


<script>

    const flood_rgb = "#1f77b4"

	d3.xml("/assets/svgs/xs.svg").then(function(data) {
    const svg_node= document.getElementById("svg-container").appendChild(data.documentElement);
	
	const svg_plot = d3.select(svg_node)
    
	let previous_flow = 1;

	function click(event) {
		console.log(previous_flow)
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


			previous_flow = inv_num_round.toString();
		}
    }

	svg_plot.selectAll("g")
		.on("click", (event) => click(event))

	}).catch(function(error) {
    console.error(error);
	});


</script>


