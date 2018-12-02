
// Gotta setup our votes!
var voteNope = 0;
var requiredVotesNope = 3;

// We want to keep a list of spotifyURIs of the nopeOut requestorsNope -- this way we can have three unique votes
var requestorsNope = [];

const 
    _description = "Votes for the bot to downvote (nope) a song. Requires 3 people. – by Dynasto",
    _help = {
        "/no": "Votes for the bot to downvote (nope) a song. Requires 3 people. – by Dynasto"
    }
;

var nockoutPlugin = function(data){
    
    var that = this;

    that.bot = data.bot;
    
    that.help = _help;
    
    function processVoteNope (spotifyURI){
        voteNope++;     
        requestorsNope.push(spotifyURI);
    }
    
    // call this on the event when a song changes
    function resetVoteNope () {
        voteNope = 0;
        requestorsNope = [];
    }
    
    function nopeOut(){
        that.bot.emit("do:lame");
        that.bot.emit("do:commandResponse","no, no, no :-1: no way José!!");
    }
    
    // Check against the list of spotify URI to make sure we only count votes for unique users
    function checkNamesNope(spotifyURI){
        var strLen = requestorsNope.length;
        for (i = 0; i < strLen; i++) {
            if(spotifyURI == requestorsNope[i])
                return false;
        }
        return true;
    }

    
    that.commands = {
        "/no": function(input, user) {
            if(voteNope < requiredVotesNope && checkNamesNope(user.uri)){
                processVoteNope(user.uri);
                if(voteNope >= requiredVotesNope){
                    nopeOut();
                }
                if(voteNope == 1) that.bot.emit("do:commandResponse","no");
                if(voteNope == 2) that.bot.emit("do:commandResponse","no, no");
            }else{
                var str = "I'm either already hating this, or you already voted.";
                that.bot.emit("do:commandResponse", str, null, null, null, null, null, [
                    {uri: user.uri}
                ]);
            }

            
        }
    };
    
    that.bot.on("next-track", resetVoteNope); 
    
    return that;
};

nockoutPlugin.help = _help;
nockoutPlugin.description = _description;

module.exports = nockoutPlugin;
/*
// TESTING
var NP = new nockoutPlugin({
    bot:{
        emit: console.log
        }
});

NP.commands["/no"]("124", {uri:"123"});
NP.commands["/no"]("125", {uri:"124"});
NP.commands["/no"]("126", {uri:"125"});

*/