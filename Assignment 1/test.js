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

function test(){
	
}