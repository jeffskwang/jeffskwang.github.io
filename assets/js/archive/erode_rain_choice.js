var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");	
var dt = 1
var dx = 100.
var D = 0.01
var pixelindex = 0;
var max_elevation = 0;
var max_area = 0;
var M = 40; //data dimensions
var N = 40;
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

//steepest descent
var minx = -1
var miny = -1
var minz = 1000000.

//rain cloud radius
var rad = 5

//LEM parameters
var U = 0.001 //m/yr
var dt_lem = 500. // yr
var K_SPL = 0.00001 // yr^-1
var m_SPL = 0.5
var n_SPL = 1.0

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


//make river matrix <- this is what the user draws
var rain = [];
var areaold = [];
var areanew = [];
var data = [];
var slope = [];
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
		data[i][j] = Math.random();//convert string to numbers
    }
}

var data_old = JSON.parse(JSON.stringify(data));
var x_neighbor = [-1,0,1,-1,1,-1,0,1]
var y_neighbor = [1,1,1,0,0,-1,-1,-1]


//main function
function draw_data(){
	//this loop erodes a river into the landscape depending on where the mouse is
	if (click == 1){
		for(var i=0; i<M; i++) {
			for(var j=0; j< N; j++) {
				if (Math.pow(x_click - i,2.0) + Math.pow(y_click - j,2.0) < Math.pow(rad,2.0)){
					rain[i][j]= 5.0
				}
			}
		}
	}
	//this loop runs the diffusion equation
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
					//if (i==71 && j ==23){document.write("i=",i,",j=",j,",k=",k,",eta=",eta_neighbor,",minz=",minz,"<br>")}
					if (eta_neighbor<minz){
						//if (i==71 && j ==23){document.write("MEOW!","<br>")}
						minz = eta_neighbor;
						minx = i_neighbor;
						miny = j_neighbor;
					}
				}
			}
			//document.write(i,",",j,";!",minx,",",miny,"!;?",minz,"?","<br>")
			if (minx!=-1 && miny!=-1) {
				slope[i][j] = (data[i][j] - data[minx][miny]) / dx;
				areanew[minx][miny]+=areaold[i][j];
			}
			
		}
	}
	
	for(var i=0; i<M; i++) {
		for(var j=1; j< N; j++) {
			data[i][j] = data_old[i][j] + dt_lem*(U - K_SPL * Math.pow(areanew[i][j]*dx*dx,m_SPL) * Math.pow(slope[i][j],n_SPL));	
		
		}
	}
	
	max_elevation = 0.0;
	max_area = 0.0
	//find max value, which i used to normalize the data
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			if (data[i][j]>max_elevation){max_elevation=data[i][j]};
			if (areanew[i][j]>max_area){max_area=areanew[i][j]};
		}
	}
	//document.write(typeof data[5][5],"<br>")
	//this normalizes the data and makes the range of values from 0 to 255 (8bit data)
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			for (var m=0; m < scale; m++){ 
				for (var n=0; n <scale; n++){
					pixelindex = (i * scale + j * scale * canvas.width + m + n * canvas.width) * 4;  
					
					if (areanew[i][N-j-1]>(M*N*.1)){
					imagedata.data[pixelindex] = 150 * (1. - areanew[i][N-j-1]/max_area); //Red
					imagedata.data[pixelindex+1] = 150 * (1. - areanew[i][N-j-1]/max_area); //Green
					imagedata.data[pixelindex+2] = 255; //Blue
					imagedata.data[pixelindex+3] = 255; //Alpha				
					}
					else{
					imagedata.data[pixelindex] = data[i][N-j-1]/max_elevation*255; //Red
					imagedata.data[pixelindex+1] = data[i][N-j-1]/max_elevation*255; //Green
					imagedata.data[pixelindex+2] = data[i][N-j-1]/max_elevation*255; //Blue
					imagedata.data[pixelindex+3] = 255; //Alpha
					}
				}
			}
		}
	}
	
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			areaold[i][j] = areanew[i][j];
			data_old[i][j] = data[i][j];
			if (j==0){areaold[i][j]=0.0;
				data_old[i][j] = 0.0;
			}
			areanew[i][j] = 0.0;
		}
	}
	
	
	//this draws the array data as an pixel image
	ctx.putImageData(imagedata, 0, 0);
}	

//This runs "draw_data" continuously every dt (milliseconds)
setInterval(draw_data, dt);