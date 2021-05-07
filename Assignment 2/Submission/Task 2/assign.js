var canvas;
var gl;

var numVecs = 0;
var maxNumTriangles = 200;
var maxNumVertices  = 3 * maxNumTriangles;
var task2On = false;
var task5On = false;
// ---------------------- TASK 2 ----------------------
var axis = 1;
var wire = false;
function task2(){

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

            render(vertexIndices.length);
            requestAnimationFrame(loop);
        }
    };
    requestAnimationFrame(loop);
    // ---------------------------------------
}

function render(len) {

    gl.clearColor( 0, 0, 0, 1 );
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    for(var i=0;i<len*2;i+=3){
    	gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, i);
    }

}
// -----------------------------------------------------------------------