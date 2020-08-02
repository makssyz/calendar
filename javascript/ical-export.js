/*jshint esversion: 6 */

let buildICSEntry = function(calendarEventId){

	retrieveCalendarEvent(host, sessionStorage.getItem("username"), calendarEventId)
		.then(function (event) {
			let title = event.title;
			let place = event.location;
			let begin = new Date(event.start);
			let end = new Date(event.end);
			let organizer = event.organizer;
			let description = event.extra;

			download(makeICS(organizer, begin.toJSON(), end.toJSON(), place, title, description), title + ".ics");
		}).catch(function (e) {
		console.warn(e)
	});
};

let makeICS = function(organizerMail, start, end, place, title, description){
	let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n";
	ics += "ORGANIZER;CN=" + organizerMail + ":MAILTO:" + organizerMail +"\n";
	ics += "DTSTART:" + start + "\n";
	ics += "DTEND:" + end + "\n";
	ics += "LOCATION:" + place + "\n";
	ics += "SUMMARY:" + title + "\n";
	if(description != null) ics += "DESCRIPTION:" + description + "\n";
	ics += "END:VEVENT\nEND:VCALENDAR\n";

	return ics;
};
 
let download = function(download, filename){
	let element = document.createElement('a');
	element.setAttribute('href', 'data:text/calendar;charset=utf-8,' + escape(download));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
};