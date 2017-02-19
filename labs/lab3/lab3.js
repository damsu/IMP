var connection = new WebSocket('ws://obscure-waters-98157.herokuapp.com');
var opened = false;
// When the connection is open, send some data to the server
connection.onopen = function () {
	opened = true;
};

// Log errors
connection.onerror = function (error) {
	console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
	if (opened==true) {
		var chatWindow = document.getElementById("chatRoom");
		chatWindow.innerHTML += e.data + "<br>";
		chatWindow.scrollTop = chatWindow.scrollHeight;
	}
};

function sendMessage() {
	if (opened==true) {
		var textBox = document.getElementById("chatInput");
		connection.send(textBox.value);
	}
}


// LOCAL STORAGE ----------------------------------------------------------------
var listOfPersons = [];

function displayList() {
	var list = document.getElementById("personList");
	if(!localStorage.getItem('names')) {
		populateStorage();
	} else {
		setNames();
	}
	list.innerHTML += "<p>";
	for (i=0; i<listOfPersons.length; i++) {
		list.innerHTML += listOfPersons[i] + "<br>";
	}
	list.innerHTML += "</p>";
}

function resetStorage() {
	localStorage.removeItem("names");
}

function addPerson() {
	var list = document.getElementById("personList");
	var textField = document.getElementById("fPerson");
	listOfPersons.push(textField.value);
	localStorage.setItem('names', JSON.stringify(listOfPersons));
	list.innerHTML = "";
	displayList();
	textField.value = "";
}

function populateStorage() {
	localStorage.setItem('names', JSON.stringify(["John", "Cindy", "Mary"]));
}

function setNames() {
	listOfPersons = JSON.parse(localStorage.getItem('names'));
}


// AUDIO ELEMENT ----------------------------------------------------------------
var audio = new Audio('http://stream.basso.fi:8000/stream');

function playAudio() {
	audio.play();
}

function stopAudio() {
	audio.pause();
}

function setVolume(value) {
	audio.volume = value;
}

// VIDEO ELEMENT ----------------------------------------------------------------


