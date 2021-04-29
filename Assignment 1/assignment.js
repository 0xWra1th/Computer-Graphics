
function q1(){
	var resultBox = document.getElementById("results");
	var alpha = Number(document.getElementById("alpha").value);
	var xStr = document.getElementById("x").value;
	var x = xStr.split(',');
	var res = "[";

	for(var i=0;i<x.length;i++){
		var num = Number(x[i])*alpha;
		if(i == 0){
			res = res+num;
		}else{
			res = res+","+num;
		}
	}
	res = res+"]";

	resultBox.innerHTML = "αx = "+res;
}

function q2(){
	var resultBox = document.getElementById("results");
	var yStr = document.getElementById("y").value;
	var xStr = document.getElementById("x").value;
	var x = xStr.split(',');
	var y = yStr.split(',');
	var res = "[";

	for(var i=0;i<x.length;i++){
		var num = Number(x[i])+Number(y[i]);
		if(i == 0){
			res = res+num;
		}else{
			res = res+","+num;
		}
	}
	res = res+"]";

	resultBox.innerHTML = "x + y = "+res;
}

function q3(){
	var resultBox = document.getElementById("results");
	var yStr = document.getElementById("y").value;
	var xStr = document.getElementById("x").value;
	var x = xStr.split(',');
	var y = yStr.split(',');
	var res = "[";

	for(var i=0;i<x.length;i++){
		var num = Number(x[i])-Number(y[i]);
		if(i == 0){
			res = res+num;
		}else{
			res = res+","+num;
		}
	}
	res = res+"]";

	resultBox.innerHTML = "x - y = "+res;
}

function q4(){
	var resultBox = document.getElementById("results");
	var yStr = document.getElementById("y").value;
	var xStr = document.getElementById("x").value;
	var x = xStr.split(',');
	var y = yStr.split(',');
	var sum = 0;

	for(var i=0;i<x.length;i++){
		var num = Number(x[i])*Number(y[i]);
		sum += num;
	}

	resultBox.innerHTML = "x · y = "+sum;
}

function q5(){
	var resultBox = document.getElementById("results");
	var xStr = document.getElementById("x").value;
	var x = xStr.split(',');
	var sum = 0;
	
	for(var i=0;i<x.length;i++){
		var num = Number(x[i])*Number(x[i]);
		sum += num;
	}

	sum = Math.sqrt(sum);

	resultBox.innerHTML = "||x||2 = "+sum;
}

function q6(){
	var resultBox = document.getElementById("results");
	var yStr = document.getElementById("y").value;
	var xStr = document.getElementById("x").value;
	var x = xStr.split(',');
	var y = yStr.split(',');
	var res = "[";

	for(var i=0;i<x.length;i++){
		var num = Number(x[i])*Number(y[i]);
		if(i == 0){
			res = res+num;
		}else{
			res = res+","+num;
		}
	}
	res = res+"]";

	resultBox.innerHTML = "x × y = "+res;
}

function q7(){
	var resultBox = document.getElementById("results");
	try{
		var n = document.getElementById("n").value;
		var alpha = Number(document.getElementById("alpha").value);
		var res = "\t[";
		var rowStr = "";
		var row = [];
		var M = [];

		for(var i=1;i<=n;i++){
			rowStr = document.getElementById("MRow"+i).value;
			row = rowStr.split(",");
			M.push(row);
		}

		for(var i=0;i<M.length;i++){
			for(var k=0;k<M[i].length;k++){
				var num = Number(M[i][k])*alpha;
				if(k == 0){
					res = res+"["+num;
				}else{
					res = res+","+num;
				}
			}
			if(i == M.length-1){
				res = res+"]";
			}else{	
				res = res+"],\n\t ";
			}
		}
		res = res+"]";

		resultBox.innerHTML = "αM = "+res;
	}catch (err){
		resultBox.innerHTML = "ERROR during operation: "+err.message;
	}
}

function q8(){
	var resultBox = document.getElementById("results");
	try{
		var n = document.getElementById("n").value;
		var res = "\t[";
		var rowStr = "";
		var row = [];
		var M = [];
		var MT = [];

		for(var i=1;i<=n;i++){
			rowStr = document.getElementById("MRow"+i).value;
			row = rowStr.split(",");
			M.push(row);
		}

		for(var i=0;i<M.length;i++){
			var row = [];
			for(var k=0;k<M[i].length;k++){
				row.push(0);
			}
			MT.push(row);
		}

		for(var i=0;i<M.length;i++){
			for(var k=0;k<M[0].length;k++){
				MT[k][i] = M[i][k];
			}
		}

		for(var i=0;i<MT.length;i++){
			for(var k=0;k<MT[i].length;k++){
				if(k == 0){
					res = res+"["+MT[i][k];
				}else{
					res = res+","+MT[i][k];
				}
			}
			if(i == M.length-1){
				res = res+"]";
			}else{	
				res = res+"],\n\t ";
			}
		}
		res = res+"]";

		resultBox.innerHTML = "M^T = "+res;
	}catch (err){
		resultBox.innerHTML = "ERROR during operation: "+err.message;
	}
}

function q9(){
	var resultBox = document.getElementById("results");
	try{
		var n = document.getElementById("n").value;
		var xStr = document.getElementById("x").value;
		var x = xStr.split(",");
		var res = "[";
		var rowStr = "";
		var row = [];
		var M = [];
		var sum = 0;

		for(var i=1;i<=n;i++){
			rowStr = document.getElementById("MRow"+i).value;
			row = rowStr.split(",");
			M.push(row);
		}

		if(M[0].length != x.length){
			throw new Error("Dimension mismatch!");
		}

		for(var i=0;i<M.length;i++){
			sum = 0;
			for(var k=0;k<x.length;k++){
				sum += (Number(x[k])*Number(M[i][k]));
			}
			if(i == 0){
				res = res+sum;
			}else{
				res = res+","+sum;
			}
			
		}

		resultBox.innerHTML = "Mx = "+res+"]";
	}catch (err){
		resultBox.innerHTML = "ERROR during operation: "+err.message;
	}
}

function q10(){
	var resultBox = document.getElementById("results");
	try{
		var n = Number(document.getElementById("n").value);
		var l = Number(document.getElementById("l").value);
		var res = "\t[";
		var rowStr = "";
		var row = [];
		var M = [];
		var G = [];
		var F = [];
		var sum = 0;

		for(var i=1;i<=n;i++){
			rowStr = document.getElementById("MRow"+i).value;
			row = rowStr.split(",");
			M.push(row);
		}

		for(var i=1;i<=l;i++){
			rowStr = document.getElementById("GRow"+i).value;
			row = rowStr.split(",");
			G.push(row);
		}

		if(G.length != M[0].length){
			throw new Error("Dimension Mismatch!");
		}

		for(var i=0;i<M.length;i++){
			var row = [];
			for(var k=0;k<G[0].length;k++){
				row.push(0);
			}
			console.log("["+row+"]");
			F.push(row);
		}
		for(var i=0;i<G[0].length;i++){
			for(var k=0;k<M.length;k++){
				for(var v=0;v<M[0].length;v++){
					sum += Number(M[k][v])*Number(G[v][i]);
				}
				F[k][i] = sum;
				sum = 0;
			}
		}
		for(var i=0;i<F.length;i++){
			for(var k=0;k<F[i].length;k++){
				if(k == 0){
					res = res+"["+F[i][k];
				}else{
					res = res+","+F[i][k];
				}
			}
			if(i == M.length-1){
				res = res+"]";
			}else{	
				res = res+"],\n\t ";
			}
		}
		res = res+"]";

		resultBox.innerHTML = "MG = "+res;
	}catch (err){
		resultBox.innerHTML = "ERROR during operation: "+err.message;
	}
}

function q11(){
	var resultBox = document.getElementById("results");
	try{
		var n = document.getElementById("n").value;
		var res = "\t[";
		var rowStr = "";
		var row = [];
		var M = [];
		for(var i=1;i<=n;i++){
			rowStr = document.getElementById("MRow"+i).value;
			row = rowStr.split(",");
			M.push(row);
		}

		if(M[0].length != M.length){
			throw new Error("Matrix must be square!");
		}
		res = determ(M, M.length, M.length);
		resultBox.innerHTML = "Determinant(M) = "+res;
	}catch (err){
		resultBox.innerHTML = "ERROR during operation: "+err.message;
	}
}

function factor(m, t, i, n){
	var x = 0; 
    var y = 0;
    for (var row = 0; row < n; row++){
        for (var col = 0; col < n; col++){
            if (row != 0 && col != i){
                t[x][y++] = m[row][col];
                if (y == n - 1){
                    y = 0;
                    x++;
                }
            }
        }
    }
}

function determ(m, n, s){
	var det = 0;
    if (n == 1){
        return m[0][0];
    }
    var tmp = new Array(s);
    for(var i = 0;i<s;i++){
    	tmp[i]= new Array(s);
    }
    var sign = 1;
    for (var f = 0; f < n; f++)
    {	
        factor(m, tmp, f, n);
        det += sign * m[0][f]* determ(tmp, n - 1,s);
        sign = -sign;
    }
    return det;
}

function q12(){
	var resultBox = document.getElementById("results");
	try{
		throw new Error("This question is incomplete.")
	}catch (err){
		resultBox.innerHTML = err.message;
	}
}


function setMRows(){
	//GET INPUT
	var div = document.getElementById("MatrixM");
	var rows = Number(document.getElementById("n").value);

	//REMOVE OLD ROWS
	while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

	//CREATE NEW ROWS
	for(var i = 1; i<=rows; i++){
		var r = document.createElement("input");
		r.setAttribute("type", "text");
		r.setAttribute("id", "MRow"+i);
		r.setAttribute("style", "width:100px;display: flex");

		var d = document.createElement("label");
		d.innerHTML = "row "+i;
		
		div.appendChild(d);
		div.appendChild(r);
	}
}

function setGRows(){
	//GET INPUT
	var div = document.getElementById("MatrixG");
	var rows = Number(document.getElementById("l").value);

	//REMOVE OLD ROWS
	while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

	//CREATE NEW ROWS
	for(var i = 1; i<=rows; i++){
		var r = document.createElement("input");
		r.setAttribute("type", "text");
		r.setAttribute("id", "GRow"+i);
		r.setAttribute("style", "width:100px;display: flex");

		var d = document.createElement("label");
		d.innerHTML = "row "+i;
		
		div.appendChild(d);
		div.appendChild(r);
	}
}