//MARCH 5th update more commenting

//get the canvas from the home page layout
var canvas = document.getElementById("DiffuseCanvas");

var rad_slider = document.getElementById("rad_Range");
document.getElementById('rad_output').innerHTML = rad_slider.value

var D = 0.05
var dt_lem = 500.
var dx = 10.

//get the context of the canvas, 2d
var ctx = canvas.getContext("2d");

//set the time step	
var dt = 1

//pixel index for printing the images
var pixelindex = 0;

//initalize gray scale image for topography
var gray = 1.0

//dimensions of the data 450 x 450 cells
var M = 500;
var N = 500;

//set the scale up of the canvas vs. the width of the data. MUST BE A WHOLE NUMBER
var scale = canvas.width/M;

//set pixel data over the canvas (R,G,B,A) values for each pixel
var imagedata = ctx.createImageData(canvas.width, canvas.height);

//define variables for the neighbor cells
var Ncell = 0;
var Scell = 0;
var Wcell = 0;
var Ecell = 0;

//define the x and y coordinates of the mouse
var x_click = 0;
var y_click = 0;
//define the x and y coordinates of the mouse
var x_circ = 0;
var y_circ = 0;

//determines is the mouse button is pressed
var click = 0;

//diffuse cloud radius
var rad = rad_slider.value / dx

//steepest descent variables
var minx = -1
var miny = -1
var maxz = -100.

//radius slider
rad_slider.onchange = function(event){
  rad = rad_slider.value / dx;
  document.getElementById('rad_output').innerHTML = rad * dx
  shakeup = 1
}
//this function determines where the mouse is on the canvas
function diffuse_loc(event){
	x_click = Math.trunc(event.offsetX/scale);
	y_click = N - 1 - Math.trunc(event.offsetY/scale);
	x_circ = Math.trunc(event.offsetX/scale);
	y_circ = Math.trunc(event.offsetY/scale);
}

//this function triggers when the mouse button is pressed
function mouse_down(event) {
	click = 1
}
//this function triggers when the mouse button is lifted
function mouse_up(event) {	
	click = 0
}

//load DEM - NOTE: DEM must be in csv format and must not have any holes. Haven't found a way to import data otherwise. (FIGURE OUT BETTER SOLUTION?)
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/assets/data/trout_coarse10.csv",
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});

//make rain array, area arrays
//rain array is where the user clicks, area area shows the rivers
//also fill the data array with dem data
var diffuse = [];
for(var i=0; i<M; i++) {
    diffuse[i] = [];
    for(var j=0; j< N; j++) {
		diffuse[i][j]=0.0;
		data[i][j] = parseFloat(data[i][j]);//convert string to numbers
    }
}

var data_old = JSON.parse(JSON.stringify(data));

max_elevation = 0.0;
min_elevation = 100000000.0;
//find max value, which i used to normalize the data
for(var i=0; i<M; i++) {
	for(var j=0; j< N; j++) {
		if (data[i][j]>max_elevation){max_elevation=data[i][j]};
		if (data[i][j]<min_elevation){min_elevation=data[i][j]};
	}
}
relief = max_elevation - min_elevation;

//main function that runs over the page
function draw_data(){
	// if moused is clicked, this is where it rains
	if (click == 1){
		for(var i=0; i<M; i++) {
			for(var j=0; j< N; j++) {
				if (Math.pow(x_click - i,2.0) + Math.pow(y_click - j,2.0) < Math.pow(rad,2.0)){
					diffuse[i][j]=1
				}
			}
		}
	}

	for(var i=0; i<N; i++) {
		for(var j=0; j<M; j++) {
			if(diffuse[i][j] == 1){
				Ncell = i + 1;
				if (Ncell>=M){Ncell=M-1}
				Wcell = j - 1;
				if (Wcell<0){Wcell=0}
				Ecell = j + 1;
				if (Ecell>=N){Ecell=N-1}
				Scell = i - 1;
				if (Scell<0){Scell=0}
				
				Neta = data_old[Ncell][j]
				Seta = data_old[Scell][j]
				Weta = data_old[i][Wcell]
				Eeta = data_old[i][Ecell]
				eta = data_old[i][j]

				data[i][j] += D * dt_lem * ((Neta - 2.0 * eta + Seta)/dx/dx+(Weta - 2.0 * eta + Eeta)/dx/dx);	
			}	
		}
	}
	
	//this normalizes the data and makes the range of values from 0 to 255 (8bit data), sets the image pixel data.
	for(var j=0; j<M; j++) {
		for(var i=0; i< N; i++) {
			for (var m=0; m < scale; m++){ 
				for (var n=0; n <scale; n++){
					pixelindex = (i * scale + j * scale * canvas.width + m + n * canvas.width) * 4; 
					gray = (data[i][N-j-1] - min_elevation) / relief 		
					imagedata.data[pixelindex] = 255*terrain[Math.round(gray*255)][0]
					imagedata.data[pixelindex+1] = 255*terrain[Math.round(gray*255)][1]
					imagedata.data[pixelindex+2] = 255*terrain[Math.round(gray*255)][2]
					imagedata.data[pixelindex+3] = 255	
				}
			}
		}
	}
	
	//resets all the boundaries to zero, and sets the old area array as the new area array for the next timestep
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			data_old[i][j] = data[i][j];
			diffuse[i][j] = 0;
		}
	}
	
	
	//this draws the array data as an pixel image
	ctx.putImageData(imagedata, 0, 0);

	ctx.beginPath();
	ctx.arc(x_circ , y_circ - (N-j-1), rad, 0, 2 * Math.PI, false);
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#000000';
	ctx.stroke();
}	

//This runs "draw_data" continuously every dt (milliseconds)
setInterval(draw_data, dt);