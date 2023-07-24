---
layout: single
permalink: /research/lem
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

# <b>The Role of Lateral Migration in Landscape Evolution</b>

The basic behavior of numerical models (Fig. 2) and experiments (Fig. 3) of landscape evolution models are quite different. The main differences are <b>(1)</b> numerical models exhibit Extreme Memory while the experiments do not, and <b>(2)</b> the numerical models tend towards a static state while experimental landscapes persistently reorganize. 

<b>What's different?</b> In our experiments (Fig. 3), we observed channels that migrated laterally, which at the time, was not typically included in landscape evolution models. Recently, Langston and Tucker <a href="https://doi.org/10.5194/esurf-6-1-2018"><b>(2018)</b></a> developed sub-model that did just that. In our paper <a href="https://doi.org/10.5194/esurf-6-1-2018"><b>(Kwang et al., 2021)</b></a>, we found that numerical models that simulate lateral erosion processes behave similarly to the experimental landscapes (Fig. 5).
	
<figure alt="XLM_movie" style="width:500px;height:500px" class="align-center">
	<video width="500" height="500" style="display: block;margin: auto;" controls>
		<source src="/assets/research/pnas_animated.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video> 
	<figcaption style="text-align:justify">
		<b>Fig. 5</b> Movie of numerical landscape evolution with lateral channel migration.
	</figcaption>
</figure>
	
The main parameter that controlled the landscape's behavior was <i><b>K<sub>L</sub>/K<sub>V</sub></b></i>, the ratio of lateral and vertical erodibility. Erodibility describes how resistant a material is to erosion (lower = more resistant, higher = less resistant). In Fig. 6, we use a correlation coefficient to quantify how much memory of the initial condition the landscape retains. For larger values of <i>K<sub>L</sub>/K<sub>V</sub></i>, we found landscapes forget their initial conditions faster.

<figure alt="correlation" style="width:420px;height:300px" class="align-center">
	<img src="/assets/research/correlation.png">
	<figcaption style="text-align:justify">
		<b>Fig. 6</b> Correlation coefficients for different values of <i>K<sub>L</sub>/K<sub>V</sub></i>. As the coefficient becomes less than 1, the landscape loses memory of its initial condition. The steepness of the slope of the lines indicates the speed at which the landscape forgets its initial condition.
	</figcaption>
</figure>