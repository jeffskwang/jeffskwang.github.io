---
layout: page
title: iLEM
permalink: /iLEM/
---

<html>
<head>
<style>
</style>
</head>
<body>


<h1><b>Press the button below.</b></h1>
<button class="favorite styled"
        type="button" id="start_model">
    Start Model
</button>

<br><br>
<h1><b>Congratulations! You're a modeler.</b></h1>

Rows:
<input type="text"
           value="70"
           style="width: 30px;"
           id="input_rows">
<br>
Columns:
<input type="text"
           value="70"
           style="width: 30px;"
           id="input_columns">

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
</div>

<figure style="text-align:left;">
	<canvas id="myCanvas" width = "420" height ="420" onmousedown="draw_on(event)" onmouseup = "draw_off(event)" onmousemove = "mouse_loc(event)" onmouseout = "start_sim(event)" onmouseover = "start_draw(event)" style ="border:4px solid #bc3131;"></canvas>
	<script src="/assets/js/lem_game.js" type="text/javascript"></script>
	<figcaption style="text-align:justify">
	Basin Area = <b><span id="basin_area"></span> km<sup>2</sup></b>	<br>
	Lansdscape Evolution Speed = <b><span id="time_per_second"></span> kyr/sec</b>	<br>
	Relief = <b><span id="max_ele"></span> m</b>	<br><br>
	<b>Instructions:</b><br />
		(1) Press "Start Model" to start the simulation.<br />
		(2) Adjust the <i>hillslope diffusion coefficient</i> [<b><i>D</i></b>], <i>uplift rate</i> [<b><i>U</i></b>], and <i>rock erodibility coefficient</i> [<b><i>K</i></b>].<br />
		(3) Look at readout about model speed (years per second) and landscape relief (max elevation - min elevation).
	</figcaption>
</figure>

<h1><b>Questions to Ask Yourself</b></h1>
	<p style="text-align:justify">
		(1) What is the long-term landscape behavior? Does it keep changing or approach a stable state?<br>
		(2) What effects do <b><i>D</i></b>, <b><i>U</i></b>, and/or <b><i>K</i></b> have on the relief of the landscape?<br>
		(3) How much branching in the drainage network occurs with different variations in <b><i>D</i></b> and/or <b><i>K</i></b>?
	</p>




