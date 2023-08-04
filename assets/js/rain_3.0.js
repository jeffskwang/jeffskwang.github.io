//MARCH 5th update more commenting

//get the canvas from the home page layout
var canvas = document.getElementById("RainCanvas");

//get the context of the canvas, 2d
var ctx = canvas.getContext("2d");

//set the time step	
var dt = 1

//pixel index for printing the images
var pixelindex = 0;

//initialize alpha value for mixing water and topography image
var alpha = 1.0

//initalize rgb scale image for topography
var red = 1.0
var green = 1.0
var blue = 1.0

//aerial/dem button dimensions in pixels
var button_x = 100;
var button_y = 30;
var button_face_color = [248,100,30,255];
var button_shadow_color = [150,60,15,255];
var button_shadow_offset = 5
var button_text = "Aerial/DEM"
var button_click = 0 
var image_mode = 0 
ctx.textAlign = "center";

//cloud buttons dimensions in pixels
var cloud_button_x = 45;
var cloud_button_y = 30;
var cloud_button_space = 5;
var minus_button_face_color = [25, 100, 204,255];
var minus_button_shadow_color = [15, 65, 135,255];
var plus_button_face_color = [236, 41, 19 ,255];
var plus_button_shadow_color = [156, 25, 10 ,255];
var plus_button_click = 0 
var minus_button_click = 0 

//dimensions of the data 190 x 190 cells
var M = 200;
var N = 203;

//set the scale up of the canvas vs. the width of the data. MUST BE A WHOLE NUMBER
var scale = canvas.width/M;

//set pixel data over the canvas (R,G,B,A) values for each pixel
var imagedata = ctx.createImageData(canvas.width, canvas.height);

//define the x and y coordinates of the mouse
var x_click = 0;
var y_click = 0;

//determines is the mouse button is pressed
var click = 0;

//alpha value of the cloud
var alpha_cloud = 0.2

//rain cloud radius
var rad = 11

//this function determines where the mouse is on the canvas
function rain_loc(event){
	x_click = Math.trunc(event.offsetX/scale);
	y_click = N - 1 - Math.trunc(event.offsetY/scale);
}

//this function triggers when the mouse button is pressed
function mouse_down(event) {
	//DEM/AERIAL button NEXT IS CLOUD SIZE BUTTON
	if (event.offsetY >= 0 & event.offsetY < button_y & event.offsetX >= canvas.width-button_x-button_shadow_offset & event.offsetX < canvas.width-button_shadow_offset){
		button_click = 1
	}
	else if (event.offsetY >= canvas.height - button_shadow_offset - cloud_button_y & event.offsetY < canvas.height - button_shadow_offset & event.offsetX >= canvas.width-2.0*cloud_button_x-2.0*button_shadow_offset-cloud_button_space & event.offsetX < canvas.width-1.0*cloud_button_x-2.0*button_shadow_offset-cloud_button_space){
		minus_button_click = 1
	}
	else if (event.offsetY >= canvas.height - button_shadow_offset - cloud_button_y & event.offsetY < canvas.height - button_shadow_offset & event.offsetX >= canvas.width-1.0*cloud_button_x-1.0*button_shadow_offset & event.offsetX < canvas.width-1.0*button_shadow_offset){
		plus_button_click = 1
	}
	else{click = 1}
}

//this function triggers when the mouse button is lifted
function mouse_up(event) {	
	click = 0
}

//load direction
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/assets/data/flow_dir_8bit.csv",
    async: false,
    success: function (csvd) {
        fdir = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});

//load rendered image (red-band)
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/assets/data/render_R_8bit.csv",
    async: false,
    success: function (csvd) {
        render_R = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});

//load rendered image (green-band)
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/assets/data/render_G_8bit.csv",
    async: false,
    success: function (csvd) {
        render_G = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});

//load rendered image (blue-band)
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/assets/data/render_B_8bit.csv",
    async: false,
    success: function (csvd) {
        render_B = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});

//load rendered image (red-band)
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/assets/data/aerial_R_8bit.csv",
    async: false,
    success: function (csvd) {
        aerial_R = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});

//load rendered image (green-band)
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/assets/data/aerial_G_8bit.csv",
    async: false,
    success: function (csvd) {
        aerial_G = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});

//load rendered image (blue-band)
$.ajax({
    url: "https://raw.githubusercontent.com/jeffskwang/jeffskwang.github.io/main/assets/data/aerial_B_8bit.csv",
    async: false,
    success: function (csvd) {
        aerial_B = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
    }
});

//read in render image
for(var i=0; i<canvas.width; i++) {
    for(var j=0; j<canvas.height; j++) {
		render_R[i][j] = parseFloat(render_R[i][j])/255.;//convert string to numbers
		render_G[i][j] = parseFloat(render_G[i][j])/255.;//convert string to numbers
		render_B[i][j] = parseFloat(render_B[i][j])/255.;//convert string to numbers
		aerial_R[i][j] = parseFloat(aerial_R[i][j])/255.;//convert string to numbers
		aerial_G[i][j] = parseFloat(aerial_G[i][j])/255.;//convert string to numbers
		aerial_B[i][j] = parseFloat(aerial_B[i][j])/255.;//convert string to numbers
    }
}

//make rain array, area arrays
//rain array is where the user clicks, area area shows the rivers
//also fill the data array with dem data
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
		fdir[i][j] = parseFloat(fdir[i][j]);//convert string to numbers
    }
}

//parameters decribing where the neighbors are in (x,y) index space, dx_neighbor is distance to the corresponding neighbor
//qgis dir map
// 3 2 1
// 4 x 8
// 5 6 7
var x_neighbor = [0,1,0,-1,-1,-1,0,1,1]
var y_neighbor = [0,1,1,1,0,-1,-1,-1,0]

//main function that runs over the page
function draw_data(){
	// if moused is clicked, this is where it rains
	if (click == 1){
		for(var i=0; i<M; i++) {
			for(var j=0; j< N; j++) {
				if (Math.pow(x_click - i,2.0) + Math.pow(y_click - j,2.0) < Math.pow(rad,2.0)){
					if (fdir[i][j] != 0){
						rain[i][j]=1;
					}
				}
			}
		}
	}

	//When the user presses the button and lets go
	if (button_click == 1 & click == 0){
		button_click = 0 //reset button
		image_mode = 1 - image_mode	//switch mode
	}

	//When the user presses the button and lets go
	if (plus_button_click == 1 & click == 0){
		plus_button_click = 0 //reset button
		rad += 5
		if (rad>101){rad=101}
	}

	//When the user presses the button and lets go
	if (minus_button_click == 1 & click == 0){
		minus_button_click = 0 //reset button
		rad -= 5
		if (rad<1){rad=1}
	}

	//this loop runs routes the flow one time step 
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			areanew[i][j] += rain[i][j]
			rain[i][j] = 0.0;
			if (areaold[i][j]>0){
				i_neighbor = i + x_neighbor[fdir[i][j]];
				j_neighbor = j + y_neighbor[fdir[i][j]];
 				areanew[i_neighbor][j_neighbor]+=areaold[i][j];
			}
		}
	}
	
	if (image_mode==0){
	//DEM -- this normalizes the data and makes the range of values from 0 to 255 (8bit data), sets the image pixel data. 
		for(var j=0; j<N; j++) {
			for(var i=0; i< M; i++) {
				for (var m=0; m < scale; m++){ 
					for (var n=0; n <scale; n++){
						pixelindex = (i * scale + j * scale * canvas.width + m + n * canvas.width) * 4;
						red = render_R[i*scale+m][canvas.height-1-(j*scale+n)]
						green = render_G[i*scale+m][canvas.height-1-(j*scale+n)]
						blue = render_B[i*scale+m][canvas.height-1-(j*scale+n)] 					
						if (areanew[i][N-j-1]>0.0){
							alpha = 0.5+0.5*Math.min(1.0,(areanew[i][N-j-1]/(rad * rad * 3.1415)))
							imagedata.data[pixelindex] = 255*((1.-alpha)*1.0*red+alpha*30./255.); //Red
							imagedata.data[pixelindex+1] = 255*((1.-alpha)*1.0*green+alpha*144./255.); //Green
							imagedata.data[pixelindex+2] = 255*((1.-alpha)*1.0*blue+alpha*255./255.); //Blue
							imagedata.data[pixelindex+3] = 255*(((1.-alpha)*1.0 + alpha)+alpha_cloud); //Alpha			
						}
						else{
							if (Math.pow(x_click - i,2.0) + Math.pow(y_click - (N-j-1),2.0) < Math.pow(rad,2.0)){
								imagedata.data[pixelindex] = (1.-alpha_cloud)*red*255; //Red
								imagedata.data[pixelindex+1] = (1.-alpha_cloud)*green*255; //Green
								imagedata.data[pixelindex+2] = (1.-alpha_cloud)*blue*255; //Blue
								imagedata.data[pixelindex+3] = 255*((1.-alpha_cloud)*1.0+alpha_cloud); //Alpha						
							}
							else{
								imagedata.data[pixelindex] = red*255; //Red
								imagedata.data[pixelindex+1] = green*255; //Green
								imagedata.data[pixelindex+2] = blue*255; //Blue
								imagedata.data[pixelindex+3] = 255; //Alpha
							}
						}
					}
				}
			}
		}
	}
	else if (image_mode == 1){
	//AERIAL -- this normalizes the data and makes the range of values from 0 to 255 (8bit data), sets the image pixel data. 
		for(var j=0; j<N; j++) {
			for(var i=0; i< M; i++) {
				for (var m=0; m < scale; m++){ 
					for (var n=0; n <scale; n++){
						pixelindex = (i * scale + j * scale * canvas.width + m + n * canvas.width) * 4;
						red = aerial_R[i*scale+m][canvas.height-1-(j*scale+n)]
						green = aerial_G[i*scale+m][canvas.height-1-(j*scale+n)]
						blue = aerial_B[i*scale+m][canvas.height-1-(j*scale+n)] 					
						if (areanew[i][N-j-1]>0.0){
							alpha = 0.5+0.5*Math.min(1.0,(areanew[i][N-j-1]/(rad * rad * 3.1415)))
							imagedata.data[pixelindex] = 255*((1.-alpha)*1.0*red+alpha*30./255.); //Red
							imagedata.data[pixelindex+1] = 255*((1.-alpha)*1.0*green+alpha*144./255.); //Green
							imagedata.data[pixelindex+2] = 255*((1.-alpha)*1.0*blue+alpha*255./255.); //Blue
							imagedata.data[pixelindex+3] = 255*(((1.-alpha)*1.0 + alpha)+alpha_cloud); //Alpha			
						}
						else{
							if (Math.pow(x_click - i,2.0) + Math.pow(y_click - (N-j-1),2.0) < Math.pow(rad,2.0)){
								imagedata.data[pixelindex] = (1.-alpha_cloud)*red*255; //Red
								imagedata.data[pixelindex+1] = (1.-alpha_cloud)*green*255; //Green
								imagedata.data[pixelindex+2] = (1.-alpha_cloud)*blue*255; //Blue
								imagedata.data[pixelindex+3] = 255*((1.-alpha_cloud)*1.0+alpha_cloud); //Alpha						
							}
							else{
								imagedata.data[pixelindex] = red*255; //Red
								imagedata.data[pixelindex+1] = green*255; //Green
								imagedata.data[pixelindex+2] = blue*255; //Blue
								imagedata.data[pixelindex+3] = 255; //Alpha
							}
						}
					}
				}
			}
		}
	}

	//button
	for(var j=0; j<button_y; j++) {
		for(var i=canvas.width-button_x-button_shadow_offset; i<canvas.width-button_shadow_offset; i++) {
			pixelindex = (i + j * canvas.width) * 4;  
			imagedata.data[pixelindex] = button_face_color[0]; //Red
			imagedata.data[pixelindex+1] = button_face_color[1]; //Green
			imagedata.data[pixelindex+2] = button_face_color[2]; //Blue
			imagedata.data[pixelindex+3] = button_face_color[3]; //Alpha	
		}
	}
	//button shadow
	for (var b=0; b<button_shadow_offset; b++){
		for(var j=0; j<button_y+1; j++) {
				pixelindex = ((b+canvas.width-button_shadow_offset) + (b+j) * canvas.width) * 4;  
				imagedata.data[pixelindex] = button_shadow_color[0]; //Red
				imagedata.data[pixelindex+1] = button_shadow_color[1]; //Green
				imagedata.data[pixelindex+2] = button_shadow_color[2]; //Blue
				imagedata.data[pixelindex+3] = button_shadow_color[3]; //Alpha
			}
		for(var i=canvas.width-button_x-button_shadow_offset; i<canvas.width-button_shadow_offset+1; i++){
				pixelindex = ((b+i) + (b+button_y) * canvas.width) * 4;  
				imagedata.data[pixelindex] = button_shadow_color[0]; //Red
				imagedata.data[pixelindex+1] = button_shadow_color[1]; //Green
				imagedata.data[pixelindex+2] = button_shadow_color[2]; //Blue
				imagedata.data[pixelindex+3] = button_shadow_color[3]; //Alpha
			}
	}


	//cloud buttons
	for(var j=canvas.height - cloud_button_y - button_shadow_offset; j<canvas.height - button_shadow_offset; j++) {
		for(var i=canvas.width-2.0*cloud_button_x-2.0*button_shadow_offset-cloud_button_space; i<canvas.width-1.0*cloud_button_x-2.0*button_shadow_offset-cloud_button_space; i++){
			pixelindex = (i + j * canvas.width) * 4;  
			imagedata.data[pixelindex] = minus_button_face_color[0]; //Red
			imagedata.data[pixelindex+1] = minus_button_face_color[1]; //Green
			imagedata.data[pixelindex+2] = minus_button_face_color[2]; //Blue
			imagedata.data[pixelindex+3] = minus_button_face_color[3]; //Alpha	
		}
		for(var i=canvas.width-1.0*cloud_button_x-1.0*button_shadow_offset; i<canvas.width-1.0*button_shadow_offset; i++){
			pixelindex = (i + j * canvas.width) * 4;  
			imagedata.data[pixelindex] = plus_button_face_color[0]; //Red
			imagedata.data[pixelindex+1] = plus_button_face_color[1]; //Green
			imagedata.data[pixelindex+2] = plus_button_face_color[2]; //Blue
			imagedata.data[pixelindex+3] = plus_button_face_color[3]; //Alpha	
		}
	}
	//cloud button shadow
	for (var b=0; b<button_shadow_offset; b++){
		for(var j=canvas.height - cloud_button_y - button_shadow_offset; j<canvas.height - button_shadow_offset + 1; j++) {
				pixelindex = ((b+canvas.width-1.0*cloud_button_x-2.0*button_shadow_offset-cloud_button_space) + (b+j) * canvas.width) * 4;  
				imagedata.data[pixelindex] = minus_button_shadow_color[0]; //Red
				imagedata.data[pixelindex+1] = minus_button_shadow_color[1]; //Green
				imagedata.data[pixelindex+2] = minus_button_shadow_color[2]; //Blue
				imagedata.data[pixelindex+3] = minus_button_shadow_color[3]; //Alpha

				pixelindex = ((b+canvas.width-button_shadow_offset) + (b+j) * canvas.width) * 4;  
				imagedata.data[pixelindex] = plus_button_shadow_color[0]; //Red
				imagedata.data[pixelindex+1] = plus_button_shadow_color[1]; //Green
				imagedata.data[pixelindex+2] = plus_button_shadow_color[2]; //Blue
				imagedata.data[pixelindex+3] = plus_button_shadow_color[3]; //Alpha
			}
		for(var i=canvas.width-2.0*cloud_button_x-2.0*button_shadow_offset-cloud_button_space; i<canvas.width-1.0*cloud_button_x-2.0*button_shadow_offset-cloud_button_space+1; i++){
				pixelindex = ((b+i) + (b+canvas.height - button_shadow_offset) * canvas.width) * 4;  
				imagedata.data[pixelindex] = minus_button_shadow_color[0]; //Red
				imagedata.data[pixelindex+1] = minus_button_shadow_color[1]; //Green
				imagedata.data[pixelindex+2] = minus_button_shadow_color[2]; //Blue
				imagedata.data[pixelindex+3] = minus_button_shadow_color[3]; //Alpha
			}
		for(var i=canvas.width-1.0*cloud_button_x-1.0*button_shadow_offset; i<canvas.width-1.0*button_shadow_offset+1; i++){
				pixelindex = ((b+i) + (b+canvas.height - button_shadow_offset) * canvas.width) * 4;  
				imagedata.data[pixelindex] = plus_button_shadow_color[0]; //Red
				imagedata.data[pixelindex+1] = plus_button_shadow_color[1]; //Green
				imagedata.data[pixelindex+2] = plus_button_shadow_color[2]; //Blue
				imagedata.data[pixelindex+3] = plus_button_shadow_color[3]; //Alpha
			}
	}

	//resets all the boundaries to zero, and sets the old area array as the new area array for the next timestep
	for(var i=0; i<M; i++) {
		for(var j=0; j< N; j++) {
			areaold[i][j] = areanew[i][j];
			if (j==0){areaold[i][j]=0.0}
			if (i==0){areaold[i][j]=0.0}
			if (j==M-1){areaold[i][j]=0.0}
			if (i==N-1){areaold[i][j]=0.0}
			areanew[i][j] = 0.0;
			if (fdir[i][j] == 0){
				areaold[i][j] = 0.0;
			}
		}
	}
	
	//this draws the array data as an pixel image
	ctx.putImageData(imagedata, 0, 0);
	//button text
	ctx.font = "16px Trebuchet MS";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("Cloud Radius",  canvas.width - 1.0 * cloud_button_x - 1.5 * button_shadow_offset - 0.5 * cloud_button_space, canvas.height - button_shadow_offset - 1.35 * cloud_button_y);
	ctx.fillStyle = "#000000";
	ctx.fillText(button_text, canvas.width - 0.51 * button_x - button_shadow_offset, 0.65 * button_y);
	ctx.font = "24px Trebuchet MS";
	ctx.fillText("-", canvas.width - 1.51 * cloud_button_x - 2.0 * button_shadow_offset - cloud_button_space, canvas.height - button_shadow_offset - 0.30 * cloud_button_y);
	ctx.fillText("+", canvas.width - 0.51 * cloud_button_x - button_shadow_offset, canvas.height - button_shadow_offset - 0.30 * cloud_button_y);
}	

//This runs "draw_data" continuously every dt (milliseconds)
setInterval(draw_data, dt);