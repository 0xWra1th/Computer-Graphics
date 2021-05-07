var canvas;
var gl;

var numVecs = 0;
var maxNumTriangles = 200;
var maxNumVertices  = 3 * maxNumTriangles;
var task2On = false;
var task5On = false;


// ---------------------- TASK 1 ----------------------
function task1(){
	// --- Hide Radio Buttons ---
	document.getElementById("Buttons").hidden = true;
	// --------------------------

    // ---- Setup GL ----
    task2On = false;
    task5On = false;
    numVecs = 0;
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    gl.disable(gl.DEPTH_TEST);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, 0, 0 );
    gl.clear(gl.COLOR_BUFFER_BIT);
    // ------------------

    // ---- Shaders Setup ----
    var vertexShaderText = [
        'attribute vec4 vPosition;',
        'attribute vec4 vColor;',
        'varying vec4 fColor;',
        'void main(){',
        '   gl_Position = vec4(vPosition);',
        '   fColor = vec4(vColor);',
        '}'
    ].join("\n")
        
    var fragmentShaderText = [
        'precision mediump float;',
        'varying vec4 fColor;',
        'void main(){',
        '   gl_FragColor = vec4(fColor);',
        '}'
    ].join("\n")

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // -----------------------

    // ---- Create Program ----
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.validateProgram(program);
    gl.useProgram( program );
    // ------------------------

    //COLORS
    var groundColor = vec4(0.5,1,0.25,1);
    var skyColor = vec4(0,1,1,1);
    var houseColor = vec4(1,1,1,1);
    var doorColor = vec4(0.5,0.25,0,1);
    var windowColor = vec4(0,0.85,0.85,1);
    var roofColor = vec4(0.9,0,0,1);
    var colors = [groundColor, skyColor, houseColor, doorColor, windowColor, windowColor, roofColor];

    //POSITIONS
    var ground = [vec2(1, 0), vec2(-1, 0), vec2(1, -1), vec2(-1, -1)];
    var sky = [vec2(1, 1), vec2(-1, 1), vec2(1, 0), vec2(-1, 0)];
    var house = [vec2(-0.4, 0.2 ), vec2(0.4, 0.2), vec2(-0.4, -0.35), vec2(0.4, -0.35)];
    var door = [vec2(-0.08, -0.05), vec2(0.08, -0.05), vec2(-0.08, -0.35), vec2(0.08, -0.35)];
    var leftWindow = [vec2(-0.325, 0.1 ), vec2(-0.125, 0.1), vec2(-0.325, -0.1), vec2(-0.125, -0.1)];
    var rightWindow = [vec2(0.125, 0.1), vec2(0.325, 0.1), vec2(0.125, -0.1), vec2(0.325, -0.1)];
    var roof = [vec2(0, 0.6), vec2(0, 0.6), vec2(-0.5, 0.2), vec2(0.5, 0.2)];
    var objs = [ground, sky, house, door, leftWindow, rightWindow, roof];
    
    //MAIN VECTOR ARRAY
    var vectors = [];
    var obj = 0;
    for(var k=0;k<objs.length*4;k+=4){
        vectors.push(objs[obj][0]);
        vectors.push(objs[obj][1]);
        vectors.push(objs[obj][2]);
        vectors.push(objs[obj][3]);
        obj++;
    }
    numVecs = vectors.length;

    // -------- Creating Buffers and Attributes --------
    var cBuffer = gl.createBuffer();
    var vBuffer = gl.createBuffer();
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, gl.FALSE, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, gl.FALSE, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    // -------------------------------------------------

    // ----------- Loading buffers with Position and Color -----------
    var poly = 0;
    for(var i=0;i<numVecs;){
        
        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
        gl.bufferSubData( gl.ARRAY_BUFFER, 8*(i+0),flatten(vectors[i+0]));
        gl.bufferSubData( gl.ARRAY_BUFFER, 8*(i+1),flatten(vectors[i+1]));
        gl.bufferSubData( gl.ARRAY_BUFFER, 8*(i+2),flatten(vectors[i+2]));
        gl.bufferSubData( gl.ARRAY_BUFFER, 8*(i+3),flatten(vectors[i+3]));
        i+=4;

        var color = colors[poly];
        poly++;
    
        gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
        gl.bufferSubData( gl.ARRAY_BUFFER, 16*(i-4),flatten(color));
        gl.bufferSubData( gl.ARRAY_BUFFER, 16*(i-3),flatten(color));
        gl.bufferSubData( gl.ARRAY_BUFFER, 16*(i-2),flatten(color));
        gl.bufferSubData( gl.ARRAY_BUFFER, 16*(i-1),flatten(color));

    }
    // ---------------------------------------------------------------
    render1();
}

function render1() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    for(var i=0;i<numVecs;i+=4){
        gl.drawArrays( gl.TRIANGLE_STRIP, i, 4 );
    }
}
// ----------------------------------------------------

// ---------------------- TASK 2 & TASK 3 & TASK 4 ----------------------
var axis = 1;
var wire = false;
function task2(){
	// --- Show Radio Buttons ---
	document.getElementById("Buttons").hidden = false;
	window.scrollTo(0,document.body.scrollHeight);
	// --------------------------

    // ---- Setup GL ----
    task2On = true;
    task5On = false;
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    gl.enable(gl.DEPTH_TEST);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, 0, 0 );
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // ------------------

    // ---- Shaders Setup ----
    var vertexShaderText = [
    	'precision mediump float;',
        'attribute vec3 vPosition;',
        'attribute vec3 vColor;',
        'varying vec3 fColor;',
        'uniform mat4 mWorld;',
        'uniform mat4 mView;',
        'uniform mat4 mProj;',
        'void main(){',
        'gl_Position = mView *  mProj * mWorld * vec4(vPosition, 4.0);',
        'fColor = vColor;',
        '}'
    ].join('\n');
        
    var fragmentShaderText = [
        'precision mediump float;',
        'varying vec3 fColor;',
        'void main(){',
        '   gl_FragColor = vec4(fColor, 1.0);',
        '}'
    ].join("\n")

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    // -----------------------

    // ---- Create Program ----
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.validateProgram(program);
    // ------------------------

    // ---------- Cube Definition ----------
    var vertexData = [
        // --- WALLS ---
        // FRONT
        -0.75, -0.75,  -0.75,  0, 1, 0,// 0
        0.75, -0.75,  -0.75,  0, 1, 0, // 1
        0.75,  0.75,  -0.75,  0, 1, 0, // 2
        -0.75,  0.75,  -0.75,  0, 1, 0,// 3
        
        // BACK
        -0.75, -0.75,   0.75,  0.5, 0, 0,// 4
        0.75, -0.75,   0.75,  0.5, 0, 0, // 5
        0.75,  0.75,   0.75,  0.5, 0, 0, // 6
        -0.75,  0.75,   0.75,  0.5, 0, 0,// 7
        
        // RIGHT
        -0.75,  0.75, -0.75,  0.5, 1, 0.5, // 8
        -0.75,  0.75,  0.75,  0.5, 1, 0.5, // 9
        -0.75, -0.75, -0.75,  0.5, 1, 0.5, // 10
        -0.75, -0.75,  0.75,  0.5, 1, 0.5, // 11
        
        // LEFT
        0.75,  0.75, -0.75,  1, 0, 0.75,  // 12
        0.75,  0.75,  0.75,  1, 0, 0.75,  // 13
        0.75, -0.75, -0.75,  1, 0, 0.75,  // 14
        0.75, -0.75,  0.75,  1, 0, 0.75,  // 15
        
        // TOP
        0.75,  0.75, -0.75,  0, 0, 1,  // 16
        -0.75,  0.75, -0.75,  0, 0, 1, // 17
        0.75,  0.75,  0.75,  0, 0, 1,  // 18
        -0.75,  0.75,  0.75,  0, 0, 1, // 19
        
        // BOTTOM
        0.75, -0.75, -0.75,  1, 1, 0,  // 20
        -0.75, -0.75, -0.75,  1, 1, 0, // 21
        0.75, -0.75,  0.75,  1, 1, 0,  // 22
        -0.75, -0.75,  0.75,  1, 1, 0, // 23
        // ------------
        // --- ROOF ---
        // FRONT
        0, 1.75, -0.75,       	1, 1, 0,// 24
        0.75, 0.75, -0.75,  	1, 1, 0,// 25
        -0.75,  0.75,  -0.75,  	1, 1, 0,// 26
        0,  0.75,  -0.75,  		1, 1, 0,// 27

        // BACK
        0, 1.75, 0.75,       	1, 1, 0,// 28
        0.75, 0.75, 0.75,  		1, 1, 0,// 29
        -0.75,  0.75, 0.75,  	1, 1, 0,// 30
        0,  0.75,  0.75,  		1, 1, 0,// 31

        // LEFT
        // X      Y       Z     R   G   B
        	0, 	1.75, 	0.75,   1, 0.5, 0,// 32
        	0, 	1.75,  -0.75,  	1, 0.5, 0,// 33
        -0.75,  0.75, 	0.75,  	1, 0.5, 0,// 34
        -0.75,  0.75,  -0.75,  	1, 0.5, 0,// 35

        // RIGHT
        // X      Y       Z     R   G   B
        	0, 	1.75, 	0.75,   1, 0.5, 0,// 36
        	0, 	1.75,  -0.75,  	1, 0.5, 0,// 37
         0.75,  0.75, 	0.75,  	1, 0.5, 0,// 38
         0.75,  0.75,  -0.75,  	1, 0.5, 0,// 39
        // ------------
        // --- DOOR ---

        // X      Y       Z      R     G    B
         0.25, 	0.25, 	-0.751,   0.75, 0.25, 0,// 40
        -0.25, 	0.25,  	-0.751,   0.75, 0.25, 0,// 41
         0.25,  -0.75,  -0.751,   0.75, 0.25, 0,// 42
        -0.25,  -0.75,  -0.751,   0.75, 0.25, 0,// 43

        // ------------
        // --- WINDOWS ---
        //RIGHT
        // X      Y       Z       R    G   B
        -0.751,   0.35,  -0.35,   0.5, 0.5, 1,// 44
        -0.751,   0.35,  0.35,   0.5, 0.5, 1,// 45
        -0.751,  -0.35,  -0.35,   0.5, 0.5, 1,// 46
        -0.751,  -0.35,  0.35,   0.5, 0.5, 1,// 47

        //LEFT
        // X      Y       Z       R    G   B
        0.751,   0.35,  -0.35,   0.5, 0.5, 1,// 48
        0.751,   0.35,  0.35,   0.5, 0.5, 1,// 49
        0.751,  -0.35,  -0.35,   0.5, 0.5, 1,// 50
        0.751,  -0.35,  0.35,   0.5, 0.5, 1,// 51

        // ------------

    ];

    var vertexIndices = [
    	// --- WALLS ---
    	// FRONT
    	3,2,0,
    	1,0,2,
        
        // BACK
        7,6,4,
        5,4,6,
        
        // RIGHT
        8,9,10,
        11,10,9,
        
        // LEFT
        12,13,14,
        15,14,13,
        
        // TOP
        16,18,17,
        19,17,18,
        
        // BOTTOM
        20,22,21,
        23,21,22,
        // ------------
        // --- ROOF ---
        // FRONT
        24,25,27,
        24,26,27,

        // BACK
        28,29,31,
        28,30,31,

        // LEFT
        32,33,34,
        34,35,33,

        // RIGHT
        36,37,38,
        38,39,37,
        // ------------
        // --- DOOR ---
        40,41,43,
        43,42,40,
        // ------------
        // --- WINDOWS ---
        //RIGHT
        45,44,46,
        46,47,45,

        //LEFT
        49,48,50,
        50,51,49,
        // ---------------
    ];


    // -------------------------------------

    // ----------- Loading buffers with Position and Color -----------
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    var vertexIndicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW)

    
    var positionAttribute = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    
    var colorAttribute = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(colorAttribute, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    
    gl.enableVertexAttribArray(positionAttribute);
    gl.enableVertexAttribArray(colorAttribute);

    gl.useProgram( program );
    // ---------------------------------------------------------------
    
    // ---------- Transformations ----------
    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);

    viewRes =  lookAt([0, 0, -17], [0,0,0], [0, 1, 0]);
    for(var i=0;i<16;i=i+4){
        viewMatrix[i+0] = viewRes[i/4][0];
        viewMatrix[i+1] = viewRes[i/4][1];
        viewMatrix[i+2] = viewRes[i/4][2];
        viewMatrix[i+3] = viewRes[i/4][3];
    }
    
    projRes = perspective( 5, canvas.width/canvas.height , 0.1, 100.0);
    for(var i=0;i<16;i=i+4){
        projMatrix[i+0] = projRes[i/4][0];
        projMatrix[i+1] = projRes[i/4][1];
        projMatrix[i+2] = projRes[i/4][2];
        projMatrix[i+3] = projRes[i/4][3];
    }

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
    // -------------------------------------

    // ------------- Render Loop -------------
    var angle = 0;
    var rotRes = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
    var loop = function(){
        if(task2On){
            angle = performance.now() / 25 / 6 * 2 * Math.PI;

            if(axis == 3){
            	rotRes = rotate(angle, [0,0,1]);
            }else if(axis == 2){
            	rotRes = rotate(angle, [1,0,0]);
            }else{
            	rotRes = rotate(angle, [0,1,0]);
            }
            
            for(var i=0;i<16;i=i+4){
                worldMatrix[i+0] = rotRes[i/4][0];
                worldMatrix[i+1] = rotRes[i/4][1];
                worldMatrix[i+2] = rotRes[i/4][2];
                worldMatrix[i+3] = rotRes[i/4][3];
            }
            gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

            render2(vertexIndices.length);
            requestAnimationFrame(loop);
        }
    };
    requestAnimationFrame(loop);
    // ---------------------------------------
}

function render2(len) {

    gl.clearColor( 0, 0, 0, 1 );
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    if(wire){
		for(var i=0;i<len*2;i+=3){
    		gl.drawElements(gl.LINE_LOOP, 3, gl.UNSIGNED_SHORT, i);
    	}
    }else{
    	for(var i=0;i<len*2;i+=3){
    		gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, i);
    	}
    }

}

function changeAxis() {

	if(document.getElementById("X").checked){
		axis = 2;
	}else if(document.getElementById("Z").checked){
		axis = 3;
	}else if(document.getElementById("Y").checked){
		axis = 1;
	}

}

function wireframe(){
	if(wire){
		wire = false;
	}else{
		wire = true;
	}
}
// -----------------------------------------------------------------------
// ---------------------- TASK 5 ----------------------
var axis = 1;
var wire = false;
function task5(){
	// --- Show Radio Buttons ---
	document.getElementById("Buttons").hidden = false;
	window.scrollTo(0,document.body.scrollHeight);
	// --------------------------

    // ---- Setup GL ----
    task2On = false;
    task5On = true;
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    gl.enable(gl.DEPTH_TEST);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, 0, 0 );
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // ------------------

    // ---- Shaders Setup ----
    var vertexShaderText = [
    	'precision mediump float;',
        'attribute vec3 vPosition;',
        'attribute vec3 vColor;',
        'varying vec3 fColor;',
        'uniform mat4 mWorld;',
        'uniform mat4 mView;',
        'uniform mat4 mProj;',
        'void main(){',
        'gl_Position = mView *  mProj * mWorld * vec4(vPosition, 4.0);',
        'fColor = vColor;',
        '}'
    ].join('\n');
        
    var fragmentShaderText = [
        'precision mediump float;',
        'varying vec3 fColor;',
        'void main(){',
        '   gl_FragColor = vec4(fColor, 1.0);',
        '}'
    ].join("\n")

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    // -----------------------

    // ---- Create Program ----
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.validateProgram(program);
    // ------------------------

    // ---------- Cube Definition ----------
    var vertexData = [
        // --- CENTER CIRCLE ---
        // X      Y      Z
        -0.75, 0,  0.75,  0, 1, 0,// 0
        0.75, 0,  0.75,  0, 0, 1, // 1
        0.75,  0,  -0.75,  0, 1, 1, // 2
        -0.75,  0,  -0.75,  0, 1, 0,// 3

        -1, 0,  0,  1, 0, 1,// 4
        0, 0,  1,  1, 1, 0, // 5
        1,  0,  0,  0, 0, 1, // 6
        0,  -0,  -1,  0, 1,0,// 7
        // --------------------
        // --- UPPER CIRCLE ---
        // X      Y      Z
        -0.5, 0.625,  0.5,  1, 1, 0,// 8
        0.5, 0.625,  0.5,  0, 0, 1, // 9
        0.5,  0.625,  -0.5,  1, 0, 0, // 10
        -0.5,  0.625,  -0.5,  0, 1, 0,// 11

        -0.75, 0.625,  0,  0, 0, 1,// 12
        0, 0.625,  0.75,  1, 0, 0, // 13
        0.75,  0.625,  0,  1, 1, 0, // 14
        0,  0.625,  -0.75,  0, 1, 1,// 15
        // --------------------
        // --- LOWER CIRCLE ---
        // X      Y      Z
        -0.5, -0.625,  0.5,  1, 1, 0,// 16
        0.5, -0.62,  0.5,  1, 1, 0, // 17
        0.5,  -0.625,  -0.5,  1, 1, 0, // 18
        -0.5,  -0.625,  -0.5,  1, 1, 0,// 19

        -0.75, -0.625,  0,  1, 1, 0,// 20
        0, -0.625,  0.75,  1, 1, 0, // 21
        0.75,  -0.625,  0,  1, 1, 0, // 22
        0,  -0.625,  -0.75,  1, 1, 0,// 23
        // --------------------
        // ---- UPPER POLE ----
        // X      Y      Z
        0, 1,  0,  0, 0, 1,//24
        // --------------------
        // ---- LOWER POLE ----
        // X      Y      Z
        0, -1,  0,  1, 0.25, 0.25,//24
        // --------------------

    ];

    var vertexIndices = [
    	//UPPER STRIP
    	0,8,5,13,1,9,6,14,2,10,7,15,3,11,4,12,0,8,
    	//LOWER STRIP 
    	0,16,5,21,1,17,6,22,2,18,7,23,3,19,4,20,0,16,
    	

    	// --- CENTER CIRCLE 9 -----
    	0,5,1,6,2,7,3,4,0,
    	// -----------------------
    	// --- UPPER CIRCLE 9 ---
    	8,13,9,14,10,15,11,12,8,
    	// ----------------------
    	// --- LOWER CIRCLE 9 ---
    	16,21,17,22,18,23,19,20,16,
    	// ----------------------
    	// ---- UPPER POLE 10 ----
    	24,8,24,13,24,9,24,14,24,10,24,15,24,11,24,12,24,8,24,
    	// ----------------------
    	// ---- LOWER POLE 10 ----
    	25,16,25,21,25,17,25,22,25,18,25,23,25,19,25,20,25,16,25,
    	// ----------------------
    ];

    // -------------------------------------

    // ----------- Loading buffers with Position and Color -----------
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    var vertexIndicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW)

    
    var positionAttribute = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    
    var colorAttribute = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(colorAttribute, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
    
    gl.enableVertexAttribArray(positionAttribute);
    gl.enableVertexAttribArray(colorAttribute);

    gl.useProgram( program );
    // ---------------------------------------------------------------
    
    // ---------- Transformations ----------
    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);

    viewRes =  lookAt([0, 0, -17], [0,0,0], [0, 1, 0]);
    for(var i=0;i<16;i=i+4){
        viewMatrix[i+0] = viewRes[i/4][0];
        viewMatrix[i+1] = viewRes[i/4][1];
        viewMatrix[i+2] = viewRes[i/4][2];
        viewMatrix[i+3] = viewRes[i/4][3];
    }
    
    projRes = perspective( 5, canvas.width/canvas.height , 0.1, 100.0);
    for(var i=0;i<16;i=i+4){
        projMatrix[i+0] = projRes[i/4][0];
        projMatrix[i+1] = projRes[i/4][1];
        projMatrix[i+2] = projRes[i/4][2];
        projMatrix[i+3] = projRes[i/4][3];
    }

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
    // -------------------------------------

    // ------------- Render Loop -------------
    var angle = 0;
    var rotRes = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
    var loop = function(){
        if(task5On){
            angle = performance.now() / 25 / 6 * 2 * Math.PI;

            if(axis == 3){
            	rotRes = rotate(angle, [0,0,1]);
            }else if(axis == 2){
            	rotRes = rotate(angle, [1,0,0]);
            }else{
            	rotRes = rotate(angle, [0,1,0]);
            }
            
            for(var i=0;i<16;i=i+4){
                worldMatrix[i+0] = rotRes[i/4][0];
                worldMatrix[i+1] = rotRes[i/4][1];
                worldMatrix[i+2] = rotRes[i/4][2];
                worldMatrix[i+3] = rotRes[i/4][3];
            }
            gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

            render5(vertexIndices.length);
            requestAnimationFrame(loop);
        }
    };
    requestAnimationFrame(loop);
    // ---------------------------------------
}

function render5(len) {

    gl.clearColor( 0, 0, 0, 1 );
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var fan = false;
    
    if(wire){
		for(var i=0;i<len*2;){
			if(i <= 36){
    			gl.drawElements(gl.LINE_LOOP, 19, gl.UNSIGNED_SHORT, i);
				if(i != 36){
					i+=18;
				}else{
					i+=2;
				}
			}else{
				gl.drawElements(gl.LINE_LOOP, 2, gl.UNSIGNED_SHORT, i);
				i+=2;
			}
    	}
    }else{
    	for(var i=0;i<len*2;i+=10){
	    	gl.drawElements(gl.TRIANGLE_STRIP, 10, gl.UNSIGNED_SHORT, i);	
    	}
    }

}
// -----------------------------------------------------------------------

