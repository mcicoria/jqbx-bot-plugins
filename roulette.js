const 
    _description = "A beautiful game of Russian Roulette for the current DJ. - By @tjwds",
    _help = {
        "/roulette": "Feeling lucky?"
    }
;

var RoulettePlugin = function(data){
    
    var that = this;

    that.bot = data.bot;
    that.data = data;

    that.help = _help;

    that.roulette = function (user){
        if (Math.floor(Math.random()*6) == 1){
            that.bot.emit("do:lame");
            that.bot.emit("do:commandResponse", "BLAM!");
        } else if(user) {
            that.bot.emit("do:commandResponsePM", "You got lucky this time.", user);
        }
    };

    that.isDj = function (user) {
        return (that.data.currentTrack && that.data.currentTrack.userUri == user.uri);
    };

    // Get updated track data like upvotes, downvotes, and stars
    that.bot.on("update-track", function(data){
        if(!data || !data.currentTrack) return; 
        that.data.currentTrack = data.currentTrack;
    });

    // Get the latest track
    that.bot.on("next-track", function(data){
        if(!data || !data.nextTrack) return; 
        that.data.currentTrack = data.nextTrack;
        
        // Special case here
        if(that.data.currentTrack.username == "🗑🐼") {
            that.roulette();
        }
    });
    
    that.commands = {
        "/roulette": function(input, user, message) {

            if(!that.isDj(user)) {
                that.bot.emit("do:commandResponsePM", "You must be the DJ to play", user);
                return;
            }

            that.roulette(user);
        }
    };

    return that;
};
RoulettePlugin.help = _help;
RoulettePlugin.description = _description;
module.exports = RoulettePlugin;

//Local testing below

// var RP = new RoulettePlugin({
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
//         name: "James Brown",
//         username: "🗑🐼",
//         userUri: "123"
//     }
// });

// for(var i = 0; i < 100; i++){
//     RP.commands["/roulette"](null, {uri: "123"});
//     RP.commands["/roulette"](null, {uri: "12345"});
// }
