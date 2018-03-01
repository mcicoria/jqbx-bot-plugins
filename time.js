var request = require('request');

const apikey = "API_KEY";

const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json"; //GET address=target
const timezoneURL =  "https://maps.googleapis.com/maps/api/timezone/json"; //GET location=lat,lng, timestamp=current

var TimePlugin = function(data){
	    
	var that = this;

	that.bot = data.bot;

	that.help = {
		"/time": "Displays the local time of anywhere. By @vmednis aka kweakzsz"
	};


	that.resolveTime = function(time, addr, geoloc) {
		if(geoloc) {
			//The geolocation of address is already known
			request.get({
				url: timezoneURL,
				qs: {
					location: geoloc.lat + "," + geoloc.lng,
					timestamp: time,
					key: apikey
				},
				json: true
			}, function(err, resp, body) {
				if(err) {
					that.bot.emit("error", err);
					return;
				}

				let response = "";

				if(body.status == "OK") {
					let rawOffset = body.rawOffset;
					let dstOffset = body.dstOffset;
					
					//Calculate the time from offsets
					var localTime = new Date((time + dstOffset + rawOffset) * 1000);
					response = "Current date and time in " + addr + " is " + localTime.toUTCString() + ".";
				} else if(body.status == "REQUEST_DENIED") {
					that.bot.emit("error", body.error_message);

				} else {
					response = "Sorry, couldn't find timezone info for " + addr + ".";
				}

				that.bot.emit("do:commandResponse", response);
			});


		} else {
			//Have to find the coordinates first and then try again	
			request.get({
				url: geocodeURL,
				qs: {
					address:addr,
					key:apikey
				},
				json: true
			}, function(err, resp, body) {
				if(err) {
					that.bot.emit("error", err);
					return;
				} 

				let response = "";

				if(body.status == "OK") {
					lat = body.results[0].geometry.location.lat;
					lng = body.results[0].geometry.location.lng;
					
					//Try again but with geolocations
					that.resolveTime(time, addr, {lat:lat, lng:lng});

				} else if(body.status == "REQUEST_DENIED") {
					that.bot.emit("error", body.error_message);

				} else {
					response = "Couldn't find a place called " + addr + ".";
				}

				that.bot.emit("do:commandResponse", response);
			});
		}
	}

	that.commands = {
		"/time": function(input, user) {

			//Validate user input
			if(!input) {
				that.bot.emit("do:commandResponse", "Usage: /time [location]");
				return;
			}

			let utctime = Math.floor(new Date().getTime() / 1000); // In seconds for google api

			that.resolveTime(utctime, input);
		}
	};

	return that;
};

module.exports = TimePlugin;
