var search = require('youtube-search');
var info = require('youtube-info');
var config = require('../config');

const 
    _description = "Get a video URL from youtube matching the currently playing song. - by @Captian Internet",
    _help = {
        "/yt (search)": "Get a video URL from youtube matching the currently playing song. Using arguments will return a video based on search terms. - by @Captian Internet"
    }
;

var YouTubePlugin = function (data) {
    
    var that = this;

    that.data = data;
    that.bot = data.bot;
    that.room = data.room;


    that.help = _help;
 
    var opts = {
        maxResults: 5,
        key: config.youtube.key,
        type: "video",
        part: "snippet"
    };

    var i = 0;
    var thresholdMs = 20 * 1000;
    var diffMinIndex = 0;
    var diffMinValue = 9999;
    var durations = [];
    var getInfo = function(results, cb) {

        info(results[i].id, function(err, videoInfo) {
            if (err) return cb(err);

            var videoDurationMs = videoInfo.duration * 1000
            var diff = Math.abs(that.data.currentTrack.duration_ms - videoDurationMs);
            
            if (diff < thresholdMs) {
                return cb(err, results[i], videoDurationMs);
            } else if (diff < diffMinValue) {
                diffMinValue = diff;
                diffMinIndex = i;
            }

            i++;
            if (i < results.length) {
                durations.push(videoDurationMs);
                getInfo(results, cb, videoDurationMs);
            } else {
                return cb(err, results[diffMinIndex], durations[diffMinIndex]);
            }
        });
    }

    that.searchYT = function(terms) {
        
        search(terms, opts, function(err, results) {
            if (err) return that.bot.emit("error", err);
            
            var str = "No data.";
            
            getInfo(results, function(err, result, durationMs) {
                
                if (result.link && result.title) {
                    str = result.title + " : " + result.link;
                }
                else {
                    str = "Couldn't find video."
                }
    
                that.bot.emit("do:commandResponseExpandable", str, {
                    htmlMessage: str.split("\n").join("<br/><br/>")
                });
            });
        });
    
    };

    that.getArtistString = function(artists){
        return artists.map(function(a){
            return a.name
        }).join(" ");
    };

    that.commands = {
        "/yt": function (input, user) {
            if (!input) {
                input = that.getArtistString(that.data.currentTrack.artists) + " " + that.data.currentTrack.name;
            }
            that.searchYT(input);
        }
    };

    return that;
};

YouTubePlugin.help = _help;
YouTubePlugin.description = _description;

module.exports = YouTubePlugin;

// This can be tested locally, like so:
// var YT = new YouTubePlugin({
//     bot:{
//         on: console.log,
//         emit: console.log
//     },
//     currentTrack: {
//         artists: [
//             {
//                 name: "Chronic Future"
//             }
//         ],
//         name: "Static Future",
//         duration_ms: 217000
//     }
// });

// YT.commands["/yt"](null, {});
