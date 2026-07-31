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

// load_data.js — drop-in replacement for the block of 7 $.ajax(...) calls
// PLUS the render/aerial normalization loop and the rain/areaold/areanew
// init loop that followed them in rain_3.0.js. Everything from
// "var x_neighbor = ..." onward in the original file is unchanged.

async function loadTerrainData(url) {
	const res = await fetch(url);
	if (!res.ok) {
	  throw new Error(`Failed to load ${url}: ${res.status} ${res.statusText}`);
	}
	const buf = new Uint8Array(await res.arrayBuffer());
  
	// --- header ---
	const magic = String.fromCharCode(buf[0], buf[1], buf[2], buf[3]);
	if (magic !== 'TRN1') {
	  throw new Error(`Unexpected file format: magic was "${magic}", expected "TRN1"`);
	}
	const version = buf[4];
	const layerCount = buf[5];
	if (layerCount !== 7) {
	  throw new Error(`Expected 7 layers in terrain.bin, found ${layerCount}`);
	}
  
	const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
	let offset = 6;
	const layerMeta = [];
	for (let i = 0; i < layerCount; i++) {
	  const rows = view.getUint16(offset, true); offset += 2;
	  const cols = view.getUint16(offset, true); offset += 2;
	  layerMeta.push({ rows, cols });
	}
  
	// Reshape a flat run of bytes into arr[i][j], i < rows, j < cols — this
	// matches exactly how $.csv.toArrays() + the original for-loops indexed
	// fdir/render_R/etc (rows = outer loop bound, cols = inner loop bound),
	// so draw_data() downstream needs zero changes.
	function reshape(meta) {
	  const { rows, cols } = meta;
	  const arr = new Array(rows);
	  for (let i = 0; i < rows; i++) {
		arr[i] = buf.subarray(offset, offset + cols); // zero-copy view, real Uint8 values
		offset += cols;
	  }
	  return arr;
	}
  
	const rawFdir     = reshape(layerMeta[0]);
	const rawRenderR  = reshape(layerMeta[1]);
	const rawRenderG  = reshape(layerMeta[2]);
	const rawRenderB  = reshape(layerMeta[3]);
	const rawAerialR  = reshape(layerMeta[4]);
	const rawAerialG  = reshape(layerMeta[5]);
	const rawAerialB  = reshape(layerMeta[6]);
  
	// fdir stays as raw integers (0-8 direction codes) — same as what the
	// original parseFloat() loop produced.
	fdir = rawFdir;
  
	// render_*/aerial_* were divided by 255 in the original code (used as
	// 0-1 floats in draw_data's blend math) — reproduce that so this is a
	// true drop-in and nothing else in the file has to change.
	const toUnitFloat = rows => rows.map(row => Float32Array.from(row, v => v / 255));
	render_R = toUnitFloat(rawRenderR);
	render_G = toUnitFloat(rawRenderG);
	render_B = toUnitFloat(rawRenderB);
	aerial_R = toUnitFloat(rawAerialR);
	aerial_G = toUnitFloat(rawAerialG);
	aerial_B = toUnitFloat(rawAerialB);
  
	// --- sanity checks against the constants the rest of the script assumes.
	// These are the exact mismatches that silently corrupted data in the
	// hardcoded-size version, so surface them loudly instead. ---
	if (fdir.length !== M || fdir[0].length !== N) {
	  console.warn(`fdir is ${fdir.length}x${fdir[0].length}, but M/N are set to ${M}x${N}. Update M/N to match.`);
	}
	if (render_R.length !== canvas.width || render_R[0].length !== canvas.height) {
	  console.warn(`render_R is ${render_R.length}x${render_R[0].length}, but canvas is ${canvas.width}x${canvas.height}. Pixel indexing in draw_data() will be wrong until these match.`);
	}
	if (aerial_R.length !== canvas.width || aerial_R[0].length !== canvas.height) {
	  console.warn(`aerial_R is ${aerial_R.length}x${aerial_R[0].length}, but canvas is ${canvas.width}x${canvas.height}. Pixel indexing in draw_data() will be wrong until these match.`);
	}
  }
  
  // --- replaces the old top-level code that ran right after the ajax calls ---
  async function init() {
	await loadTerrainData('/assets/data/terrain.bin'); // same-origin, one request instead of 7
  
	rain = [];
	areaold = [];
	areanew = [];
	for (var i = 0; i < M; i++) {
	  rain[i] = [];
	  areaold[i] = [];
	  areanew[i] = [];
	  for (var j = 0; j < N; j++) {
		rain[i][j] = 0.0;
		areaold[i][j] = 0.0;
		areanew[i][j] = 0.0;
	  }
	}
  
	setInterval(draw_data, dt); // draw_data + dt are defined further down in rain_3.0.js, unchanged
  }
  
  init().catch(err => {
	console.error('Failed to initialize rain model:', err);
  });

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