const 
    _description = "Gets the Genius.com lyrics for the current song - by Darin",
    _help = {
        "/lyrics": "All you need to do is '/lyrics'"
    }
;

var LyricsPlugin = function (data) {

    var that = this;
    that.data = data;
    that.bot = data.bot;

    that.help = _help;

    function getLyrics(input) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.genius.com/search?q='+encodeURIComponent(input)+ '&access_token='+'PAnZYL4n-buTYKFhiqrGQWpjkdkU4rq1FppHDGTKcUGBofvGpFd6tElA6IkxCli-', true);
        xhr.send();
        xhr.onreadystatechange = processRequest;
        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                var data = response.response;
                //grab the first match
                if (data && data.hits[0]) {
                    //get lyrics for this song
                    that.bot.emit("do:commandResponse", 'https://genius.com'+data.hits[0].result.api_path);
                }
            }
        }
    }
    that.getArtistString = function(artists){
        return artists.map(function(a){
            return a.name
        }).join(" ");
    };

    that.commands = {
        "/lyrics": function (input) {
            var SongName = that.data.currentTrack.name;
            var ArtistName = that.getArtistString(that.data.currentTrack.artists);
            getLyrics(ArtistName + " " + SongName);
        }
    };

    return that;
};

LyricsPlugin.help = _help;
LyricsPlugin.description = _description;

module.exports = LyricsPlugin;

//This can be tested locally, like so:
// var oracle = new LyricsPlugin({
//     bot:{
//         on: console.log,
//         emit: console.log
//     },
//     currentTrack: {
//         artists: [
//             {
//                 name: "The Story So Far"
//             }
//         ],
//         name: "Empty Space",
//         username: "Darin",
//         userUri: "123"
//     }
// });

// oracle.commands["/lyrics"]("", {});
