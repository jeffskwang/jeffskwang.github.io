---
layout: page
title: Hillslopes
permalink: /diffuse/
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
<script type="text/javascript" id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>
<script>
  MathJax = {
    tex: {
      inlineMath: [['$', '$']]
    }
  };
</script>
</head>
<body>
</body>

<h2><b>Learning Goals</b></h2>
 <ol>
  <li>Review the main components of landscape evolution models</li>
  <li>Understand basic concepts for running numerical models</li>
  <li>Determine how geomorphic processes interact with interactive models</li>
  <li>Introduce the concept of dynamic equilibrium in landscape evolution models</li>
	</ol> 
<br>

<h1><b><span style="color:green;">Hillslope Processes</span></b></h1>

	<figure alt="Diffusion" style="width:200px;height:450px;float:right;padding-top:0px;padding-bottom:90px;padding-left:30px">
		<img src="/assets/research/diffusion_triple.gif" alt="diffusion" style="width:200px;height:450px">
		<figcaption style="text-align:justify"><b>Fig. 4</b>: 1D profile view of hillslope diffusion using different values of $D$.</figcaption>
	</figure>

	<p style="text-align:justify">Hillslope processes in landscape evolution models are simulated using a <b>hillslope diffusion model</b> [Eqn. 4].</p>

	<p style="font-size:150%;margin-left:25px">[4] $\frac{\partial \eta}{\partial t} = D\nabla^2\eta$</p>

	<p style="text-align:justify">$D$ determines the rate of hillslope diffusion [Fig. 4]. It models soil movement via:</p>
		<ul style="margin-left:75px">
			<li>rainsplash</li> 
			<li>bioturbation</li> 
			<li>freeze-thaw processes</li>
			<li>creep</li>
			<li>agricultural tillage</li>
		</ul>

	<p style="text-align:justify">What is <span title="Laplacian of elevation" style="color:gray;">$\nabla^2\eta$</span>? It is a symbol that represents the sum of second derivatives in the x and y direction, i.e., $\nabla^2\eta = \left(\frac{\partial^2\eta}{\partial x^2}\right) + \left(\frac{\partial^2\eta}{\partial y^2}\right)$. Remember from your calculus class that the 2nd derivative represents the slope of slope? We call $\nabla^2\eta$, <b>topographic curvature</b>.</p>

	<ul class="parameters"  style="list-style: none;margin-right:200px;margin-left:0px">
		<li><b>Parameter</b></li>
	  <li>$D$</li>
	  <li>$\nabla^2\eta$</li>

	  <li><b>Unit</b></li>
	  <li>[$\frac{L^2}{T}$]</li>
	  <li>[$\frac{1}{L}$]</li>

		<li><b>Description</b></li>
	  <li>diffusion coefficient</li>
	  <li>curvature</li>
	</ul> 
	
	<figure>
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/hillslope.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="margin:0px 70px 0px 70px;text-align:justify"><b>Fig. 5</b>: Previously uplifted and fluvial eroded landscape subjected to <b>hilllslope processes only</b>. $D$ = 0.2 m<sup>2</sup>&frasl;yr. A relatively high $D$ value is used for illustration. Vertical exaggeration = 2.0; 1 sec = 50 kyr.</figcaption>
	</figure>
<br>

<h2><b>Local Hillslope Diffusion Model</b></h2>

	<b>Physical Parameters</b>
		<div class="slidecontainer">
		  <input type="range" min="-8" max="-4" value="-6" class="slider" id="d_Range">
			<b><i>D</i></b> = <span id="d_output"></span> m<sup>2</sup>&frasl;yr
		</div>

<figure style="text-align:left;">
	<canvas id="DiffuseCanvas" width="450" height="450"  style="display: block;margin: auto;" onmousedown="mouse_down(event)" onmouseup = "mouse_up(event)" onmousemove = "rain_loc(event)" onmouseout = "mouse_up(event)"></canvas>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js" type="text/javascript"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.11/jquery.csv.js" type="text/javascript"></script>
	<script src="/assets/js/diffuse_TroutCreek.js" type="text/javascript"></script>
	Low $\eta$ <img src="/assets/images/viridis.png" style = "width: 300px;height:10p;display: inline-block"> High $\eta$ <br><br>
	<figcaption style="text-align:justify">

		<b>Instructions:</b><br/>
		<ol>
			<li>Press "Start Model" to start the simulation.</li>
			<li>Change number of columns and rows to change the domain size. (Warning: Too many cells will be slow!)</li>
			<li>Select which boundaries you want to be open.</li>
			<li>Adjust the <i>hillslope diffusion coefficient</i> [<b><i>D</i></b>], <i>uplift rate</i> [<b><i>U</i></b>], and <i>rock erodibility coefficient</i> [<b><i>K</i></b>].</li>
			<li>Look at readout about model speed (years per second) and landscape relief (max elevation - min elevation).</li>
		</ol>
	</figcaption>
</figure>




