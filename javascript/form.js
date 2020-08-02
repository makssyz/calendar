/*jshint esversion: 6 */
/*jshint scripturl:true*/

function loadUpdateForm(calendarEventId) {

    console.log(calendarEventId);
    retrieveCalendarEvent(host, sessionStorage.getItem("username"), calendarEventId)
        .then(function (calendarEvent) {
            displayFormPage();
            console.log(calendarEvent);
            loadUpdateButton(calendarEvent);
            loadEventIntoForm(calendarEvent);
        }).catch(function (e) {
        console.warn(e);
    });
}

function loadCreateForm() {
    displayFormPage();
    loadCreateButton();
    clearForm();
}

function loadUpdateButton(calendarEvent) {
    let form = document.getElementById("createEventForm");
    let button = document.getElementById("createEventButton");

    form.action = "javascript:editCalendarEventInView(convertFormToObject('createEventForm'), " + calendarEvent.id + ")";
    button.className = "btn btn-primary";
    button.innerText = "Update!";
}

function loadCreateButton() {
    let form = document.getElementById("createEventForm");
    let button = document.getElementById("createEventButton");

    form.action = "javascript:addCalendarEventInView(convertFormToObject('createEventForm'))";
    button.className = "btn btn-success";
    button.innerText = "Create!";
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
    document.getElementById("categories").value = calendarEvent.categories;
    document.getElementById("extra").value = calendarEvent.extra;
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("location").value = "";
    document.getElementById("organizer").value = "";
    document.getElementById("start").value = "";
    document.getElementById("end").value = "";
    document.getElementById("status").value = "Free";
    document.getElementById("allday").value = false;
    document.getElementById("webpage").value = "";
    document.getElementById("categories").value = "";
    document.getElementById("extra").value = "";
}