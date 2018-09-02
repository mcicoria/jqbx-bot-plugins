var request = require("request");

// Gotta setup our votes!
var voteNope = 0;
var requiredVotesNope = 3;

// We want to keep a list of spotifyURIs of the nopeOut requestorsNope -- this way we can have three unique votes
var requestorsNope = [];

var nockoutPlugin = function(data){
    
    var that = this;

    that.bot = data.bot;
    
    that.help = {
            "/no": "Votes for the bot to downvote (nope) a song. Requires 3 people."
        };
    
    function processVote (spotifyURI){
        voteNope++;     
        requestorsNope.push(spotifyURI);
    }
    
    // call this on the event when a song changes
    function resetVote(){
        voteNope = 0;
        requestorsNope = [];
    }
    
    function nopeOut(){
        that.bot.emit("do:nope", that.bot.user);
        that.bot.emit("do:commandResponse",":-1:, :-1:, :-1:");
    }
    
    // Check against the list of spotify URI to make sure we only count votes for unique users
    function checkNames(spotifyURI){
        var strLen = requestorsNope.length;
        for (i = 0; i < strLen; i++) {
            if(spotifyURI == requestorsNope[i])
                return false;
        }
        return true;
    }

    
    that.commands = {
        "/no": function(input, user) {
            if(voteNope < requiredVotesNope && checkNames(user.uri)){
                processVote(user.uri);
                if(voteNope >= requiredVotesNope){
                    nopeOut();
                }
                if(voteNope == 1) that.bot.emit("do:commandResponse",":-1:");
                if(voteNope == 2) that.bot.emit("do:commandResponse",":-1:, :-1:");
            }else{
                var str = "I'm either already hating this, or you already voted.";
                that.bot.emit("do:commandResponse", str, null, null, null, null, null, [
                    {uri: user.uri}
                ]);
            }

            
        }
    };
    
    that.bot.on("next-track", resetVote); 
    
    return that;
};

module.exports = nockoutPlugin;
/* TESTING
var NP = new nockoutPlugin({
    bot:{
        emit: console.log
        }
});

NP.commands["/no"]("124", {uri:"123"});
NP.commands["/no"]("125", {uri:"124"});
NP.commands["/no"]("126", {uri:"125"});
*/