/*jshint esversion: 6 */

const host = "http://dhbw.radicalsimplicity.com/calendar/";

jQuery.each( [ "put", "delete" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

//Server side interaction

function getCalendarEvents(url, user) {
	return new Promise(function (resolve, reject) {
		jQuery.get(url + user + "/events")
			.done(function (data) {
				resolve(data);
			})
			.fail(function (e) {
				reject(e);
			});
	});
}

function retrieveCalendarEvent(url, user, id) {
	return new Promise(function (resolve, reject) {
		jQuery.get(url + user + "/events/" + id)
			.done(function (data) {
				console.log("Getting event with ID: " + id);
				console.log("Getting event from " + url + user + "/events/" + id);
				resolve(data);
			})
			.fail(function (e) {
				reject(e);
			});
	});
}

function createCalendarEvent(url, user, event) {
	return new Promise(function (resolve, reject) {
		jQuery.post(url + user + "/events", JSON.stringify(event))
			.done(function (data) {
				console.log("Event: " + JSON.stringify(event));
				console.log("Posting event to " + url + user + "/events");
				resolve(data);
			})
			.fail(function (e) {
				reject(e);
			});
	});
}

function deleteCalendarEvent(url, user, id){
	return new Promise(function (resolve, reject) {
		jQuery.delete(url + user + "/events" + "/" + id)
			.done(function (data) {
				console.log("Event ID: " + id);
				console.log("Deleting event from " + url + user + "/events");
				resolve(data);
			})
			.fail(function (e) {
				reject(e);
			});
	});
}

function updateCalendarEvent(url, user, id, event) {
	return new Promise(function (resolve, reject) {
		jQuery.put(url + user + "/events" + "/" + id, JSON.stringify(event))
			.done(function (data) {
				console.log("Event: " + JSON.stringify(event));
				console.log("Update event to " + url + user + "/events");
				resolve(data);
			})
			.fail(function (e) {
				reject(e);
			});
	});
}

//Category management

function getCategories(url, user){
	return new Promise(function (resolve, reject) {
		jQuery.get(url + user + "/categories")
			.done(function (data) {
				resolve(data);
			})
			.fail(function (e) {
				reject(e);
			});
	});
}

function createCategory(url, user, name){
	jQuery.post(url + user + "/categories", "{ \"name\": \"" + name + "\" }");
}

function resolveCategory(url, user, id){
	return new Promise(function (resolve, reject) {
		jQuery.get(url + user + "/categories/" + id)
			.done(function (data) {
				resolve(data.name);
			})
			.fail(function (e) {
				reject(e);
			});
	});
}

function deleteCategory(url, user, id){
	jQuery.delete(url + user + "/categories/" + id);
}

function addToCategory(url, user, eventId, categoryId){
	jQuery.post(url + user + "/categories/" + categoryId + "/" + eventId);
}

function removeFromCategory(url, user, eventId, categoryId){
	jQuery.delete(url + user + "/categories/" + categoryId + "/" + eventId);
}


async function addImageToEvent(url, user, eventId, imageObj){
	return jQuery.post(url + user + "/images/" + eventId, imageObj);
}