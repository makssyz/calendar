//needs "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"

//missing error handling (Bad Request)
//missing validation of attributes

//needed for examples
//const host= "http://dhbw.radicalsimplicity.com/calendar/";
//const username= "test";

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

//---------------------------------------------

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

function createCalendarEvent(url, user, event) {
	return new Promise(function (resolve, reject) {
		$.post(url + user + "/events", JSON.stringify(event))
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
	console.log("Event ID: " + id)
	console.log("Deleting event from " + url + user + "/events")
	$.delete(url + user + "/events" + "/" + id);
}

function updateCalendarEvent(url, user, id, event) {
	return new Promise(function (resolve, reject) {
		$.put(url + user + "/events" + "/" + id, JSON.stringify(event))
			.done(function (data) {
				console.log("Event: " + JSON.stringify(event))
				console.log("Update event to " + url + user + "/events")
				resolve(data);
			})
			.fail(function (e) {
				reject(e);
			});
	});
}

//missing retrieve element //not needed

//---------------------------------------------
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
//returns string
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

//--------------------------------------------

function addToCategory(url, user, eventId, categoryId){
	jQuery.post(url + user + "/categories/" + categoryId + "/" + eventId);
}

function removeFromCategory(url, user, eventId, categoryId){
	jQuery.delete(url + user + "/categories/" + categoryId + "/" + eventId);
}

//examples-------------------------------------------
  
/*createCalendarEvent(host, username, {
		"title": "And one more test",
		"location": "Stuttgart",
		"organizer": "dhbw@radicalsimplicity.com",
		"start": "2020-12-24T18:00",
		"end": "2020-12-24T23:30",
		"status": "Busy",
		"allday": false,
		"webpage": "http://www.radicalsimplicity.com/",
		"imagedata": null,
		"categories": [],
		"extra": null
	});*/

//deleteCalendarEvent(host, username, 47);

/*updateCalendarEvent(host, username, 45, {
		"title": "And one more test",
		"location": "Oberfranken",
		"organizer": "dhbw@radicalsimplicity.com",
		"start": "2020-12-24T18:00",
		"end": "2020-12-24T23:30",
		"status": "Busy",
		"allday": false,
		"webpage": "http://www.radicalsimplicity.com/",
		"imagedata": null,
		"categories": [],
		"extra": null
	}); *///maybe with one attr changed and change obj in function
	
//createCategory(host, username, "Studium");

/*getCalendarEvents(host, username).then(function (data) {
	console.log(data);
  }).catch(function (e) {
	console.warn(e)
  });
  
getCategories(host, username).then(function (data) {
	console.log(data);
  }).catch(function (e) {
	console.warn(e)
  });
  
resolveCategory(host, username, 4).then(function (data) {
	console.log(data);
  }).catch(function (e) {
	console.warn(e)
  });*/
  
//deleteCategory(host, username, 12);

//removeFromCategory(host, username, 21, 4);
