$listOfPersons = [];

$(window).ready(function(){
	displayList();
});

function displayList() {
	if(!localStorage.getItem('persons')) {
		populateStorage();
	} else {
		setNames();
	}
	//$('#personList').html += "<p>";
	$.each($listOfPersons,function(index){
		$('#personList').append($listOfPersons[index] + "<br>");
	});
}

function resetStorage() {
	localStorage.removeItem("persons");
}

function addPerson() {
	$listOfPersons.push($('#fPerson').val());
	localStorage.setItem('persons', JSON.stringify($listOfPersons));
	$('#personList').html("");
	displayList();
	$('#fPerson').html("");
}

function populateStorage() {
	localStorage.setItem('persons', JSON.stringify(["John", "Cindy", "Mary"]));
}

function setNames() {
	$listOfPersons = JSON.parse(localStorage.getItem('persons'));
}

function jsonCallback(json){
  $json = json;
	$.each($json,function(i, item){
		$('#jsonList').append($json[i].name + ", email : " + $json[i].email + "<br>");
	});
}

$.ajax({
  url: "https://imp-portfolio-demonstration.herokuapp.com/json/persons.jsonp",
  dataType: "jsonp"
});
