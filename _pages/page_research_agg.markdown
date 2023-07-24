---
layout: single
permalink: /research/agg
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

# <b>Agricultural Landscape Evolution</b>
<figure alt="tillage" style="width:420px;height:270px" class="align-center">
		<img src="https://get.pxhere.com/photo/tractor-field-farm-vehicle-crop-soil-dust-agriculture-dusty-ploughing-plough-historically-harvester-arable-working-machine-rural-area-plow-agricultural-machinery-agricultural-tractor-tillage-grass-family-485893.jpg">
		<figcaption style="text-align:justify">
			<b>Fig. 7</b> Tillage erosion. <a href="https://pxhere.com/en/photo/485893"><b>Stock Image Source</b></a> 
		</figcaption>
</figure>

Tillage (Fig. 7) is used by farmers to prepare soil for growing crops. When the tractors drive their plows across the field, the soil is moved from high elevations to low elevation, causing a diffusional effect. This diffusional effect has also been studied in natural hillslopes <a href="https://doi.org/10.1029/97WR00534"><b>Fernandes and Dietrich, 1997</b></a>. However, coefficients of diffusion are estimated to be ~<b>2 orders</b> of magnitude larger than coefficients that describe natural processes.		

<figure alt="Grid" style="width:600px;height:660px;margin: auto;">
	<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8027.5579790089405!2d-93.50810374698656!3d42.988135492990835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1636490024748!5m2!1sen!2sus" width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
	<figcaption style="text-align:justify">
		<b>Fig. 8</b> Aerial image of an agricultural field. 
	</figcaption>
</figure>

Remote sensing (Fig. 8) of agricultural fields reveals a consistent pattern where light soils are located on hilltops and dark soils are located in hollows (topographic lows). Lighter materials are associated with carbon-poor soils and darker materials are associated with carbon-rich soils <a href="https://doi.org/10.2136/sssaj2018.09.0318"><b>Thaler et al., 2019</b></a>. If you were to dig a hole in natural landscapes, you would typically find carbon-rich soils at the surface and more carbon-poor soils as you dig deeper (about 30-50 cm). Therefore, exposed carbon-poor soils on hilltops suggest significant soil erosion.

By incorporating tillage erosion into a landscape evolution model, we can simulate and reproduce patterns of soil carbon (Fig. 9). Interactive model to come!		

<figure alt="Grid" style="width:600px;height:450px;margin: auto;">
	<video width="600" height="400" controls>
		<source src="/assets/research/tillage_blender.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video> 
	<figcaption><b>Fig. 9</b> Simulation of landscape and soil organic carbon evolution due to tillage erosion.</figcaption>
</figure>