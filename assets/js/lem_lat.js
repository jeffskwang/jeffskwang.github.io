var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");	
var dt = 1
var dx = 50.
var D = 1.0
var pixelindex = 0;
var max_elevation = 0;
var max_area = 0;
var M = 74; //data dimensions
var N = 74;
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

//LEM parameters
var U = 0.001 //m/yr
var dt_lem = 500. // yr
var K_SPL = 0.00001 // yr^-1
var m_SPL = 0.5
var n_SPL = 1.0

var click = 0
var start = 0

var print_bug = 1

function bug(to_write){
	if (print_bug == 1){
		print_bug = 0
		document.write(to_write)
	}
}
function mouse_loc(event){
	x_click = Math.trunc(event.offsetX/scale);
	y_click = N - 1 - Math.trunc(event.offsetY/scale);
}

//this function triggers when the mouse button is pressed
function draw_on(event){
	click = 1
}
//this function triggers when the mouse button is lifted
function draw_off(event) {	
	click = 0
}

//this function triggers when the mouse leaves canvas
function start_sim(event) {	
	start = 1
	click = 0
}

//this function triggers when the mouse enters canvas
function start_draw(event) {	
	start = 0
}


//make river matrix <- this is what the user draws
var rain = [];
var areaold = [];
var areanew = [];
var arealat = [];
var data = [];
var direction= [];
var slope = [];
var lat_incision = [];
var lat_incision_threshold = [];
for(var i=0; i<M; i++) {
    rain[i] = [];
    areaold[i] = [];
    areanew[i] = [];
    arealat[i] = [];
	data[i] = [];
	direction[i] = [];
	slope[i] = [];
	lat_incision[i] = [];
	lat_incision_threshold[i] = [];
    for(var j=0; j< N; j++) {
		rain[i][j]=0.0;
		areaold[i][j] = 0.0;
		areanew[i][j] = 0.0;
		arealat[i][j] = 0.0;
		direction[i][j] = 0;
		slope[i][j] = 0.0;
		lat_incision[i][j] = 0.0;
		lat_incision_threshold[i][j] = 0.0;
		if (j == 0){data[i][j] = 0.0}
		else {data[i][j] = Math.random()*0.01 + 10.0;}
    }
}

var data_old = JSON.parse(JSON.stringify(data));
var x_neighbor = [-1,0,1,-1,1,-1,0,1]
var y_neighbor = [1,1,1,0,0,-1,-1,-1]
var dop = [7,6,5,4,3,2,1,0]
//lateral dictionary
lateral_nodes = {'11': [3,4,0.23/dx],
                 '33': [1,6,0.23/dx],
                 '44': [1,6,0.23/dx],
                 '66': [3,4,0.23/dx],
                 '13': [1,1,1.37/dx],
                 '14': [1,1,1.37/dx],
                 '41': [4,4,1.37/dx],
                 '46': [4,4,1.37/dx],
                 '63': [6,6,1.37/dx],
                 '64': [6,6,1.37/dx],
                 '31': [3,3,1.37/dx],
                 '36': [3,3,1.37/dx],
                 '10': [1,1,0.67/dx],
                 '12': [1,1,0.67/dx],
                 '42': [4,4,0.67/dx],
                 '47': [4,4,0.67/dx],
                 '65': [6,6,0.67/dx],
                 '67': [6,6,0.67/dx],
                 '30': [3,3,0.67/dx],
                 '35': [3,3,0.67/dx],
                 '00': [1,3,0.23/dx],
                 '22': [1,4,0.23/dx],
                 '55': [3,6,0.23/dx],
                 '77': [4,6,0.23/dx],
                 '02': [1,1,1.37/dx],
                 '05': [3,3,1.37/dx],
                 '20': [1,1,1.37/dx],
                 '27': [4,4,1.37/dx],
                 '50': [3,3,1.37/dx],
                 '57': [6,6,1.37/dx],
                 '72': [4,4,1.37/dx],
                 '75': [6,6,1.37/dx],
                 '01': [3,3,0.67/dx],
                 '03': [1,1,0.67/dx],
                 '21': [4,4,0.67/dx],
                 '24': [1,1,0.67/dx],
                 '53': [6,6,0.67/dx],
                 '56': [3,3,0.67/dx],
                 '74': [6,6,0.67/dx],
                 '76': [4,4,0.67/dx]
				 }
var d_in_max = -9999;	
var discharge_max = 0.0;	
var i_in = 0;
var j_in = 0;	
var min_k = 0;	 
var lat_code = '';

//main function
function draw_data(){
	if (start == 0){//erase everything
		for(var i=0; i<M; i++) {
			for(var j=0; j< N; j++) {
			rain[i][j]=0.0;
			areaold[i][j] = 0.0;
			areanew[i][j] = 0.0;
			slope[i][j] = 0.0;
			if (j == 0){data[i][j] = 0.0}
			else {data[i][j] = Math.random()*0.01 + 10.0;}
			}
		}
		start = 2 //standby mode
	}
	if (start == 2){
		if (click == 1){
			data[x_click][y_click]=0.0
		}
	}
	
	if (start == 1){
		//this loop runs the diffusion equation
		for(var i=0; i<M; i++) {
			for(var j=0; j< N; j++) {
				slope[i][j] = 0.0;
				areanew[i][j] += rain[i][j]+1.0;
				rain[i][j] = 0.0;
				minz = 100000.;
				minx = -1;
				miny = -1;
				min_k = -9999;	
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
							mink = k
						}
					}
				}
				//document.write(i,",",j,";!",minx,",",miny,"!;?",minz,"?","<br>")
				if (minx!=-1 && miny!=-1) {
					slope[i][j] = (data[i][j] - data[minx][miny]) / dx;
					areanew[minx][miny]+=areaold[i][j];
				}
				direction[i][j] = mink				
			}
		}
		
		for(var i=0; i<M; i++) {
			for(var j=1; j< N; j++) {
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
				
				data[i][j] += D * ((Neta - 2.0 * eta + Seta)/dx/dx+(Weta - 2.0 * eta + Eeta)/dx/dx);		
			}
		}
		
		for(var i=0; i<M; i++) {
			for(var j=0; j< N; j++) {
				lat_incision[i][j] = 0.0;
				arealat[i][j] = 10000000000000.0;
			}
		}
		for(var i=0; i<M; i++) {
			for(var j=1; j< N; j++) {
				d_in_max = -9999;	
				discharge_max = 0.0
				for (var k=0; k<8; k++){
					if (j!=0 && direction[i][j]!=-9999){
					i_in = i + x_neighbor[k];
					j_in = j + y_neighbor[k];
						if (i_in >= 0 && j_in >= 0 && i_in < M && j_in < N){
							if (direction[i_in][j_in] == dop[k]){
								if (areanew[i_in][j_in]>discharge_max){
									discharge_max = areanew[i_in][j_in]
									d_in_max = dop[k]
								}
								else if(areanew[i_in][j_in]==discharge_max){
									if (Math.random()>0.5){
										d_in_max = dop[k]									
									}
								}
							}
						}
					}
				}
				//bug(d_in_max)
				if (d_in_max!=-9999){
					if (j!=0 && direction[i][j]!=-9999){
						i_out = i + x_neighbor[direction[i][j]];
						j_out = j + y_neighbor[direction[i][j]];
						lat_code = String(d_in_max)+String(direction[i][j]);
						if (lat_code in lateral_nodes){
							if (Math.random()>0.5){
								i_lat = i + x_neighbor[lateral_nodes[lat_code][0]];
								j_lat = j + y_neighbor[lateral_nodes[lat_code][0]];
							}
							else {
								i_lat = i + x_neighbor[lateral_nodes[lat_code][1]];
								j_lat = j + y_neighbor[lateral_nodes[lat_code][1]];
							}
							if (i_lat >= 0 && j_lat >= 0 && i_lat < M && j_lat < N){
								if (data[i_lat][j_lat] > data[i][j]){
									flow_depth = 0.01 * Math.pow(areanew[i][j] * dx * dx,0.35);
									inverse_radius_curvature = lateral_nodes[lat_code][2];
									if (areanew[i][j] < arealat[i_lat][j_lat]){
										arealat[i_lat][j_lat] = areanew[i][j];
										lat_incision_threshold[i_lat][j_lat] = (data[i_lat][j_lat] - data [i_out][j_out])*dx*dx;									
									}
									lat_incision[i_lat][j_lat] += dt_lem * K_SPL * areanew[i][j] * dx * dx * slope[i][j] * inverse_radius_curvature * dx * flow_depth
								}
							}
						}
					}					
				}
				
			}
		}
		for(var i=0; i<M; i++) {
			for(var j=1; j< N; j++) {
				if (lat_incision[i][j] > lat_incision_threshold[i][j] && lat_incision[i][j] > 0.0){
					//document.write(lat_incision_threshold[i][j] / dx / dx)
					data[i][j] -= lat_incision_threshold[i][j] / dx / dx * 2.0;
					lat_incision[i][j] = 0.0;
				}
			}
		}
		
	}
	
	max_elevation = 0.0;
	max_area = M*N*0.25;
	//find max value, which i used to normalize the data
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			if (data[i][j]>max_elevation){max_elevation=data[i][j]};
		}
	}
	//document.write(typeof data[5][5],"<br>")
	//this normalizes the data and makes the range of values from 0 to 255 (8bit data)
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			for (var m=0; m < scale; m++){ 
				for (var n=0; n <scale; n++){
					pixelindex = (i * scale + j * scale * canvas.width + m + n * canvas.width) * 4;  
					
					alpha = 0.1*(areanew[i][N-j-1]/max_area)
					gray = data[i][N-j-1]/max_elevation
					imagedata.data[pixelindex] = 255*((1.-alpha)*1.0*gray+alpha*68./255.); //Red
					imagedata.data[pixelindex+1] = 255*((1.-alpha)*1.0*gray+alpha*176./255.); //Green
					imagedata.data[pixelindex+2] = 255*((1.-alpha)*1.0*gray+alpha*255./255.); //Blue
					imagedata.data[pixelindex+3] = 255*((1.-alpha)*1.0 + alpha); //Alpha			

				}
			}
		}
	}
	
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			areaold[i][j] = areanew[i][j];
			data_old[i][j] = data[i][j];
			if (j==0){
				areaold[i][j]=0.0;
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