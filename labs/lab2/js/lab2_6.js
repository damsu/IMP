var listOfPersons = ["John", "Judy", "Penelope"];

function displayList() {
	var list = document.getElementById("personList");
	list.innerHTML += "<p>";
	for (i=0; i<listOfPersons.length; i++) {
		list.innerHTML += listOfPersons[i] + "<br>";
	}
	list.innerHTML += "</p>";
}

function addPerson() {
	var list = document.getElementById("personList");
	var textField = document.getElementById("fPerson");
	listOfPersons.push(textField.value);
	list.innerHTML = "";
	displayList();
	textField.value = "";
}
