var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");	
var dt = 1
var D = 0.001
var pixelindex = 0;
var max_elevation = 0;
var max_area = 0;
var alpha = 1.0
var gray = 1.0
var M = 190; //data dimensions
var N = 190;
var scale = canvas.width/M;
var imagedata = ctx.createImageData(canvas.width, canvas.height);

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
var alpha_cloud = 0.2

//steepest descent
var minx = -1
var miny = -1
var maxz = -100.

//rain cloud radius
var rad = 15

//this function determines where the mouse is on the canvas
function rain_loc(event){
	x_click = Math.trunc(event.offsetX/scale);
	y_click = N - 1 - Math.trunc(event.offsetY/scale);
}

//this function triggers when the mouse button is pressed
function mouse_down(event) {
	click = 1
}
//this function triggers when the mouse button is lifted
function mouse_up(event) {	
	click = 0
}

//load DEM
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/_data/trout_coarse15.csv",
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});


//load render
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/_data/trout_render.csv",
    async: false,
    success: function (csvd) {
        render = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});

//read in render image
for(var i=0; i<canvas.width; i++) {
    for(var j=0; j<canvas.height; j++) {
		render[i][j] = parseFloat(render[i][j]);//convert string to numbers
    }
}

//make river matrix <- this is what the user draws
var rain = [];
var areaold = [];
var areanew = [];
for(var i=0; i<M; i++) {
    rain[i] = [];
    areaold[i] = [];
    areanew[i] = [];
    for(var j=0; j< N; j++) {
		rain[i][j]=0.0;
		areaold[i][j] = 0.0;
		areanew[i][j] = 0.0;
		data[i][j] = parseFloat(data[i][j]);//convert string to numbers
    }
}

var x_neighbor = [-1,0,1,-1,1,-1,0,1]
var y_neighbor = [1,1,1,0,0,-1,-1,-1]
var dx_neighbor = [Math.pow(2.0,0.5),1,Math.pow(2.0,0.5),1,1,Math.pow(2.0,0.5),1,Math.pow(2.0,0.5)]

//main function
function draw_data(){
	//this loop erodes a river into the landscape depending on where the mouse is
	if (click == 1){
		for(var i=0; i<M; i++) {
			for(var j=0; j< N; j++) {
				if (Math.pow(x_click - i,2.0) + Math.pow(y_click - j,2.0) < Math.pow(rad,2.0)){
					rain[i][j]=1
				}
			}
		}
	}
	//this loop runs the diffusion equation
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			areanew[i][j] += rain[i][j]
			rain[i][j] = 0.0;
			if (areaold[i][j]>0){
				maxz = -100.;
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
						eta_neighbor = (data[i][j] - data[i_neighbor][j_neighbor]) / dx_neighbor[k];
						if (eta_neighbor>maxz){
							maxz = eta_neighbor;
							minx = i_neighbor;
							miny = j_neighbor;
						}
					}
				}
				//document.write(i,",",j,";!",minx,",",miny,"!;?",minz,"?","<br>")
				if (minx!=-1 && miny!=-1) {areanew[minx][miny]+=areaold[i][j]}
			}
		}
	}
		
	min_elevation = 100000000.0;
	max_elevation = 0.0;
	max_area = 0.0
	//find max value, which i used to normalize the data
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			if (data[i][j]>max_elevation){max_elevation=data[i][j]};
			if (data[i][j]<min_elevation){min_elevation=data[i][j]};
			if (areanew[i][j]>max_area){max_area=areanew[i][j]};
		}
	}
	//document.write(typeof data[5][5],"<br>")
	//this normalizes the data and makes the range of values from 0 to 255 (8bit data)
	for(var j=0; j<M; j++) {
		for(var i=0; i< N; i++) {
			for (var m=0; m < scale; m++){ 
				for (var n=0; n <scale; n++){
					pixelindex = (i * scale + j * scale * canvas.width + m + n * canvas.width) * 4;  					
					if (areanew[i][N-j-1]>0.0){
						alpha = 0.5+1.0*(areanew[i][N-j-1]/max_area)
						gray = render[i*scale+m][canvas.height-1-(j*scale+n)]
						imagedata.data[pixelindex] = 255*((1.-alpha)*1.0*gray+alpha*68./255.); //Red
						imagedata.data[pixelindex+1] = 255*((1.-alpha)*1.0*gray+alpha*176./255.); //Green
						imagedata.data[pixelindex+2] = 255*((1.-alpha)*1.0*gray+alpha*255./255.); //Blue
						imagedata.data[pixelindex+3] = 255*(((1.-alpha)*1.0 + alpha)+alpha_cloud); //Alpha			
					}
					else{
						if (Math.pow(x_click - i,2.0) + Math.pow(y_click - (N-j-1),2.0) < Math.pow(rad,2.0)){
						imagedata.data[pixelindex] = (1.-alpha_cloud)*render[i*scale+m][canvas.height-1-(j*scale+n)]*255; //Red
						imagedata.data[pixelindex+1] = (1.-alpha_cloud)*render[i*scale+m][canvas.height-1-(j*scale+n)]*255; //Green
						imagedata.data[pixelindex+2] = (1.-alpha_cloud)*render[i*scale+m][canvas.height-1-(j*scale+n)]*255; //Blue
						imagedata.data[pixelindex+3] = 255*((1.-alpha_cloud)*1.0+alpha_cloud); //Alpha						
						}
						else{

						imagedata.data[pixelindex] = render[i*scale+m][canvas.height-1-(j*scale+n)]*255; //Red
						imagedata.data[pixelindex+1] = render[i*scale+m][canvas.height-1-(j*scale+n)]*255; //Green
						imagedata.data[pixelindex+2] = render[i*scale+m][canvas.height-1-(j*scale+n)]*255; //Blue
						imagedata.data[pixelindex+3] = 255; //Alpha
						}
					}
				}
			}
		}
	}
	
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			areaold[i][j] = areanew[i][j];
			if (j==0){areaold[i][j]=0.0}
			if (i==0){areaold[i][j]=0.0}
			if (j==M-1){areaold[i][j]=0.0}
			if (i==N-1){areaold[i][j]=0.0}
			areanew[i][j] = 0.0;
		}
	}
	
	
	//this draws the array data as an pixel image
	ctx.putImageData(imagedata, 0, 0);
}	

//This runs "draw_data" continuously every dt (milliseconds)
setInterval(draw_data, dt);