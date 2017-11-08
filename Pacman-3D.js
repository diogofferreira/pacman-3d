//----------------------------------------------------------------------------
//
// Global Variables
//

var gl = null; // WebGL context

var shaderProgram = null;

var triangleVertexPositionBuffer = null;
	
var triangleVertexColorBuffer = null;

var floorVertexPositionBuffer = null;
	
var floorVertexColorBuffer = null;


// The local transformation parameters

// The translation vector

var tx = 0.0;

var ty = 0.0;

var tz = 0.0;

// The rotation angles in degrees

var angleXX = 0.0;

var angleYY = 0.0;

var angleZZ = 0.0;

// The scaling factors

var sx = 0.5;

var sy = 0.5;

var sz = 0.5;

// For storing the vertices defining the triangles

var vertices = [

		// FRONT FACE
		 
		-0.25, -0.25,  0.25,
		 
		 0.25, -0.25,  0.25,
		 
		 0.25,  0.25,  0.25,

		 
		 0.25,  0.25,  0.25,
		 
		-0.25,  0.25,  0.25,
		 
		-0.25, -0.25,  0.25,
		
		// TOP FACE
		
		-0.25,  0.25,  0.25,
		 
		 0.25,  0.25,  0.25,
		 
		 0.25,  0.25, -0.25,

		 
		 0.25,  0.25, -0.25,
		 
		-0.25,  0.25, -0.25,
		 
		-0.25,  0.25,  0.25,
		
		// BOTTOM FACE 
		
		-0.25, -0.25, -0.25,
		 
		 0.25, -0.25, -0.25,
		 
		 0.25, -0.25,  0.25,

		 
		 0.25, -0.25,  0.25,
		 
		-0.25, -0.25,  0.25,
		 
		-0.25, -0.25, -0.25,
		
		// LEFT FACE 
		
		-0.25,  0.25,  0.25,
		 
		-0.25, -0.25, -0.25,

		-0.25, -0.25,  0.25,
		 
		 
		-0.25,  0.25,  0.25,
		 
		-0.25,  0.25, -0.25,
		 
		-0.25, -0.25, -0.25,
		
		// RIGHT FACE 
		
		 0.25,  0.25, -0.25,
		 
		 0.25, -0.25,  0.25,

		 0.25, -0.25, -0.25,
		 
		 
		 0.25,  0.25, -0.25,
		 
		 0.25,  0.25,  0.25,
		 
		 0.25, -0.25,  0.25,
		
		// BACK FACE 
		
		-0.25,  0.25, -0.25,
		 
		 0.25, -0.25, -0.25,

		-0.25, -0.25, -0.25,
		 
		 
		-0.25,  0.25, -0.25,
		 
		 0.25,  0.25, -0.25,
		 
		 0.25, -0.25, -0.25,			 
];

// And their colour

var colors = [

		 // FRONT FACE
		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,

		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 			 
		 // TOP FACE
		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,

		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 			 
		 // BOTTOM FACE
		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,

		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 			 
		 // LEFT FACE
		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,

		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 			 
		 // RIGHT FACE
		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,

		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 			 
		 			 
		 // BACK FACE
		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,

		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,			 			 
];

var floor = [
		
		-50.00,  -2.00, 50.00,

		 50.00,  -2.00, 50.00,

		-50.00,  -2.00, -50.00,

	     50.00,  -2.00, 50.00,

		 50.00,  -2.00, -50.00,

		-50.00,  -2.00, -50.00,
];

var floorColors = [
		 
		 0.00,  0.00,  1.00,
		 
		 0.00,  0.00,  1.00,
		 
		 0.00,  0.00,  1.00,	

		 0.00,  0.00,  1.00,
		 
		 0.00,  0.00,  1.00,
		 
		 0.00,  0.00,  1.00,	
];

//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//

// Handling the Vertex and the Color Buffers

function initPacmanBuffer() {	
	
	// Coordinates
		
	triangleVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	triangleVertexPositionBuffer.itemSize = 3;
	triangleVertexPositionBuffer.numItems = vertices.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
			triangleVertexPositionBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
	
	// Colors
		
	triangleVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	triangleVertexColorBuffer.itemSize = 3;
	triangleVertexColorBuffer.numItems = colors.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
			triangleVertexColorBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
}

function initFloorBuffer() {
	
	// Coordinates
		
	floorVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(floor), gl.STATIC_DRAW);
	floorVertexPositionBuffer.itemSize = 3;
	floorVertexPositionBuffer.numItems = floor.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
			floorVertexPositionBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);

	// Colors
		
	floorVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(floorColors), gl.STATIC_DRAW);
	floorVertexColorBuffer.itemSize = 3;
	floorVertexColorBuffer.numItems = floorColors.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
			floorVertexColorBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
}

//----------------------------------------------------------------------------

//  Drawing the model

function drawModel( angleXX, angleYY, angleZZ, 
					sx, sy, sz,
					tx, ty, tz,
					mvMatrix,
					primitiveType,
					buffer ) {


    // Pay attention to transformation order !!
    
	mvMatrix = mult( mvMatrix, translationMatrix( tx, ty, tz ) );
						 
	mvMatrix = mult( mvMatrix, rotationZZMatrix( angleZZ ) );
	
	mvMatrix = mult( mvMatrix, rotationYYMatrix( angleYY ) );
	
	mvMatrix = mult( mvMatrix, rotationXXMatrix( angleXX ) );
	
	mvMatrix = mult( mvMatrix, scalingMatrix( sx, sy, sz ) );
						 
	// Passing the Model View Matrix to apply the current transformation
	
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));
	
	// Drawing the contents of the vertex buffer

	gl.drawArrays(primitiveType, 0, buffer.numItems);
}

//----------------------------------------------------------------------------

//  Drawing the 3D scene

function drawScene() {
	
	drawFloor();

	drawPacman();
}

function drawPacman() {

	initPacmanBuffer();
	
	var pMatrix;
	
	var mvMatrix = mat4();
		
	// Computing the perspective matrix
	
	pMatrix = perspective( 45, 1, 0.05, 50 );
	
	// Global transformation (Fix POV)
	
	globalTz = -10.0;

	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));

	mvMatrix = translationMatrix( 0, 0, globalTz );
	
	angleXX = 20;

	// Instantianting the current model
		
	drawModel( angleXX, angleYY, angleZZ, 
	           sx, sy, sz,
	           tx, ty, tz,
	           mvMatrix,
	           primitiveType,
	           triangleVertexPositionBuffer );

}


function drawFloor() {

	initFloorBuffer();
	
	var pMatrix;
	
	var mvMatrix = mat4();
		
	// Computing the perspective matrix
	
	pMatrix = perspective( 45, 1, 0.05, 50 );

	// Global transformation (Fix POV)
	
	globalTz = -10.0;

	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));

	mvMatrix = translationMatrix( 0, 0, globalTz );
	
	angleXX = 20;

	// Instantianting the current model
		
	drawModel( angleXX, angleYY, angleZZ, 
	           sx, sy, sz,
	           tx, ty, tz,
	           mvMatrix,
	           primitiveType,
	           floorVertexPositionBuffer );
}

// Timer

function tick() {
	
	requestAnimFrame(tick);
	
	drawScene();
}

//----------------------------------------------------------------------------

function setEventListeners(){

	var moving = false;
	var xPos = 0;

	// Handle yys rotation with mouse movement
	document.addEventListener("mousedown", function(event) {
		xPos = event.pageX;
		moving = true;
	});

	document.addEventListener('mousemove', function(event){ 
		if(moving){
			angleYY += (xPos - event.pageX) * 0.05;
			drawScene(); 
		}
	});

	document.addEventListener('mouseup', function(event){ 
	  	moving = false; 
	});

	// Handle zoom with mouse scroll
	document.addEventListener('mousewheel',function(event){
		tz += event.deltaY > 0 ? 1 : -1;
		drawScene(); 
	});

	// Pacman Movement
	document.addEventListener("keydown", function(event){
		
		// Getting the pressed key 
		var key = event.keyCode;

		switch(key){
			// Left
			case 37 :
				// Updating
	
				tx -= 0.25;
				
				// Render the viewport
				drawScene(); 

				break;
			// Up
			case 38 :
				tz -= 0.50;
				
				// Render the viewport
				drawScene(); 

				break;
			// Right
			case 39 :
				tx += 0.25;
				
				// Render the viewport
				drawScene(); 

				break;
			// Down
			case 40 : 
				tz += 0.50;
				
				// Render the viewport
				drawScene(); 

				break;
		}
	});		     
}

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function initWebGL( canvas ) {
	try {
		
		// Create the WebGL context
		
		// Some browsers still need "experimental-webgl"
		
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		
		// Drawing the triangles defining the model
		
		primitiveType = gl.TRIANGLES;
				
		// Enable face culling and depth test
		
		gl.enable( gl.CULL_FACE );
		gl.enable( gl.DEPTH_TEST );
        
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry! :-(");
	}        
}

//----------------------------------------------------------------------------

function runWebGL() {
	
	var canvas = document.getElementById("my-canvas");
	
	initWebGL( canvas );

	shaderProgram = initShaders( gl );
	
	setEventListeners();
	
	// Transform cube into sphere

	centroidRefinement( vertices, colors, 6 );
    
 	moveToSphericalSurface( vertices );
    
	drawScene();

	//tick();   
}