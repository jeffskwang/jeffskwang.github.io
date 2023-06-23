---
permalink: /teaching/LEM/
toc: true
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
</head>
<body>
</body>
</html>

**Disclaimer**: I developed this lesson plan for two 75-minute classes (lecture + lab) I taught for ESCI 4701 (<i>Geomorphology</i>) at the University of Minnesota (Fall 2022/2023).

# **Learning Goals**
1. Review the main components of landscape evolution models
2. Understand basic concepts for running numerical models
3. Determine how geomorphic processes interact with interactive models
4. Introduce the concept of dynamic equilibrium in landscape evolution models

# **Landscape Evolution Model Components**
Landscape evolution models simulate how the surface of the Earth changes over time. The location of the Earth's surface is referred to as elevation, signified here as $\eta$. In this notation, the change in elevation with time, $t$ is given by:

\begin{align}
  \tag{1}
  \frac{\partial \eta}{\partial t}
\end{align}

In LEMs, we study how landscapes change according to three processes: <b><span style="color:red;">Tectonic</span></b>, <b><span style="color:green;">Hillslope</span></b>, and <b><span style="color:blue;">Fluvial</span></b>. Before we build a full LEM, let's explore each process individually.

# <span style="color:red;">Tectonic Processes</span> ##
Tectonic processes introduce material into the landscape through rock uplift. The most standard approach assumes that the rate of rock uplift, $U$, is both <span title="Does not vary in time" style="color:gray;"><u>steady</u></span> and <span title="Does not vary in space" style="color:gray;"><u>uniform</u></span>. $U$ determines the rate at which the landscape rises [Eqn. 2].

\begin{align}
  \tag{2}
  \frac{\partial \eta}{\partial t} = U
\end{align}

<figure alt="Uplift Render" style="width:600px;height:325px" class="align-center">
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/tectonic.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="text-align:justify"><b>Fig. 1</b>: Landscape subjected to <b>tectonic uplift only</b>. $U$ = 1 mm&frasl;yr. At the end of the video, landscape is uplifted 500 m. Vertical exaggeration = 2.0; 1 sec = 50 kyr.</figcaption>
</figure>

# <span style="color:blue;">Fluvial Processes</span>

Fluvial erosion processes in landscape evolution models are simulated using the <b>stream power incision model</b> [Eqn. 3] (a.k.a. stream power law).

\begin{align}
  \tag{3}
  \frac{\partial \eta}{\partial t} = - KA^mS^n
\end{align}

<figure alt="Incision" class="align-center">
		<img src="/assets/research/incision_triple_horizontal.gif">
		<figcaption style="text-align:justify"><b>Fig. 2</b>: Channel profile view of knickpoint retreat driven by fluvial erosion. Increasing the value of $K$ increases the rate of knickpoint retreat. Drain-age area, $A$, and $U$ are constant in these simulations.</figcaption>
</figure>

An important parameter is $K$, which determines how erodible rock is to flow. It contains information about:
- lithology 
- climate 
- gravity
- fluid density

$K$ controls:
- the rate of erosion for a given drainage area and slope
- the rate of knickpoint retreat [Fig. 2]
- the slope of the channel at equilibrium

<figure alt="Incision Render" style="width:600px;height:337.5px" class="align-center">
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/fluvial.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="text-align:justify"><b>Fig. 3</b>: Previously uplifted landscape subjected to <b>fluvial erosion only</b>. $K$ = 0.00001 yr<sup>-1</sup>, and the total basin area is 200 km<sup>2</sup> (20 km x 10 km). The left boundary is open (outlet) and all other boundaries are closed (walls). Vertical exaggeration = 2.0; 1 sec = 50 kyr.</figcaption>
</figure>

# <span style="color:green;">Hillslope Processes</span>

Hillslope processes in landscape evolution models are simulated using a <b>hillslope diffusion model</b> [Eqn. 4].

\begin{align}
  \tag{4}
  \frac{\partial \eta}{\partial t} = D\nabla^2\eta
\end{align}

<figure alt="Diffusion" class="align-center">
		<img src="/assets/research/diffusion_triple_horizontal.gif">
		<figcaption style="text-align:justify"><b>Fig. 4</b>: 1D profile view of hillslope diffusion using different values of $D$.</figcaption>
</figure>

$D$ determines the rate of hillslope diffusion [Fig. 4]. It models soil movement via:
- rainsplash 
- bioturbation
- freeze-thaw processes
- creep
- agricultural tillage

What is <span title="Laplacian of elevation" style="color:gray;">$\nabla^2\eta$</span>? It is a symbol that represents the sum of second derivatives in the x and y direction, i.e., $\nabla^2\eta = \left(\frac{\partial^2\eta}{\partial x^2}\right) + \left(\frac{\partial^2\eta}{\partial y^2}\right)$. Remember from your calculus class that the 2nd derivative represents the slope of slope? We call $\nabla^2\eta$, <b>topographic curvature</b>.

<figure alt="Diffusion Render" style="width:600px;height:325px" class="align-center">
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/hillslope.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="text-align:justify"><b>Fig. 5</b>: Previously uplifted and fluvial eroded landscape subjected to <b>hilllslope processes only</b>. $D$ = 0.2 m<sup>2</sup>&frasl;yr. A relatively high $D$ value is used for illustration. Vertical exaggeration = 2.0; 1 sec = 50 kyr.</figcaption>
</figure>

# Variables and Parameter Definitions

| Parameter      | Fundamental Unit     | Description           |
| :------------: | :------------------: | :-------------------- |
| $\eta$         | L                    | Elevation             |
| $t$            | T                    | Time                  |
| $U$            | LT$^{-1}$            | Uplift Rate           |
| $K$            | L$^{(1-2m)}$T$^{-1}$ | Erodibility           |
| $A$            | L$^2$                | Drainage Area         |
| $S$            | -                    | Channel Slope         |
| $m$            | -                    | Area Exponent         |
| $n$            | -                    | Slope Exponent        |
| $D$            | L$^2$T$^{-1}$        | Diffusion Coefficient |
| $\nabla^2\eta$ | L$^{-1}$             | Topographic Curvature |

# <b>Building a Numerical Model</b>
In order to model the evolution of landscapes, we must specify the landscape's starting point, named an <b>initial condition</b>. You may have noticed in the movies above that our landscape has defined borders. We must also define rules of how the landscape behaves at these borders, named <b>boundary conditions</b>.
- <b> Initial Conditions Types</b>
	- slanted topography
	- randomized topography
	- endless options...
- <b> Boundary Conditions Types</b>
	- open - water/sediment can travel through boundary<
	- closed- water/sediment cannot travel through boundary
	- fixed value - elevation is fixed to a specified value
	- fixed gradient - elevation gradient is fixed to a specified value
	- periodic - water/sediment that leaves one side comes out the other side

<figure alt="IC&BC" style="width:600px;height:350px"  class="align-center">
		<img src="/assets/images/ic&bc_drawn.png">
		<figcaption style="text-align:justify"><b>Fig. 6</b>: The initial conditions and boundary conditions used in this presentation. The initial condition is a horizontal plane with added randomized perturbations. The boundary conditions are open (blue) and closed (red).</figcaption>
</figure>

# <b><a href="https://www.youtube.com/watch?v=73lj5qJbrms">All Together Now!</a></b>
We now know the three main components of landscape evolution models and some basic concepts for running numerical models. It is time to put it all together [Eqn. 2, Eqn. 3, and Eqn. 4] and run the numerical model. Here is the full conservation equation [Eqn. 5].

\begin{align}
  \tag{5}
  \frac{\partial \eta}{\partial t} = U - KA^mS^n + D\nabla^2\eta
\end{align}

## <b>Things to ponder...</b>
1. Describe the two stages of the numerical simulation.
2. What happens to the landscape after the 10 second mark?
3. Where do you think Eqn. 3 is most important, what about Eqn. 4? Why?

<figure alt="Full model" style="width:600px;height:337.5px"  class="align-center">
		<video width="600" height="300" style="display: block;margin: auto;" controls>
			<source src="/assets/research/all_together.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video> 
		<figcaption style="text-align:justify"><b>Fig. 7</b>: Landscape evolution incorporating all the processes. $U$ = 1 mm&frasl;yr; $K$ = 0.00001 yr<sup>-1</sup>; $D$ = 0.1 m<sup>2</sup>&frasl;yr. Vertical exaggeration = 2.0; 1 sec = 120 kyr.</figcaption>
	</figure>

# <b>Dynamic Equilibrium</b>

Around the 10 second mark, the landscape reaches an steady state, which we call <b>dynamic equilibrium</b>. In this state, elevation no longer changes, which can represented by

\begin{align}
  \tag{6}
  \frac{\partial \eta}{\partial t} = 0
\end{align}

Inserting Eqn. 6 into Eqn. 5 yields the following:

\begin{align}
  \tag{7}
  U = KA^mS^n - D\nabla^2\eta
\end{align}

When the landscape reaches dynamic equilibrium, it configures itself, so the sum of fluvial and hillslope processes equal the uplift rate.

## <b>No Uplift</b>

Setting $U$ to zero means that

\begin{align}
  \tag{8}
  KA^mS^n = D\nabla^2\eta
\end{align}

A non-zero solution would mean the landscape only contains concave-upward hillslopes. This is not a stable condition because it is difficult to create a landscape without concave-downward regions (ridges). Instead, <b>a landscape without uplift would tend towards a solution where both slope and curvature are zero</b> (a flat horizontal plane).
	
### <b>Discussion Questions</b>
1. Do landscapes that have been tectonically inactive for long periods become flat in nature?
2. Why or why not?

## <b>River Dominated</b>

In rivers, where hillslope processes can be ignored, the Eqn. 7 simplifies to

\begin{align}
  \tag{9}
  U = KA^mS^n
\end{align}

- For a constant $A$, $S \propto \frac{U}{K}^{1/n}$
- For a constant $U$ and $K$, $A \propto S^{-m/n}$

### <b>Discussion Questions</b>
1. What do these proportional statements tell us how the landscape responds to $U$ and $K$?
2. What is the shape of an river elevation profile?

## <b>Hillslope Dominated</b><

On hillslopes, where fluvial processes can be ignored, the Eqn. 7 simplifies to

\begin{align}
  \tag{10}
  U = - D\nabla^2\eta
\end{align}
	
- Curvature is uniform with a value of $-U/D$
	
### <b>Discussion Questions</b>
1. How do the hillslopes respond to changes in $U$?
2. What is the shape of an hillslope elevation profile?

# <b>Time to run your own model!</b>

<button class="favorite styled" type="button" id="start_model">
	    Start Model
</button> $\leftarrow$ <b><span id="congrats"></span></b>

<b>Domain Size</b><br>
Columns: <input type="text"
			           value="200"
			           min="10"
			           max="400"
			           style="width: 50px;background-color: white; color: black"
			           id="input_columns"><br>
Rows: <input type="text"
			           value="100"
			           min="10"
			           max="400"
			           style="width: 50px;background-color: white; color: black"
			           id="input_rows">

<b>Boundary Conditions</b> (Unchecked = Closed, Checked = Open)<br>
Top: <input type="checkbox" id="top_bc_checkbox"><br>
Left: <input type="checkbox" id="left_bc_checkbox" checked><br>
Bottom: <input type="checkbox" id="bottom_bc_checkbox"><br>
Right: <input type="checkbox" id="right_bc_checkbox">

<b>Physical Parameters</b>
<div class="slidecontainer">	
	<b><i>D</i></b> = <span id="d_output"></span> m<sup>2</sup>&frasl;yr
	<input type="range" min="-8" max="-4" value="-6" class="slider" id="d_Range">
</div>

<div class="slidecontainer">
	<b><i>U</i></b> = <span id="u_output"></span> mm&frasl;yr
  <input type="range" min="0" max="5" value="2" class="slider" id="u_Range">
</div>

<div class="slidecontainer">
	<b><i>K</i></b> = <span id="k_output"></span> 1&frasl;yr
  <input type="range" min="-12" max="-8" value="-10" class="slider" id="k_Range">
</div>

Low $\eta$ <img src="/assets/images/viridis.png" style = "width: 300px;height:10p;display: inline-block"> High $\eta$
<figure style="text-align:left;">
	<canvas id="myCanvas" width = "400" height ="200" ></canvas> <br>
	<script src="/assets/js/colormap.js" type="text/javascript"></script>
	<script src="/assets/js/lem_game.js" type="text/javascript"></script>
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

# <b>Questions to Ask Yourself</b>
1. How does the landscape respond to gradual/drastic changes in uplift?
2. How does $U$, $D$, and $K$ affect relief of the landscape?
3. How does $U$, $D$, and $K$ affect the drainage network?
4. What effects do the boundary conditions and domain size have on the landscape morphology?

## <b>Landlab Activity</b>
<p style="text-align:justify"> A landlab activity notebook made in Google collab can be found <a href="https://colab.research.google.com/drive/1-KpbbCW2XNGGaBJSlqDKOXwqIvS1o0OI?usp=sharing">HERE</a>. </p>



