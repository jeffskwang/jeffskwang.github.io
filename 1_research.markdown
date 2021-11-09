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


<h1><b>Landscape Evolution Modeling</b></h1>
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
		We also use small-scale experimental setups (Fig. 3) to study landscape evolution. Instead of rock, the substrate is made of a mixture of fine silica powder and water (and sometimes kaolinite). Instead of rain, precipitation comes in the form of mist. In these experiments, the substrate is either uplifted or the baselevel is lowered at a prescribed rate. Using this setup, mountains and valleys form within a matter of hours.
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

<br /> 
<br />
<br /> 

<h1><b>Agricultural Landscape Evolution</b></h1>
	<figure alt="Grid" style="width:320px;height:180px;margin-right:15px;float:left;padding-right:20px;padding-bottom:10px">
			<img src="https://get.pxhere.com/photo/tractor-field-farm-vehicle-crop-soil-dust-agriculture-dusty-ploughing-plough-historically-harvester-arable-working-machine-rural-area-plow-agricultural-machinery-agricultural-tractor-tillage-grass-family-485893.jpg">
			<figcaption style="text-align:justify">
				<b>Fig. 5</b> Tillage erosion. <a href="https://pxhere.com/en/photo/485893"><b>Stock Image Source</b></a> 
			</figcaption>
	</figure>

	<p style="text-align:justify">
		Tillage (Fig. 5) is used by farmer to prepare soil for growing crops. When the tractors drive their plows across the field, the soil is moved from high elevations to low elevation, causing a diffusional effect. This diffusional effect has also been studied in natural hillslopes <a href="https://doi.org/10.1029/97WR00534"><b>Fernandes and Dietrich, 1997</b></a>. However, coefficient of diffusion are estimated to be ~2 orders of magnitude larger than coefficients that describe natural processes.
	<figure alt="Grid" style="width:600px;height:640px;margin: auto;">
		<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8027.5579790089405!2d-93.50810374698656!3d42.988135492990835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1636490024748!5m2!1sen!2sus" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
		<figcaption style="text-align:justify">
			<b>Fig. 6</b> Aerial image of an agricultural field. 
		</figcaption>
	</figure>
		Remote sensing (Fig. 6) of agricultural fields reveals a consistent pattern where light soils are located on hilltops and dark soils are located in hollows (topographic lows). Lighter materials are associated with carbon-poor soils and darker materials are associated with carbon-rich soils <a href="https://doi.org/10.2136/sssaj2018.09.0318"><b>Thaler et al., 2019</b></a>. If you were to dig a hole in natural landscapes, you would typically find carbon-rich soils at the surface and more carbon-poor soils as you dig deeper (about 30-50 cm). Therefore, exposed carbon-poor soils on hilltops suggest significant soil erosion. By combining a submodel that simuates how tillage mixes soil, we can use a landscape evolution model to simulate and reproduce patterns of soil carbon (Fig. 7). Interative model to come!		
	</p>

	<figure>
		<video width="740" height="444" controls>
			<source src="/assets/research/tillage.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
	<figcaption><b>Fig. 7</b> Simulation of landscape and soil organic carbon evolution due to tillage erosion.</figcaption>
	</figure>
	
<!---meow--->
<br /> 
<br /> 
<br />
 
</body>
</html>



