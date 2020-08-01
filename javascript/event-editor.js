
function editCalendarEvent(calendarEvent) {

    setCookie("event", JSON.stringify(calendarEvent), 1)

    redirect();
    console.log(calendarEvent);
    changeButton(calendarEvent);
    loadEventIntoForm(calendarEvent);
}

function redirect() {
    displayFormPage()
}

function changeButton (calendarEvent) {
    let form = document.getElementById("createEventForm");
    let button = document.getElementById("createEventButton");

    // let calendarEvent = getCookie("event");

    console.log(calendarEvent);


    console.log(form)
    console.log(button)

    // form.action = "updateCalendarEvent(" + url + "," + username + "," + calendarEvent.id + "," + JSON.stringify(calendarEvent) + ")";
    button.className = "btn btn-primary";
    button.innerText = "Update!";

    console.log(form)
    console.log(button)
}

function loadEventIntoForm(calendarEvent) {
    document.getElementById("title").value = calendarEvent.title;
    document.getElementById("location").value = calendarEvent.location;
    document.getElementById("organizer").value = calendarEvent.organizer;
    document.getElementById("start").value = calendarEvent.start;
    document.getElementById("end").value = calendarEvent.end;
    document.getElementById("status").value = calendarEvent.status;
    document.getElementById("allday").value = calendarEvent.allday;
    document.getElementById("webpage").value = calendarEvent.webpage;
    document.getElementById("imageurl").value = calendarEvent.imageurl;
    document.getElementById("categories").value = calendarEvent.categories;
    document.getElementById("extra").value = calendarEvent.extra;
}