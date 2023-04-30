---
layout: page
title: Hillslopes
permalink: /teaching/diffuse/
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

<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.slidecontainer {
  width: 72%;
}

.slider {
  -webkit-appearance: none;
  width: 70%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #000000;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #000000;
  cursor: pointer;
}
</style>

</head>

<body>
<b>Disclaimer</b>: This a lesson plan for a 20-minute teaching unit I taught in GRAD 8101 (<i>Teaching in Higher Education</i>) during Spring 2023 at the University of Minnesota.
<br>
<br>
<h1><b><span style="color:green;">Hillslope Processes (<a href="https://docs.google.com/presentation/d/1He0NAFRBt6n9554vKKsNbIOvWnyVwRKkI5TqjpAgwHY/edit?usp=sharing">Lecture Slides</a>)</span></b></h1>
	<p style="text-align:justify">Hillslope processes in landscape evolution models are simulated using a <b>hillslope diffusion model</b>.</p>

	<p style="font-size:150%;margin-left:25px">$\frac{\partial \eta}{\partial t} = D\nabla^2\eta$,</p>

	<p style="text-align:justify">where $\eta$ is elevation, $t$ is time, and $D$ is a hillslope diffusion coefficient. It models soil movement via:</p>
		<ul style="margin-left:75px">
			<li>rainsplash</li> 
			<li>bioturbation</li> 
			<li>freeze-thaw processes</li>
			<li>creep</li>
			<li>agricultural tillage</li>
		</ul>

	<p style="text-align:justify">What is <span title="Laplacian of elevation">$\nabla^2\eta$</span>? It is a symbol that represents the sum of second derivatives in the x and y direction, i.e., $\nabla^2\eta = \left(\frac{\partial^2\eta}{\partial x^2}\right) + \left(\frac{\partial^2\eta}{\partial y^2}\right)$. Remember from your calculus class that the 2nd derivative represents the slope of slope? We call $\nabla^2\eta$, <b>topographic curvature</b>.</p>

<h2><b>Local Hillslope Diffusion Model</b></h2>
		<div class="slidecontainer">
		  <input type="range" min="100" max="1000" value="200" class="slider" id="rad_Range">
			<b>Radius</b> = <span id="rad_output"></span> m
		</div>

<figure style="text-align:left;">
	<script src="/assets/js/colormap.js" type="text/javascript"></script>
	<canvas id="DiffuseCanvas" width="500" height="500" onmousedown="mouse_down(event)" onmouseup = "mouse_up(event)" onmousemove = "diffuse_loc(event)" onmouseout = "mouse_up(event)"></canvas>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js" type="text/javascript"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.11/jquery.csv.js" type="text/javascript"></script>
	<script src="/assets/js/diffuse_TroutCreek.js" type="text/javascript"></script>
	<br>
	Low $\eta$ <img src="/assets/images/terrain.png" style = "width: 400px;height:20px;display: inline-block"> High $\eta$ <br><br>
	<figcaption style="text-align:justify">

		<b>Instructions:</b><br/>
		<ol>
			<li>Move the circle and click to drive hillslope diffusion on the landscape.</li>
			<li>Use the slider above to change the size of the circle.</li>
		</ol>
	</figcaption>
</figure>
</body>




