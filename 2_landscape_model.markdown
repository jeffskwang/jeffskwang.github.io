---
layout: page
title: Learn about Landscape Evolution
permalink: /LEM/
---

<html>
<head>
<style>
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

<h2><b>Learning Goals</b></h2>
 <ol>
  <li>Recognize the main components of landscape evolution models</li>
  <li>Determine how these geomorphic processes interact with interactive models</li>
  <li>Understand how transient and equilibrium landscapes differ</li>
</ol> 

<h2><b>Building a Landscape Evolution Model</b></h2>
	<p>Landscape evolution models simulate how the surface of the Earth changes over time. The location of the Earth's surface is referred to as elevation, signified here as $\eta$. In this notation, the change in elevation with time, $t$ is given by:</p>
	\begin{equation}
	\frac{\partial \eta}{\partial t}
	\end{equation}
	<p>In LEMs, we study how landscapes change according to three processes: <b><span style="color:red;">Tectonic</span></b>, <b><span style="color:green;">Hillslope</span></b>, and <b><span style="color:blue;">Fluvial</span></b>.</p>

<h1><b><span style="color:red;">Tectonic Processes</span></b></h1>
	<p>Tectonic processes introduce material into the landscape through rock uplift. The most standard approach assumes that the rate of rock uplift, $U$, is both <span title="Does not vary in time" style="color:gray;"><u>steady</u></span> and <span title="Does not vary in space" style="color:gray;"><u>uniform</u></span>.</p>
	\begin{equation}
	\frac{\partial \eta}{\partial t} = U
	\end{equation}
	<figure>
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/tectonic.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="margin:0px 70px 0px 70px">Landscape subjucted to <b>tectonic uplift only</b>. $U$ = 1 mm&frasl;yr. At the end of the video, landscape is uplifted 500 m. Vertical exaggeration = 2.0; 1 sec = 50 kyr.</figcaption>
	</figure>
<h1><b><span style="color:blue;">Fluvial Processes</span></b></h1>
	<p></p>
	\begin{equation}
	\frac{\partial \eta}{\partial t} = - KA^mS^n
	\end{equation}
	<figure>
		<img src="/assets/research/incision_triple.gif" alt="incision" style="width:200px;height:450px;">
		<figcaption style="margin:0px 0px 0px 0px">TBD</figcaption>
	</figure>
	<figure>
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/fluvial.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="margin:0px 70px 0px 70px">Previously uplift landscape subjected to <b>fluvial erosion only</b>. $K$ = 0.00001 yr<sup>-1</sup>, and the total basin area is 200 km<sup>2</sup>. The left boundary is open (outlet) and all other boundaries are closed (walls). Vertical exaggeration = 2.0; 1 sec = 50 kyr.</figcaption>
	</figure>
<h1><b><span style="color:green;">Hillslope Processes</span></b></h1>
	<p></p>
	\begin{equation}
	\frac{\partial \eta}{\partial t} = D\nabla^2\eta
	\end{equation}
	<p>What is $\nabla^2\eta$? It is a symbol that represents the sum of second derivatives in the x and y direction, i.e., $\nabla^2\eta = \left(\frac{\partial^2\eta}{\partial x^2}\right) + \left(\frac{\partial^2\eta}{\partial y^2}\right)$</p>
	<figure>
		<img src="/assets/research/diffusion_triple.gif" alt="diffusion" style="width:200px;height:450px;">
		<figcaption style="margin:0px 0px 0px 0px">TBD</figcaption>
	</figure>
	<figure>
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/hillslope.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="margin:0px 70px 0px 70px">Previously uplift and fluvial eroded landscape subjected to <b>hilllslope processes only</b>. $D$ = 0.2 m<sup>2</sup>&frasl;yr. A relatively high $D$ value is used for illustration. Vertical exaggeration = 2.0; 1 sec = 50 kyr.</figcaption>
	</figure>
<h1><b><a href="https://www.youtube.com/watch?v=73lj5qJbrms">All Together Now!</a></b></h1>
	\begin{equation}
	\frac{\partial \eta}{\partial t} = U - KA^mS^n + D\nabla^2\eta
	\end{equation}
	<figure>
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/all_together.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="margin:0px 70px 0px 70px">$U$ = 1 mm&frasl;yr; $K$ = 0.00001 yr<sup>-1</sup>; $D$ = 0.1 m<sup>2</sup>&frasl;yr. Vertical exaggeration = 2.0; 1 sec = 120 kyr.</figcaption>
	</figure>


<h1><b>Steady State</b></h1>
<h1><b>River Profiles</b></h1>





<h1><b><span id="congrats"></span></b></h1>
<button class="favorite styled"
        type="button" id="start_model">
    Start Model
</button>

<br><br>

Columns:
<input type="text"
           value="200"
           style="width: 30px;"
           id="input_columns">
<br>
Rows:
<input type="text"
           value="50"
           style="width: 30px;"
           id="input_rows">

<br><br>
<div class="slidecontainer">
  <input type="range" min="-2" max="2" value="0" class="slider" id="d_Range">
	<b><i>D</i></b> = <span id="d_output"></span> m<sup>2</sup>&frasl;yr
</div>

<div class="slidecontainer">
  <input type="range" min="0" max="5" value="2" class="slider" id="u_Range">
	<b><i>U</i></b> = <span id="u_output"></span> mm&frasl;yr
</div>

<div class="slidecontainer">
  <input type="range" min="1" max="5" value="5" class="slider" id="k_Range">
	<b><i>K</i></b> = <span id="k_output"></span> 1&frasl;yr
</div> <br>

<figure style="text-align:left;">
	<canvas id="myCanvas" width = "600" height ="600" ></canvas> <br>
	<script src="/assets/js/colormap.js" type="text/javascript"></script>
	<script src="/assets/js/lem_game.js" type="text/javascript"></script>
	Low Elevation <img src="/assets/images/viridis.png" style = "width: 300px;height:10p;display: inline-block"> High Elevation <br><br>
	<figcaption style="text-align:justify">
	Basin Area = <b><span id="basin_area"></span> km<sup>2</sup></b>	<br>
	Lansdscape Evolution Speed = <b><span id="time_per_second"></span> kyr&frasl;sec</b>	<br>
	Relief = <b><span id="max_ele"></span> m</b>	<br><br>
	<b>Instructions:</b><br />
		(1) Press "Start Model" to start the simulation.<br />
		(2) Change number of columns and rows to change the domain size. (Warning: Too many cells will be slow!) <br />
		(3) Adjust the <i>hillslope diffusion coefficient</i> [<b><i>D</i></b>], <i>uplift rate</i> [<b><i>U</i></b>], and <i>rock erodibility coefficient</i> [<b><i>K</i></b>].<br />
		(4) Look at readout about model speed (years per second) and landscape relief (max elevation - min elevation).
	</figcaption>
</figure>


<h1><b>Questions to Ask Yourself</b></h1>
	<p style="text-align:justify">
		(1) What is the long-term landscape behavior? Does it keep changing or approach a stable state?<br>
		(2) What effects do <b><i>D</i></b>, <b><i>U</i></b>, and/or <b><i>K</i></b> have on the relief of the landscape?<br>
		(3) How much branching in the drainage network occurs with different variations in <b><i>D</i></b> and/or <b><i>K</i></b>?
	</p>
</body>



