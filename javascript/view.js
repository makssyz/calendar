let url = "http://dhbw.radicalsimplicity.com/calendar/";
let listView = document.getElementById("calendarListView");

console.log("List View: " + listView)

function constructCalendarEvent(calendarEvents) {

    listView.innerHTML = "";

    announceWhenListIsEmpty(calendarEvents);

    calendarEvents.forEach(calendarEvent => {
        addEventToHtmlString(listView, calendarEvent)
    })}

function login() {
    let username = document.getElementById("username").value;

    if (username === "") {
        alert("You have not provided a username.")
        return;
    }

    setCookie("username", username, 7)
    getData();
}

function getData() {

    let username = getCookie("username");
    console.log("Getting data from " + url + username + "/events");
    if (username === "") return;
    setUsernameInput(username);

    getCalendarEvents(url, username).then(function(data) {
        constructCalendarEvent(data);
        console.log(data);
    }).catch(function (e) {
        console.warn(e);
    });
}

// Wrapper functions for connectivity
function addCalendarEventInView(calendarEvent) {
    createCalendarEvent(url, getCookie("username"), calendarEvent)
        .then(function() {
            getData();
            displayListViewPage();
        }).catch(function (e) {
        console.warn(e)
    });
}

function deleteCalendarEventInView(calendarEventId) {
    deleteCalendarEvent(url, getCookie("username"), calendarEventId);
    let deletedEvent = document.getElementById("card" + calendarEventId);
    deletedEvent.parentElement.removeChild(deletedEvent);
}

function editCalendarEventInView(editedEvent, calendarEventId) {
    updateCalendarEvent(url, getCookie("username"), calendarEventId, editedEvent)
        .then(function() {
            console.log("editedEvent:");
            console.table(editedEvent);
            console.log("calendarEventId: " + calendarEventId);
            getData();
        }).catch(function (e) {
            console.warn(e)
    });
}

function setUsernameInput(username) {
    document.getElementById("username").value = username;
}

function announceWhenListIsEmpty(calendarEvents) {
    if (calendarEvents.length === 0) {
        listView.innerHTML =
            "<div class=\"card\">\n" +
            "    <div class=\"card-header\">\n" +
            "        <div class=\"mb-0\">\n" +
            "                There are no Events for this user.\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>"
    }
}

function addEventToHtmlString(htmlElement, calendarEvent) {
    htmlElement.innerHTML += createHtmlString(calendarEvent);
}

function createHtmlString(calendarEvent) {
    return "<div id=\"card" + calendarEvent.id + "\" class=\"card\">\n" +
             createContentString(calendarEvent) +
        "</div>"
}

function createContentString(calendarEvent) {
    return createHeaderString(calendarEvent)+
        "    <div id=\"collapse" + calendarEvent.id + "\" class=\"collapse\" aria-labelledby=\"calendarEvent" + calendarEvent.id + "\" data-parent=\"#calendarListView\">\n" +
        "        <div class=\"card-body\">\n" +
        createTableString(calendarEvent) +
        createButtonString(calendarEvent) +
        "        </div>\n" +
        "    </div>\n"
}

function createHeaderString(calendarEvent) {
    return "    <div class=\"card-header\" id=\"calendarEvent" + calendarEvent.id + "\">\n" +
        "        <h2 class=\"mb-0\">\n" +
        "            <button class=\"btn btn-link btn-block text-left\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse" + calendarEvent.id + "\" aria-expanded=\"true\" aria-controls=\"collapse" + calendarEvent.id + "\">\n" +
        "                " + calendarEvent.title + "\n" +
        "            </button>\n" +
        "        </h2>\n" +
        "    </div>\n"
}

function createTableString(calendarEvent) {
    let start = new Date(calendarEvent.start);
    let end = new Date(calendarEvent.end);

    return "            <table class=\"table table-sm table-striped\">\n" +
        "                <tr>\n" +
        "                    <td>Location</td>\n" +
        "                    <td>" + calendarEvent.location + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td>Organizer</label></td>\n" +
        "                    <td>" + calendarEvent.organizer + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td>Start</td>\n" +
        "                    <td>" + start.toLocaleString() + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td>End</td>\n" +
        "                    <td>" + end.toLocaleString() + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td>Status</td>\n" +
        "                    <td>" + calendarEvent.status + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td>All Day</td>\n" +
        "                    <td>" + calendarEvent.allday + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td>Webpage</td>\n" +
        "                    <td>" + calendarEvent.webpage + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td>Image</td>\n" +
        "                    <td>" + calendarEvent.imageurl + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td>Categories</td>\n" +
        "                    <td>" + calendarEvent.categories + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td>Extra</td>\n" +
        "                    <td>" + calendarEvent.extra + "</td>\n" +
        "                </tr>" +
        "            </table>\n";
}

function createButtonString(calendarEvent) {
    return "            <button type=\"button\" class=\"btn btn-primary\" onclick='editCreateFormToUpdateForm(" + JSON.stringify(calendarEvent) + ")'>\n" +
        "                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-pencil\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                    <path fill-rule=\"evenodd\" d=\"M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z\"/>\n" +
        "                    <path fill-rule=\"evenodd\" d=\"M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z\"/>\n" +
        "                </svg> Edit\n" +
        "            </button>\n" +
        "            <button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteCalendarEventInView(" + calendarEvent.id + ");" + "\">\n" +
        "                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-trash\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                    <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n" +
        "                    <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n" +
        "                </svg> Delete\n" +
        "            </button>" +
        "            <button type=\"button\" class=\"btn btn-info\" onclick='buildICSEntry(" + JSON.stringify(calendarEvent) + ")'>\n" +
        "                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-file-earmark-arrow-down\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                    <path d=\"M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z\"/>\n" +
        "                    <path d=\"M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z\"/>\n" +
        "                    <path fill-rule=\"evenodd\" d=\"M5.646 9.146a.5.5 0 0 1 .708 0L8 10.793l1.646-1.647a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 0-.708z\"/>\n" +
        "                    <path fill-rule=\"evenodd\" d=\"M8 6a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4A.5.5 0 0 1 8 6z\"/>\n" +
        "                </svg> Download\n" +
        "            </button>\n"
}