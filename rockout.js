var request = require("request");

// Gotta setup our votes!
var vote = 0;
var requiredVotes = 3;

// We want to keep a list of spotifyURIs of the rockout requestors -- this way we can have three unique votes
var requestors = [];

var rockoutPlugin = function(data){
    
    var that = this;

    that.bot = data.bot;
    
    that.help = {
            "/ro": "Votes for the bot to rock out (dope) a song"
        };

    
    function processVote (spotifyURI){
        vote++;     
        requestors.push(spotifyURI);
    }
    
    // call this on the event when a song changes
    function resetVote(){
        vote = 0;
        requestors = [];
    }
    
    function rockOut(){
        that.bot.emit("do:dope", that.bot.user);
        that.bot.emit("do:commandResponse","row, row, row your :canoe: gently down the stream");
    }
    
    // Check against the list of spotify URI to make sure we only count votes for unique users
    function checkNames(spotifyURI){
        var strLen = requestors.length;
        for (i = 0; i < strLen; i++) {
            if(spotifyURI == requestors[i])
                return false;
        }
        return true;
    }

    
    that.commands = {
        "/ro": function(input, user) {
            if(vote < requiredVotes && checkNames(user.uri)){
                processVote(user.uri);
                if(vote >= requiredVotes){
                    rockOut();
                }
            }else{
                var str = "I'm either already bopping, or you already voted.";
                that.bot.emit("do:commandResponse", str, str, that.bot.room.id, user, null, null, [{uri: user.uri}]);
            }

            
        }
    };
    
    that.bot.on("next-track", resetVote); 
    
    return that;
};

module.exports = rockoutPlugin;
