---
layout: page
title: Rain Model
permalink: /rain/
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.11/jquery.csv.js" type="text/javascript"></script>

<h3>What is this image showing? <canvas id="myCanvas" width = "300" height ="300" onmousedown="mouse_down(event)" onmouseup = "mouse_up(event)" onmousemove = "rain_loc(event)" onmouseout = "mouse_up(event)" style="float: right;margin-left:15px;"></canvas>
<script src="/assets/js/rain.js" type="text/javascript"></script>
</h3>
<p>The gray-scale image to the right depicts a 
<a href="https://www.usgs.gov/faqs/what-are-digital-elevation-models-dems?qt-news_science_products=0#qt-news_science_products">
<b>digital elevation model (DEM)</b></a>. Each pixel
in the DEM represents the height of the landscape, where dark
areas are low and light areas are high.</p>
<br />
<br />
<br />
<br />
<br />
<br />

<h3>How does it work?<img src="/assets/rain/foutput.gif" alt="Grid" style="width:250px;height:250px;margin-right:15px;float:left">
</h3>
<p>Here, we zoom in on 9 of the pixels of the DEM. When rain lands on a pixel, we tell the
water to move in the direction of <a href="https://www.sciencedirect.com/science/article/abs/pii/S0734189X84800110?via%3Dihub">
<b>steepest descent</b></a>. Think about placing a ball on a hill. Which way does the ball tend to roll?
</p>




