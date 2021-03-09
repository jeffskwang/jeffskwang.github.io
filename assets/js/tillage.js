var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var dx = 100.
var dt = 25
var D = 0.5
var pixelindex = 0;
var M = 100; //data dimensions
var N = 100;
var skip = 50;
var skip_int =0;
var scalex = canvas.width/M;
var scaley = canvas.height/N;
var imagedata = ctx.createImageData(canvas.width, canvas.height);

//define the x and y coordinates of the mouse
var x_click = 0;
var y_click = 0;

//determines is the mouse button is pressed
var click = 0;

//this function determines where the mouse is on the canvas
function tracktor_location(event){
	x_click = Math.trunc(event.offsetX/scalex);
}

//this function triggers when the mouse button is pressed
function mouse_down(event) {
	click = 1
}
//this function triggers when the mouse button is lifted
function mouse_up(event) {	
	click = 0
}

var eta_2D = [];
var x = [];
var z_old = [];
var z_new = [];
var z_show_new = [];
var z_show_old = [];
for(var i=0; i<M; i++) {
    x[i] = parseFloat(i) * dx;
    z_old[i] = Math.sin(3.14519 / 2.0 * x[i] / (dx * 20.));
    z_new[i] = Math.sin(3.14519 / 2.0 * x[i] / (dx * 20.));
    z_show_old[i] = Math.sin(3.14519 / 2.0 * x[i] / (dx * 20.));
    z_show_new[i] = Math.sin(3.14519 / 2.0 * x[i] / (dx * 20.));
}

var tracktor_till_loc = 0
var d_track = 1
//main function
function draw_data(){
	skip_int+=1
	///if (click == 1){
	///	if (x_click != tracktor_till_loc){
	//		z[x_click] += D * (z[x_click-1]-2.0*z[x_click]+z[x_click+1])
	//	}
	//}
	z_new[0] = z_old[0] + D * (- 1.0 * z_old[0] + z_old[1]);
	z_new[M-1] = z_old[M-1] + D * (z_old[M-2] - 1.0 * z_old[M-1]);
	for(var i=1; i<M-1; i++) {
		z_new[i] = z_old[i] + D * (z_old[i-1] - 2.0 * z_old[i] + z_old[i+1]);
	}
	for(var i=0; i<M; i++) {
		z_old[i] = z_new[i];
	}
	
	
	
	//this normalizes the data and makes the range of values from 0 to 255 (8bit data)
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			for (var m=0; m < scalex; m++){ 
				for (var n=0; n <scaley; n++){
					pixelindex = (i * scalex + j * scaley * canvas.width + m + n * canvas.width) * 4;  
					if (parseFloat(N-1-j) < (z_show_old[i] * 30. + 30.)){
					imagedata.data[pixelindex] = 150; //Red
					imagedata.data[pixelindex+1] = 75; //Green
					imagedata.data[pixelindex+2] = 0; //Blue
					imagedata.data[pixelindex+3] = 255; //Alpha	
					}
					else{
					imagedata.data[pixelindex] = 10; //Red
					imagedata.data[pixelindex+1] = 10; //Green
					imagedata.data[pixelindex+2] = 255; //Blue
					imagedata.data[pixelindex+3] = 100; //Alpha	
					}
				}
			}
		}
	}	
	//this draws the array data as an pixel image
	if (skip_int == skip){
		skip_int = 0
		for(var i=0; i<M; i++) {
			z_show_new[i] = z_old[i];
		}
		d_track *= -1
	}
	if (d_track == 1){
		z_show_old[skip_int*2] = z_show_new[skip_int*2]
		z_show_old[skip_int*2+1] = z_show_new[skip_int*2+1]
	}
	else if (d_track == -1){
		z_show_old[M-1-skip_int*2] = z_show_new[M-1-skip_int*2]
		z_show_old[M-1-skip_int*2+1] = z_show_new[M-1-skip_int*2+1]
	}
	ctx.putImageData(imagedata, 0, 0);
	
}	

//This runs "draw_data" continuously every dt (milliseconds)
setInterval(draw_data, dt);