
function loadUpdateForm(calendarEvent) {
    displayFormPage();
    console.log(calendarEvent);
    loadUpdateButton(calendarEvent);
    loadEventIntoForm(calendarEvent);
}

function loadCreateForm() {
    displayFormPage();
    clearForm()
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
    document.getElementById("status").value = "";
    document.getElementById("allday").value = false;
    document.getElementById("webpage").value = "";
    document.getElementById("categories").value = "";
    document.getElementById("extra").value = "";
}