var request = require('request');
var config = require('../config');

const apikey = config.google.key;

const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json"; //GET address=target
const timezoneURL =  "https://maps.googleapis.com/maps/api/timezone/json"; //GET location=lat,lng, timestamp=current

const 
    _description = "Get local time of basically anywhere. - By @vmednis aka kweakzsz",
    _help = {
        "/time": "Displays the local time of anywhere. By @vmednis aka kweakzsz"
    }
;


function atLeastTwoDigits(num) {
    return num / 10 < 1 ? "0" + num : num;
}


var TimePlugin = function(data){
        
    var that = this;

    that.bot = data.bot;

    that.help = _help;

    that.getGeolocation = function(addr, done) {
        request.get({
            url: geocodeURL,
            qs: {
                address: addr,
                key: apikey
            },
            json: true
        }, function(err, resp, body) {
            if(err) return done(err);


            if(body.status != "OK") {
                if(body.status == "REQUEST_DENIED") return done(body);
                else return done(null, null);
            }

            var lat, lng; 

            lat = body.results[0].geometry.location.lat;
            lng = body.results[0].geometry.location.lng;

            return done(null, { lat: lat, lng: lng });

        });
    };


    that.getGeoTime = function(time, geoloc, done) {
        
        if(!geoloc) return;

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
            if(err) return done(err);

            if(body.status != "OK") {
                if(body.status == "REQUEST_DENIED") return done(body);
                else return done(null, null);
            }

            return done(null, body);
        });
    };

    that.formatGeoTime = function(time, geoTime) {
        let 
            rawOffset = geoTime.rawOffset,
            dstOffset = geoTime.dstOffset,
            localTime
        ;
        
        //Calculate the time from offsets
        localTime = new Date((time + dstOffset + rawOffset) * 1000);

        return atLeastTwoDigits(localTime.getUTCHours()) + ":" + atLeastTwoDigits(localTime.getUTCMinutes());
    }

    that.commands = {
        "/time": function(input, user, message, isHelp) {

            //Validate user input
            if(!input || input == "" || isHelp) {
                var msg = TimePlugin.helpMessage(); 

                that.bot.emit("do:commandResponsePM", msg.str, user, {
                    htmlMessage: msg.html
                });

                return;
            }

            let utctime = Math.floor(Date.now() / 1000), addr = input.trim(); // In seconds for google api

            that.getGeolocation(input, function(err, geo){
                if(err) {
                    that.bot.emit("error", err);
                }

                if(!geo) {
                    return that.bot.emit("do:commandResponse", "Couldn't find a place called " + addr + ".");
                }
                
                that.getGeoTime(utctime, geo, function(err, result){
                    if(err || !result) {
                        if(err) that.bot.emit("error", err);
                        return that.bot.emit("do:commandResponsePM", "Sorry, couldn't find timezone info for " + addr + ".");
                    }

                    let response = "Current time in " + addr + " is " + that.formatGeoTime(utctime, result) + ".";
                    
                    that.bot.emit("do:commandResponse", response);

                });
            });

            
        }
    };

    return that;
};

TimePlugin.help = _help;
TimePlugin.description = _description;

module.exports = TimePlugin;

// This can be tested locally, like so:

// TimePlugin.helpMessage = function(name, help, description){
//     return {
//         html: "Nice Help",
//         str: "Nice Help"
//     }
// };



// var TP = new TimePlugin({
//     bot:{
//         on: console.log,
//         emit: console.log
//     },
//     currentTrack: {
//         artists: [
//             {
//                 name: "Cage The Elephant"
//             }
//         ],
//         name: "James Brown"
//     }
// });

// TP.commands["/time"]("Las Vegas, NV", {uri: "123"});
// TP.commands["/time"]("fresno", {uri: "123"});
// TP.commands["/time"]("asdfasdf", {uri: "123"});
// TP.commands["/time"]("123", {uri: "123"});
// TP.commands["/time"]("JJJFDKI8888****", {uri: "123"});
// TP.commands["/time"]("help", {uri: "123"}, "/time help", true);
