/*jshint esversion:6*/
const months = [ 
		"January", 
		"February", 
		"March", 
		"April", 
		"May", 
		"June", 
		"July", 
		"August", 
		"September", 
		"October", 
		"November", 
		"December" 
];

// Given data for events in JSON format
let event_data = {
	"events": []
};

// Setup the calendar with the current date
$(document).ready(preInit(new Date()));

function preInit(date){
	let today = date.getDate();

	// Set click handlers for DOM elements
	$(".right-button").click({date: date}, next_year);
	$(".left-button").click({date: date}, prev_year);
	$(".month").click({date: date}, month_click);

	updateCalendar(host, sessionStorage.getItem("username"));
	// Set current month as active
	$(".months-row").children().eq(date.getMonth()).addClass("active-month");
	init_calendar(date);
	let events = check_events(today, date.getMonth()+1, date.getFullYear());
	show_events(events, months[date.getMonth()], today);
}

// Initialize the calendar by appending the HTML dates
function init_calendar(date) {
	$(".tbody").empty();
	$(".events-container").empty();
	let calendar_days = $(".tbody");
	let month = date.getMonth();
	let year = date.getFullYear();
	let day_count = days_in_month(month, year);
	let row = $("<tr class='table-row'></tr>");
	let today = date.getDate();
	// Set date to 1 to find the first day of the month
	date.setDate(1);
	let first_day = date.getDay();
	// 35+firstDay is the number of date elements to be added to the dates table
	// 35 is from (7 days in a week) * (up to 5 rows of dates in a month)
	for(let i=0; i<35+first_day; i++) {
		// Since some of the elements will be blank,
		// need to calculate actual date from index
		let day = i-first_day+1;
		// If it is a sunday, make a new row
		if(i%7===0) {
			calendar_days.append(row);
			row = $("<tr class='table-row'></tr>");
		}
		// if current index isn't a day in this month, make it blank
		if(i < first_day || day > day_count) {
			let curr_date = $("<td class='table-date nil'>"+"</td>");
			row.append(curr_date);
		}
		else {
			let curr_date = $("<td class='table-date'>"+day+"</td>");
			let events = check_events(day, month+1, year);
			if(today===day && $(".active-date").length===0) {
				curr_date.addClass("active-date");
				show_events(events, months[month], day);
			}
			// If this date has any events, style it with .event-date
			if(events.length!==0) {
				curr_date.addClass("event-date");
			}
			// Set onClick handler for clicking a date
			curr_date.click({events: events, month: months[month], day:day}, date_click);
			row.append(curr_date);
		}
	}
	// Append the last row and set the current year
	calendar_days.append(row);
	$(".year").text(year);
}

// Get the number of days in a given month/year
function days_in_month(month, year) {
	let monthStart = new Date(year, month, 1);
	let monthEnd = new Date(year, month + 1, 1);
	return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
}

// Event handler for when a date is clicked
function date_click(event) {
	$(".events-container").show(250);
	$("#dialog").hide(250);
	$(".active-date").removeClass("active-date");
	$(this).addClass("active-date");
	show_events(event.data.events, event.data.month, event.data.day);
}

// Event handler for when a month is clicked
function month_click(event) {
	$(".events-container").show(250);
	$("#dialog").hide(250);
	let date = event.data.date;
	$(".active-month").removeClass("active-month");
	$(this).addClass("active-month");
	let new_month = $(".month").index(this);
	date.setMonth(new_month);
	init_calendar(date);
}

function onTabMonth() {
	$(".events-container").show(250);
	$("#dialog").hide(250);
	init_calendar(new Date());
}

// Event handler for when the year right-button is clicked
function next_year(event) {
	$("#dialog").hide(250);
	let date = event.data.date;
	let new_year = date.getFullYear()+1;
	$("year").html(new_year);
	date.setFullYear(new_year);
	init_calendar(date);
}

// Event handler for when the year left-button is clicked
function prev_year(event) {
	$("#dialog").hide(250);
	let date = event.data.date;
	let new_year = date.getFullYear()-1;
	$("year").html(new_year);
	date.setFullYear(new_year);
	init_calendar(date);
}

// Display all events of the selected date in card views
function show_events(events, month, day) {
	// Clear the dates container
	$(".events-container").empty();
	$(".events-container").show(250);
	// If there are no events for this date, notify the user
	if(events.length===0) {
		let event_card = $("<div class='event-card'></div>");
		let event_name = $("<div class='event-name'>There are no events planned for "+month+" "+day+".</div>");
		$(event_card).css({ "border-left": "10px solid #FF1744" });
		$(event_card).append(event_name);
		$(".events-container").append(event_card);
	}
	else {
		// Go through and add each event as a card to the events container
		for(let i=0; i<events.length; i++) {
			let event_card = $("<div class='event-card' id=event-card-" + events[i].id + "></div>");
			let event_name = $("<div class='event-name'>"+events[i].title + ":</div>");
			let idString = "tableContainer" + i;
			let container = $("<div class='accordion' id=" + idString +  "></div>");
			$(event_card).append(event_name).append(container);//.append(event_count);
			$(".events-container").append(event_card);
			addEventToMonthlyHtmlString(document.getElementById(idString), events[i]);
		}
	}
}

// Checks if a specific date has any events
function check_events(day, month, year) {
	let events = [];
	for(let i=0; i<event_data.events.length; i++) {
		let event = event_data.events[i];
		if((new Date(event.start)).getDate()===day &&
			(new Date(event.start)).getMonth()+1===month &&
			(new Date(event.start)).getYear()+1900===year) {
				events.push(event);
			}
	}
	return events;
}

function addEventToMonthlyHtmlString(htmlElement, calendarEvent) {
htmlElement.innerHTML +=
	"<div class=\"card-body\">\n" +
	createTableString(calendarEvent) +
	createButtonString(calendarEvent) +
	"</div>\n";
}

function deleteCalendarEventInMonthlyView(id){
	let deleted = document.getElementById("event-card-" + id);
	deleted.parentElement.removeChild(deleted);
	const date = new Date(event_data.events.find(element => element.id == id).start);
	event_data.events = event_data.events.filter(event => event.id != id);
	preInit(date);
}

//fill events
function updateCalendar(host, username) {
	getCalendarEvents(host, username).then(function (data) {
		event_data.events=data;
	  }).catch(function (e) {
		console.warn(e);
	  });
}