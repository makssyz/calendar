/*jshint esversion: 6 */

function convertFormToObject(id) {
	let form = document.getElementById(id);

	let string = "{\n\"title\": \"" + form.elements[0].value + "\",\n";
	string += "\"location\": \"" + form.elements[2].value + "\",\n";
	string += "\"organizer\": \"" + form.elements[3].value + "\",\n";

	if(form.elements[6].checked){
		string += "\"start\": \"" + form.elements[4].value.split("T")[0] + "T00:00" + "\",\n";
		string += "\"end\": \"" + form.elements[5].value.split("T")[0] + "T23:59" + "\",\n";
	} else {
		string += "\"start\": \"" + form.elements[4].value + "\",\n";
		string += "\"end\": \"" + form.elements[5].value + "\",\n";
	}

	string += "\"status\": \"" + form.elements[7].value + "\",\n";
	string += "\"allday\": " + form.elements[6].checked + ",\n";
	string += "\"webpage\": \"" + form.elements[8].value + "\",\n";
	string += "\"imagedata\": ";

	string += "null,\n";
	string += "\"categories\": [],\n";
	string += "\"extra\": \"" + form.elements[1].value.replace("\"", "") + "\"\n}";
	console.log("Yes you're here:\n" + string);

	return JSON.parse(string);

}