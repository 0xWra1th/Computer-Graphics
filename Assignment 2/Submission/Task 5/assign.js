var canvas;
var gl;

var numVecs = 0;
var maxNumTriangles = 200;
var maxNumVertices  = 3 * maxNumTriangles;
var task2On = false;
var task5On = false;

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

