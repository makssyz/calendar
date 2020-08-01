function convertFormToObject(id) {
	let form = document.getElementById(id);
	
	let string= "{\n\"name\": \"" + form.elements[0].value + "\",\n";
	string += "\"location\": \"" + form.elements[1].value + "\",\n";
	string += "\"organizer\": \"" + form.elements[2].value + "\",\n";
	string += "\"start\": \"" + form.elements[3].value + "\",\n";
	string += "\"end\": \"" + form.elements[4].value + "\",\n";
	string += "\"status\": \"" + form.elements[5].value + "\",\n";
	string += "\"allday\": " + form.elements[6].checked + ",\n";
	string += "\"webpage\": \"" + form.elements[7].value + "\",\n";
	string += "\"imagedata\": \"" + form.elements[8].value + "\",\n";
	string += "\"categories\": [],\n";
	string += "\"extra\": \"" + form.elements[10].value + "\"\n}";
	console.log("Form String: " + string)
	
	return JSON.parse(string);
}