//----------------------------------------------------------------------------
//
// Global Variables
//

var gl = null; // WebGL context

var shaderProgram = null;

var cubeVertexPositionBuffer = null;
    
var cubeVertexColorBuffer = null;

var cubeVertexIndexBuffer = null;

var cubeVertexNormalBuffer = null;

// Global transformations

globalTz = -28.0;

globalXX = 70.0;

globalYY = 0.0;

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

// For storing the vertices defining the vertices

var vertices = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
];

// Vertex indices defining the triangles
        
var cubeVertexIndices = [

    0, 1, 2,      0, 2, 3,    // Front face

    4, 5, 6,      4, 6, 7,    // Back face

    8, 9, 10,     8, 10, 11,  // Top face

    12, 13, 14,   12, 14, 15, // Bottom face

    16, 17, 18,   16, 18, 19, // Right face

    20, 21, 22,   20, 22, 23  // Left face
];

// Texture coordinates for the quadrangular faces

var textureCoords = [

    // Front face
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,

    // Back face
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,

    // Top face
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,

    // Bottom face
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    // Right face
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,

    // Left face
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
];

// Vertex normals

var normals = [

    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  //v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  //v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  //v0-v5-v6-v1 up
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  //v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  //v7-v4-v3-v2 down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   //v4-v7-v6-v5 back
];

// The viewer position

// It has to be updated according to the projection type

var pos_Viewer = [ 0.0, 0.0, 0.0, 1.0 ];

// Model Material Features

// Ambient coef.

var kAmbi = [0.8, 0.8, 0.8];

// Diffuse coef.

var kDiff = [0.8, 0.8, 0.8];

// Specular coef.

var kSpec = [0.7, 0.7, 0.7];

// Phong coef.

var nPhong = 100;

// Sounds

var introSound = new Audio('assets/intro.wav');
var eatingSound = new Audio('assets/eating.wav');
var eatGhostSound = new Audio('assets/eat-ghost.wav');
var deathSound = new Audio('assets/death.wav');
var winSound = new Audio('assets/win.wav');
var superModeSound = new Audio('assets/super-mode.wav');

// Textures

var wallTexture;
var foodTexture;
var superFoodTexture;
var pacmanTexture;
var ghostTexture;

//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//

function handleLoadedTexture(texture) {
    
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

function initTexture() {
    
    // Wall texture
    wallTexture = gl.createTexture();
    wallTexture.image = new Image();
    wallTexture.image.onload = function () {
        handleLoadedTexture(wallTexture)
    }

    wallTexture.image.src = "assets/wall.jpg";

    // Food texture
    foodTexture = gl.createTexture();
    foodTexture.image = new Image();
    foodTexture.image.onload = function () {
        handleLoadedTexture(foodTexture)
    }

    foodTexture.image.src = "assets/food.png";

    // Super food texture
    superFoodTexture = gl.createTexture();
    superFoodTexture.image = new Image();
    superFoodTexture.image.onload = function () {
        handleLoadedTexture(superFoodTexture)
    }

    superFoodTexture.image.src = "assets/super-food.png";

    // Pacman texture
    pacmanTexture = gl.createTexture();
    pacmanTexture.image = new Image();
    pacmanTexture.image.onload = function () {
        handleLoadedTexture(pacmanTexture)
    }

    pacmanTexture.image.src = "assets/pacman.png";

    // Ghost texture
    ghostTexture = gl.createTexture();
    ghostTexture.image = new Image();
    ghostTexture.image.onload = function () {
        handleLoadedTexture(ghostTexture)
    }

    ghostTexture.image.src = "assets/ghost.png";
}


// Handling the Vertex and the Color Buffers

function initCubeBuffer() {    
    
    // Coordinates
        
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = vertices.length / 3;            

    // Textures
        
    cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 24;                

    // Vertex indices
    
    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;

    // Vertex Normal Vectors
        
    cubeVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    cubeVertexNormalBuffer.itemSize = 3;
    cubeVertexNormalBuffer.numItems = normals.length / 3;
}

//----------------------------------------------------------------------------

//  Drawing the model

function drawModel( angleXX, angleYY, angleZZ, 
                    sx, sy, sz,
                    tx, ty, tz,
                    mvMatrix,
                    texture) {


    // Pay attention to transformation order !!
    
    mvMatrix = mult( mvMatrix, translationMatrix( tx, ty, tz ) );
                         
    mvMatrix = mult( mvMatrix, rotationZZMatrix( angleZZ ) );
    
    mvMatrix = mult( mvMatrix, rotationYYMatrix( angleYY ) );
    
    mvMatrix = mult( mvMatrix, rotationXXMatrix( angleXX ) );

    mvMatrix = mult( mvMatrix, scalingMatrix( sx, sy, sz ) );
                         
    // Passing the Model View Matrix to apply the current transformation
    
    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));
    
    // Passing the buffers
        
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cubeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // Material properties
    
    gl.uniform3fv(gl.getUniformLocation(shaderProgram, "k_ambient"), flatten(kAmbi));
    
    gl.uniform3fv(gl.getUniformLocation(shaderProgram, "k_diffuse"), flatten(kDiff));
    
    gl.uniform3fv(gl.getUniformLocation(shaderProgram, "k_specular"), flatten(kSpec));

    gl.uniform1f(gl.getUniformLocation(shaderProgram, "shininess"), nPhong);

    // Light Sources
        
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "numLights"), lightSources.length);
    
    for(var i = 0; i < lightSources.length ; i++ )
    {
        gl.uniform4fv(gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].position"), flatten(lightSources[i].getPosition()));
    
        gl.uniform3fv(gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].intensities"), flatten(lightSources[i].getIntensity()));
    }

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.uniform1i(shaderProgram.samplerUniform, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

    // Drawing the contents of the vertex buffer
    
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);    
}

//----------------------------------------------------------------------------

// Field Handling

// w -> wall; f -> food; s -> super-food; p -> portal
var w = 'w';
var f = 'f';
var s = 's';
var p = 'p';
var field_structure = [
    [w,w,w,w,w,p,w,w,w,w,w,w,w,w,w,w,w,w,w],
    [w,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,w],
    [w,f,w,w,w,w,w,w,f,w,f,w,w,w,w,w,w,f,w], 
    [w,f,f,f,f,w,f,f,f,w,f,f,f,w,f,f,f,f,w], 
    [w,w,f,w,f,w,f,w,w,w,w,w,f,w,f,w,f,w,w], 
    [w,f,f,w,f,f,f,f,f,f,f,f,f,f,s,w,f,f,p], 
    [w,f,w,w,f,w,w,w,f,w,f,w,w,w,f,w,w,f,w], 
    [p,f,f,f,f,f,f,f,f,w,f,f,f,f,f,f,f,f,w], 
    [w,f,w,w,f,w,f,w,w,w,w,w,f,w,f,w,w,f,w], 
    [w,f,f,s,f,w,f,f,f,f,f,f,f,w,f,f,f,f,w], 
    [w,w,w,w,w,w,w,w,w,w,p,w,w,w,w,w,w,w,w]
];

var possibleMoves = [
    {
        'x' : 1,
        'z' : 0,
        'key': 39
    },{
        'x' : -1,
        'z' : 0,
        'key': 37
    },{
        'x' : 0,
        'z' : 1,
        'key': 40
    },{
        'x' : 0,
        'z' : -1,
        'key': 38
    }
];

var field = {
    structure:     [],
    height:     0,    
    width:         0,
    xBlockSize: 1.0,
    zBlockSize: 1.0,
    speed:      0.1,
    init: function(structure, height, width) {
        this.structure = structure;
        this.height = height;
        this.width = width;
    }
}

var started = false;
var score = 0;
var gameOver = false;
var gameWin = false;
var superMode = false;
var remainingFood = 0;
var difficulty = 0;
// Light threshold in hard mode
var threshold = 4.0;
var portals = [];

var pacman;
var ghosts = [];

var interval;

function fieldBlock(type, xPos, yPos, zPos) {
    this.type = type;
    this.x = xPos;
    this.y = yPos;
    this.z = zPos;
    this.moves = [];           // Possible moves on that block
}

function character(id) {
    this.x = 0.0;
    this.z = 0.0;
    this.xDirection = 0.0;
    this.zDirection = 0.0;
    this.nextDirection = {};
    this.key = -1.0;
    this.currentBlock = {};    // Reference to the current block
    this.id = id;            // Character identificator
    this.teleportation = false;

    // Initialize parameters for character
    this.init = function(x, z) {
        
        var i = parseInt(x + (field.width / 2));
        var j = parseInt(z + (field.height / 2));

        this.x = field.structure[j][i].x;
        this.z = field.structure[j][i].z;

        this.currentBlock = field.structure[j][i];
    };

    this.updateDirection = function(moveX, moveZ, key) {
        this.nextDirection['x'] = moveX;
        this.nextDirection['z'] = moveZ;
        this.nextDirection['key'] = key;
    };

    this.updatePosition = function() {
        this.currentBlock = field.structure[this.currentBlock.z + this.zDirection][this.currentBlock.x + this.xDirection];
    };
}

function randomCoordinates() {
    var x, z;

    do {
        x = Math.floor(Math.random() * field.width);
        z = Math.floor(Math.random() * field.height);
    } while(field.structure[z][x].type == 'w')

    return {'x': x - (field.width / 2), 'z': z - (field.height / 2)}
}

function initField() {
    
    // Clear portals array
    portals = [];

    var createdField = createFieldStructure(field_structure);
    var height = createdField.length;
    var width = createdField[0].length;

    // Adjust field position (center in 0,0)
    tx = width / 2;
    tz = height / 2;

    field.init(createdField, height, width);
    
    // Compute all possible movements
    computeAllMoves(field_structure, field.structure);

    // Create pacman and render him in a random 
    var pacCoords = randomCoordinates();
    pacman = new character('Pac');
    pacman.init(pacCoords['x'], pacCoords['z']);
    // Eat the food under him
    pacman.currentBlock.type = '';

    // Clear ghosts array
    ghosts = [];
    // Create ghosts and render them in a random position
    ghosts.push(new character('G1'));
    ghosts.push(new character('G2'));
    ghosts.push(new character('G3'));

    for (var i=0; i<ghosts.length; i++){
        var coordinates = randomCoordinates();
        ghosts[i].init(coordinates['x'], coordinates['z']);
    }
}

function createFieldStructure(structure){
    var width = structure[0].length;
    var height = structure.length;
    var newField = [];
    var line = [];

    for (var i = 0; i < height; i++) {                
        for (var j = 0; j < width; j++) {
            line.push(new fieldBlock(structure[i][j], j, 0, i));
            // Count food present on field
            if (structure[i][j] == 'f' || structure[i][j] == 's')
                remainingFood++;
            else if (structure[i][j] == 'p')
                portals.push(line[j]);
        }
        newField.push(line);
        line = [];
    }
    return newField;
}

function computeAllMoves(structure, field) {
    var width = structure[0].length;
    var height = structure.length;

    for (var i = 0; i < height; i++) {                
        for (var j = 0; j < width; j++) {
            // Up block
            if (i-1 >= 0) {
                var up = field[i-1][j];
                //Check if the block is food
                if (up.type == 'f' || up.type == 's' || up.type == 'p')
                    field[i][j].moves[38] = up;
            }
            // Down block
            if (i+1 < height) {
                var down = field[i+1][j];
                //Check if the block is food
                if (down.type == 'f' || down.type == 's' || down.type == 'p')
                    field[i][j].moves[40] = down;
            }
            // Left block
            if (j-1 >= 0) {
                var left = field[i][j-1];
                //Check if the block is food
                if (left.type == 'f' || left.type == 's' || left.type == 'p')
                    field[i][j].moves[37] = left;
            }
            // Right block
            if (j+1 < width){
                var right = field[i][j+1];
                //Check if the block is food
                if (right.type == 'f' || right.type == 's' || right.type == 'p')
                    field[i][j].moves[39] = right;
            }              
        }
    }
}

function endGame(won, sound) {

    // Disable keyboard movements and stop pacman
    gameOver = true;
    gameWin = won;
    pacman.updateDirection(0, 0, pacman.key);

    // Disable ghost movements
    for(var i = 0; i < ghosts.length; i++)
        ghosts[i].updateDirection(0, 0, ghosts[i].key);

    // Update page infos
    var result = won ? "YOU WON." : "GAME OVER.";

    document.getElementById('result').innerHTML = result + " Score : " + score;
    document.getElementById('score').innerHTML = "";
    document.getElementById("restart").style.display = "block";

    sound.play();
}

function restartGame() {
    // Restart game mode
    score = 0;
    gameOver = false;
    gameWin = false;
    superMode = false;
    remainingFood = 0;

    // Restart game infos and super mode timer, if setted
    clearInterval(interval);
    switchSuperModeLight(false);

    // Set normal light threshold again
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "threshold"), threshold);
    
    document.getElementById('super-mode').innerHTML = "";
    document.getElementById('result').innerHTML = "";
    document.getElementById("restart").style.display = "none";

    // Start game rendering
    initField();

    introSound.play();
}

function superModeEnabled() {
    interval = setInterval(function() {
        counter--;
        if (counter === 0) {
            superMode = false;
            switchSuperModeLight(false);
            // Set normal light threshold again
            gl.uniform1f(gl.getUniformLocation(shaderProgram, "threshold"), threshold);

            document.getElementById('super-mode').innerHTML = "";
            clearInterval(interval);
            return;
        } else 
            document.getElementById('super-mode').innerHTML = "SUPER MODE ending in " + counter + " seconds";
    }, 1000);
}

function movePacman() {

    // Walk while not crashing
    if (pacman.currentBlock.moves[pacman.key] != undefined) {
        pacman.x += pacman.xDirection * field.speed;
        pacman.z += pacman.zDirection * field.speed;
    }

    // Update current position, if possible
    if (parseFloat(pacman.x.toFixed(2)) % 1.0 == 0 && parseFloat(pacman.z.toFixed(2)) % 1.0 == 0) {
        
        // Only update the position if it is a valid move
        if (pacman.currentBlock.moves[pacman.key] != undefined)
            pacman.updatePosition();
        
        // Change to next direction, if possible
        if (Object.keys(pacman.nextDirection).length !== 0 && pacman.currentBlock.moves[pacman.nextDirection['key']] != undefined) {
            pacman.xDirection = pacman.nextDirection['x'];
            pacman.zDirection = pacman.nextDirection['z'];
            pacman.key = pacman.nextDirection['key'];
            pacman.nextDirection = {}; 
        } 

        // Stop if it is an invalid move
        if (pacman.currentBlock.moves[pacman.key] == undefined)
            pacman.updateDirection(0, 0, pacman.key);

        // Handle portals
        if (pacman.currentBlock.type == 'p') {
            if (pacman.teleportation)
                pacman.teleportation = false;
            else
                spawnInRandomPortal(pacman);
        }
    }
    
    if (pacman.currentBlock.type == 'f') {
        // Eat the food
        pacman.currentBlock.type = '';
        eatingSound.play();

        // Update score and remaining food
        score++;
        remainingFood--;
    } else if (pacman.currentBlock.type == 's') {
        // Eat the food
        pacman.currentBlock.type = '';
        eatingSound.play();

        // Update score and remaining food
        score += 10;
        remainingFood--;

        // Only enable super mode if it isn't already enabled
        if (!superMode) {
            // Switch threshold in shaders, in order to more field
            gl.uniform1f(gl.getUniformLocation(shaderProgram, "threshold"), 1.5 * threshold);
            
            switchSuperModeLight(true);

            superModeSound.play();

            counter = 15;
            superModeEnabled();
        } else {
            counter += 15;
            clearInterval(interval);
            interval = null;

            superModeEnabled();
        }

        // Activate super mode
        superMode = true;
    }

    // If there isn't more food, the user wins
    if (remainingFood == 1 && !gameOver)
        endGame(true, winSound);
}

function moveGhost(ghost) {

    // Walk while not crashing
    if (ghost.currentBlock.moves[ghost.key] != undefined) {
        ghost.x += ghost.xDirection * field.speed;
        ghost.z += ghost.zDirection * field.speed;
    }

    // Check collisions with pacman
    if (Math.abs(ghost.x.toFixed(1)-pacman.x.toFixed(1)) < field.xBlockSize && Math.abs(ghost.z.toFixed(1)-pacman.z.toFixed(1)) < field.zBlockSize) {
        if(superMode) {
            // Kill ghost and eat him
            var idx = ghosts.indexOf(ghost);
            ghosts.splice(idx, 1);
            score += 100;
            eatGhostSound.play();
        } else if (!gameWin && !gameOver)
            // Lost game
            endGame(false, deathSound);
    }

    // Update current position, if possible
    if (parseFloat(ghost.x.toFixed(2)) % 1.0 == 0 && parseFloat(ghost.z.toFixed(2)) % 1.0 == 0) {
        
        // Only update the position if it is a valid move
        if (ghost.currentBlock.moves[ghost.key] != undefined)
            ghost.updatePosition();

        // Stop if it is an invalid move
        if (ghost.currentBlock.moves[ghost.key] == undefined) {
            var newDirection = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            ghost.xDirection = newDirection['x'];
            ghost.zDirection = newDirection['z'];
            ghost.key = newDirection['key'];
        }

        // Handle portals
        if (ghost.currentBlock.type == 'p') {
            if (ghost.teleportation)
                ghost.teleportation = false;
            else
                spawnInRandomPortal(ghost);
        }
    }
}

function spawnInRandomPortal(character) {
    var nextPortal = null;

    do {
        nextPortal = portals[Math.floor(Math.random() * portals.length)];
    } while(nextPortal == character.currentBlock)

    // Change current block to new spawn block
    character.currentBlock = nextPortal;

    // Update position
    character.x = nextPortal.x;
    character.z = nextPortal.z;

    // Update moves
    var key = Object.keys(nextPortal.moves)[0];
    possibleMoves.forEach(function(move) {
        if (move['key'] == key) {
            // Force direction change
            character.xDirection = move['x'];
            character.zDirection = move['z'];
            character.key = move['key'];
        }
    });

    // Enable teleportation
    character.teleportation = true;
}

//----------------------------------------------------------------------------

//  Drawing the 3D scene

function drawScene() {
    
    var mvMatrix = mat4();

    // Clear color buffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // Computing the perspective matrix
    var pMatrix = perspective( 45, 1, 0.05, 50 );

    // The viewer is on (0,0,0)
    pos_Viewer[0] = pos_Viewer[1] = pos_Viewer[2] = 0.0;    
    pos_Viewer[3] = 1.0;  
    
    // Passing the Projection Matrix to apply the current projection
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));

    // Passing the viewer position to the vertex shader
    gl.uniform4fv( gl.getUniformLocation(shaderProgram, "viewerPosition"), flatten(pos_Viewer));

    // Global transformations
    mvMatrix = translationMatrix( 0, 0, globalTz );
    mvMatrix = mult( mvMatrix, rotationYYMatrix( globalYY ) );
    mvMatrix = mult( mvMatrix, rotationXXMatrix( globalXX ) );
    
    // Updating the position of the light sources, if required
    for(var i = 0; i < lightSources.length; i++)
    {
        if(lightSources[i].isOff())
            continue;

        if (difficulty) {
            lightSources[i].setPosition(pacman.x - (field.width / 2),  2.5, pacman.z - (field.height / 2), 1.0);
            lightSources[i].setAmbIntensity(0.0, 0.0, 0.0);
        }  
        
        // Animating the light source, if defined
        var lightSourceMatrix = mvMatrix;
                        
        if(lightSources[i].isRotZZOn()) 
            lightSourceMatrix = mult(lightSourceMatrix, rotationZZMatrix(lightSources[i].getRotAngleZZ()));

        // Passing the Light Source Matrix to apply
        var lsmUniform = gl.getUniformLocation(shaderProgram, "allLights["+ String(i) + "].lightSourceMatrix");
        gl.uniformMatrix4fv(lsmUniform, false, new Float32Array(flatten(lightSourceMatrix)));
    }

    // Draw models
    drawField(mvMatrix);

    drawChar(pacman, mvMatrix);

    for(var i = 0; i < ghosts.length; i++)
        drawChar(ghosts[i], mvMatrix);

    // Update page's score
    if (!gameOver)
        document.getElementById('score').innerHTML = "Score : " + score;
}

function drawChar(character, mvMatrix) {
    
    // Verify if it is the pacman, to draw the correct texture
    var texture = character.id == 'Pac' ? pacmanTexture : ghostTexture;

    // Instantianting the current model
    drawModel( angleXX, angleYY, angleZZ, 
               sx, sy, sz,
               character.x - (field.width / 2), ty, character.z - (field.height / 2),
               mvMatrix,
               texture);
}

function drawField(mvMatrix) {
    // Draw all field models
    for (var i = 0; i < field.height; i++) {
        for (var j = 0; j < field.width; j++) {
            if (field.structure[i][j].type == 'w') {
                drawModel( angleXX, angleYY, angleZZ, 
                           sx, sy, sz,
                           (j * field.xBlockSize) - tx, 0, (i * field.xBlockSize * field.zBlockSize) - tz,
                           mvMatrix,
                           wallTexture);
            } else if (field.structure[i][j].type == 'f') {
                scale = 0.4;
                drawModel( angleXX, angleYY, angleZZ, 
                           sx - scale, sy - scale, sz - scale,
                           (j * field.xBlockSize) - tx, 0, (i * field.xBlockSize * field.zBlockSize) - tz,
                           mvMatrix,
                           foodTexture);
            } else if (field.structure[i][j].type == 's') {
                scale = 0.3;
                drawModel( angleXX, angleYY, angleZZ, 
                           sx - scale, sy - scale, sz - scale,
                           (j * field.xBlockSize) - tx, 0, (i * field.xBlockSize * field.zBlockSize) - tz,
                           mvMatrix,
                           superFoodTexture);
            }
        }    
    }
}

// Animation --- Updating transformation parameters

var lastTime = 0;

function animate() {
    
    var timeNow = new Date().getTime();
    
    if( lastTime != 0 ) {
        
        var elapsed = timeNow - lastTime;
        
        // Rotating the light sources
    
        for(var i = 0; i < lightSources.length; i++ )
        {
            if( lightSources[i].isRotZZOn() ) {
                var angle = lightSources[i].getRotAngleZZ() + lightSources[i].getRotationSpeed() * (90 * elapsed) / 1000.0;
                lightSources[i].setRotAngleZZ( angle );
            }
        }
    }
    
    lastTime = timeNow;
}

// Timer

function tick() {

    requestAnimFrame(tick);
    
    movePacman();

    for(var i = 0; i < ghosts.length; i++)
        moveGhost(ghosts[i]);

    // Render the viewport
    drawScene();

    animate();
}

//----------------------------------------------------------------------------

function setEventListeners(){

    var moving = false;
    var xPos = 0;
    var yPos = 0;

    // Handle yys rotation with mouse movement
    document.addEventListener("mousedown", function(event) {
        xPos = event.pageX;
        yPos = event.pageY;
        moving = true;
    });

    document.addEventListener('mousemove', function(event){ 
        if(moving){
            globalYY += (xPos - event.pageX) * 0.05;
            globalXX += (yPos - event.pageY) * 0.05;
            drawScene(); 
        }
    });

    document.addEventListener('mouseup', function(event){ 
          moving = false; 
    });

    // Handle zoom with mouse scroll
    document.addEventListener('wheel',function(event){
        globalTz += event.deltaY > 0 ? 1 : -1;
        drawScene(); 
    });

    // Pacman Movement
    document.addEventListener("keydown", function(event){
        
        // Getting the pressed key 
        var key = event.keyCode;

        // Disable movements when game over
        if (gameOver)
            key = -1;

        switch(key){
            // Space 
            case 32:
                if (!started)
                    setGameScreen();
                break;
            // Left
            case 37 :
                pacman.updateDirection(-1, 0, key);
                break;
            // Up
            case 38 :
                pacman.updateDirection(0, -1, key);
                break;
            // Right
            case 39 :
                pacman.updateDirection(1, 0, key);
                break;
            // Down
            case 40 : 
                pacman.updateDirection(0, 1, key);
                break;
            // A
            case 65:
                globalYY -= 5.0;
                drawScene(); 
                break;
            // D
            case 68:
                globalYY += 5.0;
                drawScene(); 
                break;
            // S
            case 83:
                globalXX += 5.0;
                drawScene(); 
                break;
            // W
            case 87:
                globalXX -= 5.0;
                drawScene();
                break;

        }
    });

    // Read field from file
    document.getElementById("file").onchange = function(){
        
        var file = this.files[0];
        
        var reader = new FileReader();
        
        // New field structure
        new_structure = [];

        var error = false;
        var movingSpaces = 0;

        reader.onload = function(progressEvent){
            
            // Read rows and cols and build a field matrix
            var rows = this.result.split('\n');

            for(var i = 0; i < rows.length; i++ ) {
                var col = rows[i].split(',');
                // Ignore blank lines
                if (col.length == 1)
                    continue;
                var line = [];
                for (var j = 0; j < col.length; j++) {
                    type = col[j].trim();
                    // Check if there is unknown blocks
                    if (type != 'w' && type != 'f' && type != 's' && type != 'p') {
                        error = true;
                        break;
                    } else if (type == 'f' || type == 's' || type == 'p')
                        movingSpaces++;
                    line.push(type);
                }

                new_structure.push(line);
                line = [];
            }

            // Check if there is unknown blocks or space to spawn
            if (error || !movingSpaces) {
                document.getElementById("field-error").innerHTML = "The field is not valid ! Please follow the structure described above and leave space (food or portals) to spawn the chars";
                return;
            }

            // Copy new field to the used one
            field_structure = new_structure;
            
            // Init field and game screen
            initField();
            setGameScreen();
        };
        
        // Entire file read as a string
        reader.readAsText(file);
    }
}

// Enable game div
function setGameScreen() {
    // Game is running
    started = true;

    // Set game difficulty (0 to normal, 1 to hard)
    difficulty = parseInt(document.getElementById("difficulty").value);
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "difficulty"), difficulty);
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "threshold"), threshold);

    // Set game screen
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("game").style.display = "block";

    // Start game rendering
    initField();

    introSound.play();
    
    tick();   
}

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function initWebGL( canvas ) {
    try {
        
        // Create the WebGL context
                
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        
        // Viewport with black background
        
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // Enable face culling and depth test
        
        gl.enable( gl.CULL_FACE );
        gl.enable( gl.DEPTH_TEST );

        // Drawing the triangles defining the model
        
        primitiveType = gl.TRIANGLES;
            
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

    initCubeBuffer();

    initTexture();
}
