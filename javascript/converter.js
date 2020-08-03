/*jshint esversion: 6 */

function convertFormToObject(id) {
	let form = document.getElementById(id);

	let string = "{\n\"title\": \"" + form.elements[0].value + "\",\n";
	string += "\"location\": \"" + form.elements[1].value + "\",\n";
	string += "\"organizer\": \"" + form.elements[2].value + "\",\n";

	if(form.elements[6].checked){
		string += "\"start\": \"" + form.elements[3].value.split("T")[0] + "T00:00" + "\",\n";
		string += "\"end\": \"" + form.elements[4].value.split("T")[0] + "T23:59" + "\",\n";
	} else {
		string += "\"start\": \"" + form.elements[3].value + "\",\n";
		string += "\"end\": \"" + form.elements[4].value + "\",\n";
	}

	string += "\"status\": \"" + form.elements[5].value + "\",\n";
	string += "\"allday\": " + form.elements[6].checked + ",\n";
	string += "\"webpage\": \"" + form.elements[7].value + "\",\n";
	string += "\"imagedata\": ";
	let imagePicker = document.getElementById("imageurl");

	if(!(imagePicker.files && imagePicker.files[0])){
		string += "null,\n";
		string += "\"categories\": [],\n";
		string += "\"extra\": \"" + form.elements[8].value + "\"\n}";
		console.log("Yes you're here:\n" + string);

		return JSON.parse(string);

	} else {
		const fr = new FileReader();
		fr.readAsDataURL(imagePicker.files[0]);
		fr.onload = (function (data) {
			string += "\"";
			string += fr.result;
			string += "\",\n";
			string += "\"categories\": [],\n";
			string += "\"extra\": \"" + form.elements[10].value + "\"\n}";
			console.log("Yes you're here:\n" + string);
			console.table(JSON.parse(string));

			return JSON.parse(string);
		});
	}
}