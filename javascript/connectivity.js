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
		$.get(url + user + "/events")
			.done(function (data) {
				resolve(data)
			})
			.fail(function (e) {
				reject(e)
			})
	});
}

function createEvent(url, user, event){
	$.post(url + user + "/events", JSON.stringify(event));
}

function deleteEvent(url, user, id){
	$.delete(url + user + "/events" + "/" + id);
}

function updateEvent(url, user, id, event){
	$.put(url + user + "/events" + "/" + id, JSON.stringify(event));
}

//missing retrieve element //not needed

//---------------------------------------------
function getCategories(url, user){
	return new Promise(function (resolve, reject) {
		$.get(url + user + "/categories")
			.done(function (data) {
				resolve(data)
			})
			.fail(function (e) {
				reject(e)
			})
	});
}

function createCategory(url, user, name){
	$.post(url + user + "/categories", "{ \"name\": \"" + name + "\" }",
		function(data, status){
		//alert("Data: " + data + "\nStatus: " + status);
	});
}

function resolveCategory(url, user, id){
//returns string
	return new Promise(function (resolve, reject) {
		$.get(url + user + "/categories/" + id)
			.done(function (data) {
				resolve(data.name)
			})
			.fail(function (e) {
				reject(e)
			})
	});
}

function deleteCategory(url, user, id){
	$.delete(url + user + "/categories/" + id);
}

//--------------------------------------------

function addToCategory(url, user, eventId, categoryId){
	$.post(url + user + "/categories/" + categoryId + "/" + eventId);
}

function removeFromCategory(url, user, eventId, categoryId){
	$.delete(url + user + "/categories/" + categoryId + "/" + eventId);
}

//examples-------------------------------------------
  
/*createEvent(host, username, {
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

//deleteEvent(host, username, 47);

/*updateEvent(host, username, 45, {
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

/*getEvents(host, username).then(function (data) {
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
