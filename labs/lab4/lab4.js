function loadAllCanvas(){
	loadFirstCanvas();
	loadSecondCanvas();
	loadGameCanvas();
}

function loadFirstCanvas() {
	var canvas = document.getElementById('drawLines');
	var tempCanvas = document.getElementById('tempDrawLines');
	var elemLeft = canvas.offsetLeft;
	var elemTop = canvas.offsetTop;
	var context = canvas.getContext('2d');
	var tempContext = tempCanvas.getContext('2d');
	var first_x;
	var first_y;
	var second_x;
	var second_y;
	var mouseDown = false;
	
	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }
	
	tempCanvas.addEventListener('mousedown', function(evt) {
		mouseDown = true;
		var mousePos = getMousePos(tempCanvas, evt);
		first_x = mousePos.x;
		first_y = mousePos.y;
	}, false);
	
	tempCanvas.addEventListener('mouseup', function(evt) {
		mouseDown = false;
		tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
		var mousePos = getMousePos(tempCanvas, evt);
		second_x = mousePos.x;
		second_y = mousePos.y;
		drawLine(canvas, second_x, second_y, first_x, first_y);
	}, false);

	tempCanvas.addEventListener('mousemove', function(evt) {
		if (mouseDown){
			tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
			var mousePos = getMousePos(tempCanvas, evt);
			second_x = mousePos.x;
			second_y = mousePos.y;
			drawLine(tempCanvas, second_x, second_y, first_x, first_y);
		}
	}, false);	
}

function loadSecondCanvas() {
	var canvas = document.getElementById('drawFree');
	var elemLeft = canvas.offsetLeft;
	var elemTop = canvas.offsetTop;
	var context = canvas.getContext('2d');
	var previous_x;
	var previous_y;
	var mouseDown = false;
	
	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }
	
	canvas.addEventListener('mousedown', function(evt) {
		mouseDown = true;
		var mousePos = getMousePos(canvas, evt);
		drawLine(canvas, mousePos.x, mousePos.y, mousePos.x, mousePos.y)
	}, false);
	
	canvas.addEventListener('mouseup', function(evt) {
		mouseDown = false;
	}, false);

	canvas.addEventListener('mousemove', function(evt) {
		if (mouseDown){
			var rect = canvas.getBoundingClientRect();
			var mousePos = getMousePos(canvas, evt);
			if (previous_x != null && previous_y != null) {
				drawLine(canvas, mousePos.x, mousePos.y, previous_x, previous_y);
			}
			previous_x = mousePos.x;
			previous_y = mousePos.y;
		}
		else {
			previous_x = null;
			previous_y = null;
		}
	}, false);	
}

function loadGameCanvas(){
	var canvas = document.getElementById('game');
	var elemLeft = canvas.offsetLeft;
	var elemTop = canvas.offsetTop;
	var context = canvas.getContext('2d');
	var rectWidth = 50;
	var rectHeight = 50;
	var score=0;
	var playing=true;
	var waitingForAction=false;
	var playButton = document.getElementById('playButt');
	var time = 0;
	var scoreText = document.getElementById('score');
	var timeText = document.getElementById('time');
	
	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }
	
	function newTarget(){
		var target = drawRandomRect();
		if (playing){
			canvas.addEventListener('mousedown', function(evt) {
				var mousePos = getMousePos(canvas, evt);
				if ((mousePos.x >= target.x) && (mousePos.x <= (target.x + rectWidth)) && (mousePos.y >= target.y) && (mousePos.y <= (target.y + rectHeight))) {
					score++;
					scoreText.innerHTML = score;
					newTarget();
				}
			}, false);
		}
		else {
			context.clearRect(0,0,canvas.width,canvas.height);
		}
	}
	
	playButton.onclick = function startPlaying(){
		score = 0;
		scoreText.innerHTML = score;
		time = 5;
		timeText.innerHTML = time;
		playing = true;
		newTarget();
		setTimeout(function(){ removeSecond() }, 1000);
		setTimeout(function(){ removeSecond() }, 2000);
		setTimeout(function(){ removeSecond() }, 3000);
		setTimeout(function(){ removeSecond() }, 4000);
		setTimeout(function(){ removeSecond() }, 5000);
	}
	
	function removeSecond(){
		time--;
		timeText.innerHTML = time;
		if (time == 0){
			playing = false;
			newTarget();
		}
	}
	
	function drawRandomRect(){
		var rectx = (Math.random() * (canvas.width - rectWidth));
		var recty = (Math.random() * (canvas.height - rectHeight));
		context.clearRect(0,0,canvas.width,canvas.height)
		context.fillStyle = 'black';
		context.fillRect(rectx,recty,rectWidth,rectHeight);
		context.stroke();
		return {
          x: rectx,
          y: recty
        };
	}
}

function drawLine(canvas, x, y, previous_x, previous_y) {
    var context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.beginPath();
	context.lineCap = "round";
	context.moveTo(previous_x,previous_y);
	context.lineTo(x,y);
	context.lineWidth = 1;
	context.stroke();
}

