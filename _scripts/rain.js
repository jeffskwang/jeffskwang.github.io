var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");	
var dt = 1
var D = 0.001
var pixelindex = 0;
var max_elevation = 0;
var max_area = 0;
var M = 100; //data dimensions
var N = 100;
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
var rad = 10

//touchscreen enabled
canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);


//this function determines where the mouse is on the canvas
function rain_loc(event){
	x_click = Math.trunc(event.offsetX/scale);
	y_click = N - 1 - Math.trunc(event.offsetY/scale);
}

//this function triggers when the mouse button is pressed
function erode_down(event) {
	click = 1
}
//this function triggers when the mouse button is lifted
function erode_up(event) {	
	click = 0
}

//load DEM
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/_data/elevation_000100.csv",
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});

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



function diffusion(){
	//copy and initialize old data
	var data_old = JSON.parse(JSON.stringify(data));
	for(var i=1; i<M-1; i++) {
		for(var j=1; j< N-1; j++) {
			Ncell = i + 1;
			Wcell = j - 1;
			Ecell = j + 1;
			Scell = i - 1;
			
			Neta = parseFloat(data_old[Ncell][j])
			Seta = parseFloat(data_old[Scell][j])
			Weta = parseFloat(data_old[i][Wcell])
			Eeta = parseFloat(data_old[i][Ecell])
			eta = parseFloat(data_old[i][j])
			
			data[i][j] = eta + D * ((Neta - 2.0 * eta + Seta)+(Weta - 2.0 * eta + Eeta));
		}
	}
}

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
				if (minx!=-1 && miny!=-1) {areanew[minx][miny]+=areaold[i][j]}
			}
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
					
					if (areanew[i][N-j-1]>0.0){
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
			if (j==0){areaold[i][j]=0.0}
			areanew[i][j] = 0.0;
		}
	}
	
	
	//this draws the array data as an pixel image
	ctx.putImageData(imagedata, 0, 0);
}	

//This runs "draw_data" continuously every dt (milliseconds)
setInterval(draw_data, dt);