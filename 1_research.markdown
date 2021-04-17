---
layout: page
title: My Research
permalink: /research/
---
<html>
<head>
<style>
</style>
</head>
<body>


<h1><b>Landscape Evolution Modeling </b></h1>
	<p style="text-align:justify">
		I study how landscapes respond to climate and tectonics using numerical models, named landscape evolution models. In these models, rock is introduced into the landscape by rock uplift and eroded away by river erosion. These mechanisms interact to create a mountainous landform that is dissected by a network of rivers (Fig. 1). I use these models to understand how river networks develop and reorganize.
	</p>

	<figure>
		<video width="740" height="287" controls>
			<source src="/assets/research/lem.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption><b>Fig. 1</b> Movie of a landscape evolution simulation.</figcaption>
	</figure>

<br />
<br />

<h1><b>Initial Conditions</b>
	<figure style="float: right;margin-left:15px;float:right;padding-left:20px;">
			<canvas id="myCanvas" width = "350" height ="350" onmousedown="draw_on(event)" onmouseup = "draw_off(event)" onmousemove = "mouse_loc(event)" onmouseout = "start_sim(event)" onmouseover = "start_draw(event)" style ="border:4px solid #ededed;"></canvas>
			<script src="/assets/js/lem.js" type="text/javascript"></script>
			
			<figcaption style="text-align:justify">
				<b>Fig. 2</b> Draw your own initial condition!<br />
				<b>Instructions:</b><br />
				(1) Hold down the mouse and draw an initial channel.<br />
				(2) Move the mouse out of the box to run the model.
			</figcaption>
	</figure>
</h1>

	<p style="text-align:justify">
		I am particularly interested in how the initial topography affects landscape evolution modeling. Typically for initial topographies, modelers start with a flat landscape and then add random, small topographic perturbations.
	<br />
	<br />
		However, when you deliberately add structure (e.g., a small channel) to the initial topography, its signal is amplified and permanently retained in the landscape as a valley. We call this phenomenon, <b><i>Extreme Memory</i></b>. See for yourself; draw your own initial condition in Fig. 2!
	<br />
	<br /> 
		See more in <a href="https://doi.org/10.1029/2019GL083305"><b>Kwang and Parker, 2019</b></a>.
	</p>

<br /> 
<br />
<br /> 
<br />


<h1><b>Experimental Landscapes</b>
	<figure alt="Grid" style="width:300px;height:300px;margin-right:15px;float:left;padding-right:20px;padding-bottom:170px">
		<img src="/assets/research/xlm_schematic.png">
		<figcaption style="text-align:justify">
			<b>Fig. 3</b> A schematic of the eXperimental Landscape Evolution (XLE) facility at the Saint Anthony Fall Laboratory. I was not the first to run models in this facility; please check out: 
			<a href="https://doi.org/10.1002/2014WR016223"><b>Reinhardt and Ellis, 2015</b></a>;
			<a href="https://doi.org/10.1002/2015WR017161"><b>Singh et al., 2015</b></a>;
			<a href="https://doi.org/10.1126/science.aab0017"><b>Sweeney et al., 2015</b></a>; and
			<a href="https://doi.org/10.1126/sciadv.1701683"><b>Tejedor et al., 2017</b></a>.
		</figcaption>
</figure>
</h1>
	<p style="text-align:justify">
		also use small-scale experimental setups (Fig. 3) to study landscape evolution. Instead of rock, the substrate is made of a mixture of fine silica powder and water (and sometimes kaolinite). Instead of rain, precipitation comes in the form of mist. In these experiments, the substrate is either uplifted or the baselevel is lowered at a prescribed rate. Using this setup, mountains and valleys form within a matter of hours.
	<br />
	<br /> 
		In <a href="https://doi.org/10.1029/2019GL083305"><b>Kwang and Parker, 2019</b></a>, we drew initial channels in both numerical landscape evolution models (like Fig. 2) and physical experimental landscapes. While numerical landscapes evolved to retain signals of their initial conditions, experimental landscapes persistently reorganize to forget them. In our experiments, we observed lateral shifting of the channels that drove ridge migration, drainage capture, and stream capture.
	</p>
	<figure style="width:500px;height:500px;display: block;margin: auto;">
		<video controls>
			<source src="/assets/research/dem_animated.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
	<figcaption><b>Fig. 4</b> Movie of experimental landscape evolution.</figcaption>
	</figure>
	
<br /> 
<br /> 
<br /> 

<h1><b>The Role of Lateral Migration in Landscape Evolution</b></h1>

</body>
</html>



