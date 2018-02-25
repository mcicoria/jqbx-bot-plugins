var search = require('youtube-search');
var config = require('../config');

const 
    _description = "Get a video URL from youtube matching the currently playing song. - by @Captian Internet",
    _help = {
        "/youtube (search)": "Get a video URL from youtube matching the currently playing song. Using arguments will return a video based on search terms. - by @Captian Internet"
    }
;

var YouTubePlugin = function (data) {
    
    var that = this;

    that.data = data;
    that.bot = data.bot;
    that.room = data.room;


    that.help = _help;
 
    var opts = {
        maxResults: 1,
        key: config.youtube.key,
        type: "video"
    };

    that.searchYT = function(terms) {
        
        search(terms, opts, function(err, results) {
            if (err) return that.bot.emit("error", err);
            
            var str = "No data.";

            if (results[0].link && results[0].title) {
                str = results[0].title + " : " + results[0].link;
            }
            else {
                str = "Couldn't find video."
            }

            that.bot.emit("do:commandResponseExpandable", str, {
                htmlMessage: str.split("\n").join("<br/><br/>")
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

// // This can be tested locally, like so:
// var YT = new YouTubePlugin({
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

// YT.commands["/yt"](null, {});
