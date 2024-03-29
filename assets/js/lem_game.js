var canvas = document.getElementById("myCanvas");

var d_slider = document.getElementById("d_Range");
document.getElementById('d_output').innerHTML = (Math.pow(10.,d_slider.value / 2.)).toPrecision(2)

var u_slider = document.getElementById("u_Range");
document.getElementById('u_output').innerHTML = (u_slider.value*0.2).toPrecision(1)

var k_slider = document.getElementById("k_Range");
document.getElementById('k_output').innerHTML = Math.pow(10.,k_slider.value / 2.).toPrecision(2)

var button = document.getElementById("start_model");

var top_bc = document.getElementById("top_bc_checkbox")
var bottom_bc = document.getElementById("bottom_bc_checkbox")
var left_bc = document.getElementById("left_bc_checkbox")
var right_bc = document.getElementById("right_bc_checkbox")

var ctx = canvas.getContext("2d");
var max_canvas_size = 400	
var dx = 25.
var D = (Math.pow(10.,d_slider.value / 2.))
var pixelindex = 0;
var max_elevation = 0;
var max_area = 0;
var rows = document.getElementById('input_rows')
var columns = document.getElementById('input_columns')

var M = Number(columns.value) //data dimensions
var N = Number(rows.value);
if (M >= N){var scale = Math.floor(max_canvas_size/M)}
else if (N > M) {var scale = Math.floor(max_canvas_size/N)}
ctx.canvas.width = M * scale
ctx.canvas.height = N * scale
var imagedata = ctx.createImageData(ctx.canvas.width, ctx.canvas.height)

//define variables for the neighbor cells in the diffusion model
var Ncell = 0;
var Scell = 0;
var Wcell = 0;
var Ecell = 0;

//define the x and y coordinates of the mouse
var x_click = 0;
var y_click = 0;

//determines is the mouse button is pressed
var click = 0;

//steepest descent
var minx = -1
var miny = -1
var minz = 1000000.

//Allow deposition?
var deposition = false

//LEM parameters
var U = (u_slider.value*0.0002) //m/yr
var dt_lem = 500. // yr
var K_SPL = Math.pow(10.,k_slider.value / 2.).toPrecision(1) // yr^-1
var m_SPL = 0.5
var n_SPL = 1.0

var start = 0

var time_start = new Date()
var time_measure
var dt_measure = 0.0

var shakeup = 0
var regrid = 1

var i_start = 0
var i_end = M
var j_start = 0
var j_end = N

document.getElementById('congrats').innerHTML = "Press the button"

d_slider.onchange = function(event){
  D = (Math.pow(10.,d_slider.value / 2.));
  document.getElementById('d_output').innerHTML = D.toPrecision(2)
  shakeup = 1
}

u_slider.onchange = function(event){
  U = (u_slider.value*0.0002);
  document.getElementById('u_output').innerHTML = (1000*U).toPrecision(1)
}

k_slider.onchange = function(event){
  K_SPL = Math.pow(10.,k_slider.value / 2.);
  document.getElementById('k_output').innerHTML = K_SPL.toPrecision(2)
  shakeup = 1
  dt_lem = 500. * 0.00001 / K_SPL 
}

button.onclick = function(event){start=1;
	document.getElementById('congrats').innerHTML = "Congratulations! You are a modeler!";
	regrid = 1;
	if (max_canvas_size<Number(columns.value)){columns.value=max_canvas_size}
	if (max_canvas_size<Number(rows.value)){rows.value=max_canvas_size}
	M = Number(columns.value) //data dimensions
	N = Number(rows.value);
	if (M>=N){scale = Math.floor(max_canvas_size/M)}
	else if (N>M) {scale = Math.floor(max_canvas_size/N)}
	ctx.canvas.width = M * scale
	ctx.canvas.height = N * scale
	imagedata = ctx.createImageData(ctx.canvas.width, ctx.canvas.height)
	i_start = 0
	i_end = M
	j_start = 0
	j_end = N
	if (bottom_bc.checked == true){j_start = 1}
	if (top_bc.checked == true){j_end = N-1}
	if (left_bc.checked == true){i_start = 1}
	if (right_bc.checked == true){i_end = M-1}
	}

//make river matrix <- this is what the user draws
var rain = [];
var areaold = [];
var areanew = [];
var data = [];
var slope = [];

var data_old = JSON.parse(JSON.stringify(data));
var x_neighbor = [-1,0,1,-1,1,-1,0,1]
var y_neighbor = [1,1,1,0,0,-1,-1,-1]

//main function
function draw_data(){
	if (regrid == 1){regrid=0;
		rain = [];
		areaold = [];
		areanew = [];
		data = [];
		slope = [];
		for(var i=0; i<M; i++) {
		    rain[i] = [];
		    areaold[i] = [];
		    areanew[i] = [];
			data[i] = [];
			slope[i] = [];
		    for(var j=0; j< N; j++) {
				rain[i][j]=0.0;
				areaold[i][j] = 0.0;
				areanew[i][j] = 0.0;
				slope[i][j] = 0.0;
				if (i == 0){data[i][j] = 0.0}
				else if (i == M-1){data[i][j] = 0.0}
				else if (j == 0){data[i][j] = 0.0}
				else if (j == N-1){data[i][j] = 0.0}
				else {data[i][j] = Math.random()*0.01;}
		    }
		}
		data_old = JSON.parse(JSON.stringify(data));
	}

	if (start == 1){
		time_measure = new Date() - time_start
		dt_measure += dt_lem
		if (time_measure>1000){time_start = new Date();
			document.getElementById('time_per_second').innerHTML = (dt_measure/time_measure).toPrecision(3);
			dt_measure = 0.0}

		//Determine Drainage Area and Slope
		for(var i=0; i<M; i++) {
			for(var j=0; j< N; j++) {
				slope[i][j] = 0.0;
				areanew[i][j] += rain[i][j]+1.0;
				rain[i][j] = 0.0;
				minz = 100000.;
				minx = -1;
				miny = -1;
				for (var k=0; k<8; k++){
					i_neighbor = i + x_neighbor[k];
					j_neighbor = j + y_neighbor[k];
					eta_neighbor = 0.0
					if (i_neighbor == - 1){eta_neighbor = 9999.}
					if (i_neighbor == M){eta_neighbor = 9999.}
					if (j_neighbor == - 1){eta_neighbor = 9999.}
					if (j_neighbor == N){eta_neighbor = 9999.}
					if (eta_neighbor != 9999.){
						eta_neighbor = data[i_neighbor][j_neighbor];
						if (eta_neighbor<minz){
							minz = eta_neighbor;
							minx = i_neighbor;
							miny = j_neighbor;
							}
						}
					}
				if (minx!=-1 && miny!=-1) {
					slope[i][j] = (data[i][j] - data[minx][miny]) / dx;
					areanew[minx][miny]+=areaold[i][j];
				}
			}
		}
		
		for(var i=i_start; i<i_end; i++) {
			for(var j=j_start; j<j_end; j++) {
				if (areanew[i][j] > M*N){areanew[i][j]= M*N}
				data[i][j] = data_old[i][j] + dt_lem*(U - K_SPL * Math.pow(areanew[i][j]*dx*dx,m_SPL) * Math.pow(slope[i][j],n_SPL));	
				
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

				curvature = (Neta - 2.0 * eta + Seta)/dx/dx+(Weta - 2.0 * eta + Eeta)/dx/dx
				if (deposition == false && curvature > 0.0){curvature=0.0}
				data[i][j] += D * dt_lem * curvature;		
			}
		}
	}

	if (shakeup==1){shakeup=0;
	  for(var i=1; i<M-1; i++) {
			for(var j=1; j< N-1; j++) {
				data[i][j] += Math.random()*max_elevation*0.05;
			}
		}
	}
	
	max_elevation = 0.0;
	max_area = M*N*dx*dx;
	//find max value, which i used to normalize the data
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			if (data[i][j]>max_elevation){max_elevation=data[i][j]};
		}
	}
	document.getElementById('max_ele').innerHTML = max_elevation.toPrecision(4)
	document.getElementById('basin_area').innerHTML = (max_area/1000/1000).toPrecision(3)

	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			for (var m=0; m < scale; m++){ 
				for (var n=0; n <scale; n++){
					pixelindex = (i * scale + j * scale * ctx.canvas.width + m + n * ctx.canvas.width) * 4;  
					
					alpha = 0.0//1.0*(areanew[i][N-j-1]/max_area)
					gray = data[i][N-j-1]/max_elevation
					imagedata.data[pixelindex] = 255*viridis[Math.round(gray*255)][0]
					imagedata.data[pixelindex+1] = 255*viridis[Math.round(gray*255)][1]
					imagedata.data[pixelindex+2] = 255*viridis[Math.round(gray*255)][2]
					imagedata.data[pixelindex+3] = 255	
				}
			}
		}
	}
	
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			areaold[i][j] = areanew[i][j];
			data_old[i][j] = data[i][j];
			areanew[i][j] = 0.0;
		}
	}
			
	//this draws the array data as an pixel image
	ctx.putImageData(imagedata, 0, 0);
}	

//This runs "draw_data" continuously every dt (milliseconds)
setInterval(draw_data);