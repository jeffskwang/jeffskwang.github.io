---
layout: single
permalink: /research/xlm
classes: wide    
---


<html>
<head>
<style>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 10px;
  row-gap: 150px;
  background-color: #2196F3;
}
.grid-cell {
  color: black;
  font-size: 1rem;
  text-align: center;
}
</style>
</head>
<body>
</body>
</html>

## <b>Initial Conditions</b>
I am particularly interested in how the initial topography affects landscape evolution modeling. Typically for initial topographies, modelers start with a flat landscape and then add random, small topographic perturbations.

However, when you deliberately add structure (e.g., a small channel) to the initial topography, its signal is amplified and permanently retained in the landscape as a valley. We call this phenomenon, <b>Extreme Memory</b>. See for yourself; draw your own initial condition in Fig. 2! See more in <a href="https://doi.org/10.1029/2019GL083305"><b>Kwang and Parker (2019)</b></a>.
<figure alt="Initial Conditions" style="width:350px;height:460px" class="align-center">
		<canvas id="myCanvas" width = "350" height ="350"   onmousedown="draw_on(event)" onmouseup = "draw_off(event)" onmousemove = "mouse_loc(event)" onmouseout = "start_sim(event)" onmouseover = "start_draw(event)" style ="border:4px solid #252a34;"></canvas>
		<script src="/assets/js/lem.js" type="text/javascript"></script>
		<figcaption style="text-align:justify">
			<b>Fig. 2</b> Draw your own initial condition!<br />
			<b>Instructions:</b><br/>
			(1) Hold down the mouse and draw an initial channel.<br />
			(2) Move the mouse out of the box to run the model.
		</figcaption>
</figure>

# <b>Experimental Landscapes</b>
We also use small-scale experimental setups (Fig. 3) to study landscape evolution. Instead of rock, the substrate is made of a mixture of fine silica powder and water (and sometimes kaolinite). Instead of rain, precipitation comes in the form of mist. In these experiments, the substrate is either uplifted or the baselevel is lowered at a prescribed rate. Using this setup, mountains and valleys form within a matter of hours.

<figure alt="XLM" style="width:400px;height:500px" class="align-center">
	<img src="/assets/research/xlm_schematic.png">
	<figcaption style="text-align:justify">
		<b>Fig. 3</b> A schematic of the eXperimental Landscape Evolution (XLE) facility at the Saint Anthony Fall Laboratory. I was not the first to run models in this facility; please check out: 
		<a href="https://doi.org/10.1002/2014WR016223"><b>Reinhardt and Ellis, 2015</b></a>;
		<a href="https://doi.org/10.1002/2015WR017161"><b>Singh et al., 2015</b></a>;
		<a href="https://doi.org/10.1126/science.aab0017"><b>Sweeney et al., 2015</b></a>; and
		<a href="https://doi.org/10.1126/sciadv.1701683"><b>Tejedor et al., 2017</b></a>.
	</figcaption>
</figure>

In our paper <a href="https://doi.org/10.1029/2019GL083305"><b>(Kwang and Parker, 2019)</b></a>, we drew initial channels in both numerical landscape evolution models (like Fig. 2) and physical experimental landscapes. While numerical landscapes evolved to retain signals of their initial conditions, experimental landscapes persistently reorganize to forget them. In our experiments, we observed lateral shifting of the channels that drove ridge migration, drainage capture, and stream capture.

<figure alt="XLM_movie" style="width:500px;height:500px" class="align-center">
	<video width="500" height="500" style="display: block;margin: auto;" controls>
		<source src="/assets/research/dem_animated.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video> 
<figcaption><b>Fig. 4</b> Movie of experimental landscape evolution.</figcaption>
</figure>