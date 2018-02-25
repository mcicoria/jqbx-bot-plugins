var request = require("request");
var search = require('youtube-search');

var YouTubePlugin = function (data) {
	
    var that = this;

    that.bot = data.bot;

    that.help = {
        "/youtube (search)": "Get a video URL from youtube matching the currently playing song. Using arguments will return a video based on search terms."
    };
 
	var opts = {
		maxResults: 1,
		key: "AIzaSyDoSOhs5fzHSnqRvaQZ-k08cW2IrBiyx5s",
		type: "video"
	};

    function searchYT(terms) {
		
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
	 
			console.log(results);
			
			that.bot.emit("do:commandResponseExpandable", str, {
                htmlMessage: str
			});

		});
		
		

    }

    that.commands = {
        "/yt": function (input, user) {
            if (!input) {
                input = that.data.currentTrack.artists.name + " " + that.data.currentTrack.name;
            }
			searchYT(input);
        }
    };

    return that;
};

module.exports = YouTubePlugin;