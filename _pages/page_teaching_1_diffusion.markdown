---
layout: single
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
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
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
<b>Disclaimer</b>: I developed this lesson plan for a 20-minute teaching unit in GRAD 8101 (<i>Teaching in Higher Education</i>) at the University of Minnesota (Spring 2023). These <a href="https://docs.google.com/presentation/d/1He0NAFRBt6n9554vKKsNbIOvWnyVwRKkI5TqjpAgwHY/edit?usp=sharing">lecture slides</a> accompany this lesson plan.
<br>
<br>
<h1><b><span>Hillslope Processes</span></b></h1>
	<p style="text-align:justify">Hillslope processes in landscape evolution models are simulated using a <b>hillslope diffusion model</b>.
		$$\frac{\partial \eta}{\partial t} = D\nabla^2\eta,$$
		where $\eta$ is elevation, $t$ is time, and $D$ is a hillslope diffusion coefficient. It models soil movement via:</p>
		<ul style="margin-left:25px">
			<li>rainsplash</li> 
			<li>bioturbation</li> 
			<li>freeze-thaw processes</li>
			<li>creep</li>
			<li>agricultural tillage</li>
		</ul>
<br>
<p style="text-align:justify">What is <span title="Laplacian of elevation">$\nabla^2\eta$</span>? It is a symbol that represents the sum of second derivatives in the x and y direction, i.e., $\nabla^2\eta = \left(\frac{\partial^2\eta}{\partial x^2}\right) + \left(\frac{\partial^2\eta}{\partial y^2}\right)$. Remember from your calculus class that the 2nd derivative represents the slope of slope? We call $\nabla^2\eta$, <b>topographic curvature</b>.</p>

<h1><b>Local Hillslope Diffusion Model</b></h1>
		<div class="slidecontainer">
			<b>Radius</b> = <span id="rad_output"></span> m
		  <input type="range" min="100" max="1000" value="200" class="slider" id="rad_Range">
		</div>
	<figure style="width:500px;height:500px" class="align-center">
		<script src="/assets/js/colormap.js" type="text/javascript"></script>
		<canvas id="DiffuseCanvas" width="500" height="500" onmousedown="mouse_down(event)" onmouseup = "mouse_up(event)" onmousemove = "diffuse_loc(event)" onmouseout = "mouse_up(event)"></canvas>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js" type="text/javascript"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.11/jquery.csv.js" type="text/javascript"></script>
		<script src="/assets/js/diffuse_TroutCreek.js" type="text/javascript"></script>
		<figcaption class="text-center"> Low $\eta$ <img src="/assets/images/terrain.png" style = "width:300px;height:20px;display: inline-block"> High $\eta$</figcaption>
	</figure>
	<br>
	<p style="text-align:justify">
		<b>Instructions:</b>
		<ol>
			<li>Move the circle and click to drive hillslope diffusion on the landscape.</li>
			<li>Use the slider above to change the size of the circle.</li>
		</ol>
	</p>
</body>
</html>




