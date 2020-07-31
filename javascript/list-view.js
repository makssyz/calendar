const url = "http://dhbw.radicalsimplicity.com/calendar/";
const listView = document.getElementById("calendarListView");
let username = "public";
document.cookie = "username=public"

function constructCalendarEvent(calendarEvents) {

    listView.innerHTML = ""

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

    calendarEvents.forEach((calendarEvent, index) => {

        let start = new Date(calendarEvent.start);
        let end = new Date(calendarEvent.end);

        listView.innerHTML +=
            "<div class=\"card\">\n" +
            "    <div class=\"card-header\" id=\"calendarEvent" + index + "\">\n" +
            "        <h2 class=\"mb-0\">\n" +
            "            <button class=\"btn btn-link btn-block text-left\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse" + index + "\" aria-expanded=\"true\" aria-controls=\"collapse" + index + "\">\n" +
            "                " + calendarEvent.title + "\n" +
            "            </button>\n" +
            "        </h2>\n" +
            "    </div>\n" +
            "    <div id=\"collapse" + index + "\" class=\"collapse\" aria-labelledby=\"calendarEvent" + index + "\" data-parent=\"#calendarListView\">\n" +
            "        <div class=\"card-body\">\n" +
            "            <table class=\"table table-sm table-striped\">\n" +
            "                <caption>Entry № " + (index+1) + "</caption>" +
            "                <tr>\n" +
            "                    <th>Field</th>\n" +
            "                    <th>Value</th>\n" +
            "                </tr>" +
            "                <tr>\n" +
            "                    <td>Location</td>\n" +
            "                    <td>" + calendarEvent.location + "</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Organizer</label></td>\n" +
            "                    <td>" + calendarEvent.organizer + "</td>\n" +
            "                </tr>\n" +
            +                "<tr>\n" +
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
            "            </table>\n" +
            "            <button type=\"button\" class=\"btn btn-primary\">\n" +
            "                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-pencil\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "                    <path fill-rule=\"evenodd\" d=\"M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z\"/>\n" +
            "                    <path fill-rule=\"evenodd\" d=\"M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z\"/>\n" +
            "                </svg> Edit\n" +
            "            </button>\n" +
            "            <button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteEvent(\"" + url + "\"," + username + "," + calendarEvent.id + ")\">\n" +
            "                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-trash\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "                    <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/>\n" +
            "                    <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/>\n" +
            "                </svg> Delete\n" +
            "            </button>" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>"
    })}

function getData() {

    username = ((document.getElementById("username").value === "")
        ? "public" : document.getElementById("username").value)

    getCalendarEvents(url, username).then(function (data) {
        constructCalendarEvent(data)
        console.log(data);
    }).catch(function (e) {
        console.warn(e)
    });
}