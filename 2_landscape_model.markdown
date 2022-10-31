---
layout: page
title: Learn about Landscape Evolution
permalink: /LEM/
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

<h2><b>Landscape Evolution Model Components</b></h2>
	<p style="text-align:justify">Landscape evolution models simulate how the surface of the Earth changes over time. The location of the Earth's surface is referred to as elevation, signified here as $\eta$. In this notation, the change in elevation with time, $t$ is given by:</p>
	
	<p style="font-size:150%;margin-left:25px">[1] $\frac{\partial \eta}{\partial t}$</p>
	
	<ul class="parameters" style="list-style: none;margin-right:350px;margin-left:0px">
		<li><b>Parameter</b></li>
	  <li>$\eta$</li>
	  <li>$t$</li>

	  <li><b>Unit</b></li>
	  <li>[$L$]</li>
	  <li>[$T$]</li>

		<li><b>Description</b></li>
	  <li>elevation</li>
	  <li>time</li>
	</ul>
	<p style="text-align:justify">In LEMs, we study how landscapes change according to three processes: <b><span style="color:red;">Tectonic</span></b>, <b><span style="color:green;">Hillslope</span></b>, and <b><span style="color:blue;">Fluvial</span></b>. Before we build a full LEM, let's explore each process individually.</p>
<br>

<h1><b><span style="color:red;">Tectonic Processes</span></b></h1>
	<p style="text-align:justify">Tectonic processes introduce material into the landscape through rock uplift. The most standard approach assumes that the rate of rock uplift, $U$, is both <span title="Does not vary in time" style="color:gray;"><u>steady</u></span> and <span title="Does not vary in space" style="color:gray;"><u>uniform</u></span>. $U$ determines the rate at which the landscape rises [Eqn. 2].</p>
	<p style="font-size:150%;margin-left:25px">[2] $\frac{\partial \eta}{\partial t} = U$</p>
	<ul class="parameters"  style="list-style: none;margin-right:350px;margin-left:0px">
		<li><b>Parameter</b></li>
	  <li>$U$</li>

	  <li><b>Unit</b></li>
	  <li>[$\frac{L}{T}$]</li>

		<li><b>Description</b></li>
	  <li>uplift rate</li>
	</ul> 
	<br>
	<figure>
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/tectonic.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="margin:0px 70px 0px 70px;text-align:justify"><b>Fig. 1</b>: Landscape subjected to <b>tectonic uplift only</b>. $U$ = 1 mm&frasl;yr. At the end of the video, landscape is uplifted 500 m. Vertical exaggeration = 2.0; 1 sec = 50 kyr.</figcaption>
	</figure>
	<br>
<br>

<h1><b><span style="color:blue;">Fluvial Processes</span></b></h1>

	<figure alt="Incision" style="width:200px;height:450px;float:right;padding-bottom:90px;padding-top:0px;padding-left:30px">
		<img src="/assets/research/incision_triple.gif">
		<figcaption style="text-align:justify"><b>Fig. 2</b>: Channel profile view of knickpoint retreat driven by fluvial erosion. Increasing the value of $K$ increases the rate of knickpoint retreat. Drain-age area, $A$, and $U$ are constant in these simulations.</figcaption>
	</figure>

	<p style="text-align:justify">Fluvial erosion processes in landscape evolution models are simulated using the <b>stream power incision model</b> [Eqn. 3] (a.k.a. stream power law).</p>

	<p style="font-size:150%;margin-left:25px">[3] $\frac{\partial \eta}{\partial t} = - KA^mS^n$</p>

	<p style="text-align:justify">An important parameter is $K$, which determines how erodible rock is to flow. It contains information about:</p>
		<ul style="margin-left:75px">
			<li>lithology</li> 
			<li>climate</li> 
			<li>gravity</li>
			<li>fluid density</li>
		</ul>

	<p>$K$ controls:</p>
		<ul style="margin-left:75px">
			<li> the rate of erosion for a given drainage area and slope</li> 
			<li> the rate of knickpoint retreat [Fig. 2]</li> 
			<li> the slope of the channel at equilibrium</li>
		</ul>

	<ul class="parameters"  style="list-style: none;margin-right:250px;margin-left:0px">
		<li><b>Parameter</b></li>
	  <li>$K$</li>
	  <li>$A$</li>
	  <li>$S$</li>
	  <li>$m$</li>
	  <li>$n$</li>

	  <li><b>Unit</b></li>
	  <li>[$\frac{L^{1-2m}}{T}$]</li>
	  <li>[$L^2$]</li>
		<li>[-]</li>
		<li>[-]</li>
		<li>[-]</li>

		<li><b>Description</b></li>
	  <li>rock erodibility</li>
	  <li>drainage area</li>
	  <li>channel slope</li>
	  <li>area exponent</li>
	  <li>slope exponent</li>
	</ul> 

	<figure>
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/fluvial.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="margin:0px 70px 0px 70px;text-align:justify"><b>Fig. 3</b>: Previously uplifted landscape subjected to <b>fluvial erosion only</b>. $K$ = 0.00001 yr<sup>-1</sup>, and the total basin area is 200 km<sup>2</sup> (20 km x 10 km). The left boundary is open (outlet) and all other boundaries are closed (walls). Vertical exaggeration = 2.0; 1 sec = 50 kyr.</figcaption>
	</figure>
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

<h2><b>Building a Numerical Model</b></h2>
	<p style="text-align:justify">In order to model the evolution of landscapes, we must specify the landscape's starting point, named an <b>initial condition</b>. You may have noticed in the movies above that our landscape has defined borders. We must also define rules of how the landscape behaves at these borders, named <b>boundary conditions</b>.
	<ul style="margin-left:50px">
		<li><b>Initial Conditions Types</b></li> 
			<ul>
				<li>slanted topography</li>
				<li>randomized topography</li>
				<li>endless options...</li>
			</ul>
		<li><b>Boundary Conditions Types</b></li> 
			<ul>
				<li>open - water/sediment can travel through boundary</li>
				<li>closed- water/sediment cannot travel through boundary</li>
				<li>fixed value - elevation is fixed to a specified value</li>
				<li>fixed gradient - elevation gradient is fixed to a specified value</li>
				<li>periodic - water/sediment that leaves one side comes out the other side</li>
			</ul>
	</ul>

	<figure alt="IC&BC" style="width:600px;height:300px;display: block;margin: auto;padding-bottom:50px">
		<img src="/assets/images/ic&bc_drawn.png">
		<figcaption style="text-align:justify"><b>Fig. 6</b>: The initial conditions and boundary conditions used in this presentation. The initial condition is a horizontal plane with added randomized perturbations. The boundary conditions are open (blue) and closed (red).</figcaption>
	</figure>
<br>

<h2><b><a href="https://www.youtube.com/watch?v=73lj5qJbrms">All Together Now!</a></b></h2>

	<p style="text-align:justify">We now know the three main components of landscape evolution models and some basic concepts for running numerical models. It is time to put it all together [Eqn. 2, Eqn. 3, and Eqn. 4] and run the numerical model. Here is the full conservation equation [Eqn. 5].</p>

	<p style="font-size:150%;margin-left:25px">[5] $\frac{\partial \eta}{\partial t} = U - KA^mS^n + D\nabla^2\eta$</p>

	<p style="font-size:120%;margin-left:20px"><b>Things to ponder...</b></p>
	<ol style="margin-left:50px">
		<li>Describe the two stages of the numerical simulation.</li> 
		<li>What happens to the landscape after the 10 second mark?</li> 
		<li>Where do you think Eqn. 3 is most important, what about Eqn. 4? Why?</li> 
	</ol>

	<figure>
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/all_together.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="margin:0px 70px 0px 70px;text-align:justify"><b>Fig. 7</b>: Landscape evolution incorporating all the processes. $U$ = 1 mm&frasl;yr; $K$ = 0.00001 yr<sup>-1</sup>; $D$ = 0.1 m<sup>2</sup>&frasl;yr. Vertical exaggeration = 2.0; 1 sec = 120 kyr.</figcaption>
	</figure>
<br>

<h2><b>Dynamic Equilibrium</b></h2>

	<p style="text-align:justify">Around the 10 second mark, the landscape reaches an steady state, which we call <b>dynamic equilibrium</b>. In this state, elevation no longer changes, which can represented by</p>

	<p style="font-size:150%;margin-left:25px">[6] $\frac{\partial \eta}{\partial t} = 0$</p>

	<p style="text-align:justify">Inserting Eqn. 6 into Eqn. 5 yields the following:</p>

	<p style="font-size:150%;margin-left:25px">[7] $U = KA^mS^n - D\nabla^2\eta$</p>

	<p style="text-align:justify">When the landscape reaches dynamic equilibrium, it configures itself, so the sum of fluvial and hillslope processes equal the uplift rate.</p>
<br>

<h1><b>No Uplift</b></h1>
	<p style="text-align:justify">Setting $U$ to zero means that</p>

	<p style="font-size:150%;margin-left:25px">[8] $KA^mS^n = D\nabla^2\eta$</p>

	<p style="text-align:justify">A non-zero solution would mean the landscape only contains concave-upward hillslopes. This is not a stable condition because it is difficult to create a landscape without concave-downward regions (ridges). Instead, <b>a landscape without uplift would tend towards a solution where both slope and curvature are zero</b> (a flat horizontal plane).</p>
	
	<p style="font-size:120%;margin-left:20px"><b>Discussion Questions</b></p>
	<ol style="margin-left:50px">
		<li>Do landscapes that have been tectonically inactive for long periods become flat in nature?</li>
		<li>Why or why not?</li>
	</ol>
<br>

<h1><b>River Dominated</b></h1>
	<p style="text-align:justify">In rivers, where hillslope processes can be ignored, the Eqn. 7 simplifies to</p>

	<p style="font-size:150%;margin-left:25px">[9]  $U = KA^mS^n$</p>

	<ul style="margin-left:50px">
		<li>For a constant $A$, $S \propto \frac{U}{K}^{1/n}$</li>
		<li>For a constant $U$ and $K$, $A \propto S^{-m/n}$</li>
	</ul>
	
	<p style="font-size:120%;margin-left:20px"><b>Discussion Questions</b></p>
	<ol style="margin-left:50px">
		<li>What do these proportional statements tell us how the landscape responds to $U$ and $K$?</li>
		<li>What is the shape of an river elevation profile?</li>
	</ol>
<br>

<h1><b>Hillslope Dominated</b></h1>
	<p style="text-align:justify">On hillslopes, where fluvial processes can be ignored, the Eqn. 7 simplifies to</p>

	<p style="font-size:150%;margin-left:25px">[10]  $U = - D\nabla^2\eta$</p>

	<ul style="margin-left:50px">
		<li>Curvature is uniform with a value of $-U/D$</li>
	</ul>
	
	<p style="font-size:120%;margin-left:20px"><b>Discussion Questions</b></p>
	<ol style="margin-left:50px">
		<li>How do the hillslopes respond to changes in $U$</li>
		<li>What is the shape of an hillslope elevation profile?</li>
	</ol>
<br>

<h2><b>Time to run your own model!</b></h2>

	<button class="favorite styled" type="button" id="start_model">
	    Start Model
	</button> $\leftarrow$ <b><span id="congrats"></span></b>
	<br><br>

	<b>Domain Size</b><br>
		<ul class="bc"  style="list-style: none;margin-right:555px;margin-left:20px">
			<li>Columns:</li>
			<li>Rows:</li>
			<li><input type="text"
			           value="200"
			           style="width: 30px;"
			           id="input_columns"></li>
			<li><input type="text"
			           value="100"
			           style="width: 30px;"
			           id="input_rows"></li>
		</ul>

	<b>Boundary Conditions</b> (Unchecked = Closed, Checked = Open)
		<ul class="bc"  style="list-style: none;margin-right:530px;margin-left:20px">
			<li><div class="toggle-btn">
				<input type="checkbox" id="top_bc_checkbox">
				<label>Top</label>
			</div></li>

			<li><div class="toggle-btn">
				<input type="checkbox" id="left_bc_checkbox" checked>
				<label>Left</label>
			</div></li>

			<li><div class="toggle-btn">
				<input type="checkbox" id="bottom_bc_checkbox">
				<label>Bottom</label>
			</div></li>

			<li><div class="toggle-btn">
				<input type="checkbox" id="right_bc_checkbox">
				<label>Right</label>
			</div></li>
		</ul>

	<b>Physical Parameters</b>
		<div class="slidecontainer">
		  <input type="range" min="-8" max="-4" value="-6" class="slider" id="d_Range">
			<b><i>D</i></b> = <span id="d_output"></span> m<sup>2</sup>&frasl;yr
		</div>

		<div class="slidecontainer">
		  <input type="range" min="0" max="5" value="2" class="slider" id="u_Range">
			<b><i>U</i></b> = <span id="u_output"></span> mm&frasl;yr
		</div>

		<div class="slidecontainer">
		  <input type="range" min="-12" max="-8" value="-10" class="slider" id="k_Range">
			<b><i>K</i></b> = <span id="k_output"></span> 1&frasl;yr
		</div> <br>

<figure style="text-align:left;">
	<canvas id="myCanvas" width = "400" height ="200" ></canvas> <br>
	<script src="/assets/js/colormap.js" type="text/javascript"></script>
	<script src="/assets/js/lem_game.js" type="text/javascript"></script>
	Low $\eta$ <img src="/assets/images/viridis.png" style = "width: 300px;height:10p;display: inline-block"> High $\eta$ <br><br>
	<figcaption style="text-align:justify">
	Basin Area = <b><span id="basin_area"></span> km<sup>2</sup></b>	<br>
	Landscape Evolution Speed = <b><span id="time_per_second"></span> kyr&frasl;sec</b>	<br>
	Relief = <b><span id="max_ele"></span> m</b>	<br><br>

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

<h1><b>Questions to Ask Yourself</b></h1>
	<ol style="margin-left:50px">
		<li>How does the landscape respond to gradual/drastic changes in uplift?</li>
		<li>How does $U$, $D$, and $K$ affect relief of the landscape?</li>
		<li>How does $U$, $D$, and $K$ affect the drainage network?</li>
		<li>What effects do the boundary conditions and domain size have on the landscape morphology?</li>
	</ol>



