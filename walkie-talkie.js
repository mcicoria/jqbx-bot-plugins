const
    _description = "Send and recieve messages from other rooms",
    _help = {
        "/hay": "Get a list of room ids for walkie-talkie messaging.",
        "/hay [room id] [message]": "Send a message to another room. Ex: /hay boteshop Hi there"
    };

var WalkieTalkiePlugin = function(data) {

    var that = this;

    that.bot = data.bot;
    that.data = data;

    that.help = _help;

    that.displayRooms = function(input, user, message){
        var rooms = []; 
        if(!that.data.world) return;

        rooms = that.getRooms(input,user,message);

        rooms = rooms.map(function(r){
            return {
                text: r.title,
                name: r.id
            };
        });

        var msg = WalkieTalkiePlugin.formatOutput(
            "Rooms",
            "A list of room ids to use with /hay", 
            rooms,
            {
                name: "ID",
                text: "Room"
            }
        );

        that.bot.emit("do:commandResponsePM",msg.str,user, {
            htmlMessage: msg.html 
        });

        return;
    };

    that.getRooms = function(input, user, message) {
        var rooms = []; 

        if(!that.data.world) return;

        rooms = that.data.world.bots.filter(function(bc){

            //Check disabled
            if(bc.bot && bc.bot.disabledPlugins.indexOf("walkie-talkie") >= 0) {
                return false;
            }

            //Check banned
            if(bc.room && bc.room.banned && bc.room.banned.indexOf(user.uri) >= 0) {
                return false;
            }

            return true;
        }).map(function(bc){
            
            if(bc.room) {
                return {
                    title: bc.room.title || bc.room.name,
                    id: bc.room.handle || bc.room.jqbx_id
                };
            }

            if(bc.bot && bc.bot.room) {
                return {
                    title: bc.bot.room.name,
                    id: bc.bot.room.id
                };
            }

            return null;

        }).filter(function(r){
            return (r && r!="" && r!=null); 
        });

        return rooms;
    };

    that.isValidRoom = function(input, user, message) {
        if(!input || !user) return false;

        var 
            rooms = that.getRooms(input, user, message),
            id = input.split(" ")[0]
        ;

        if(!rooms || rooms.length <= 0) return false;

        return rooms.find(function(r){
            return (r && r.id && r.id == id);
        });
    };

    that.commands = {
        "/hay": function(input, user, message, isHelp) {

            if(isHelp) {
                var msg = WalkieTalkiePlugin.helpMessage(); 

                that.bot.emit("do:commandResponsePM", msg.str, user, {
                    htmlMessage: msg.html
                });
                return;
            }

            if(!input || input == ""){
                that.displayRooms(input, user, message);
                return;
            }

            if(!that.isValidRoom(input,user,message)){
                that.bot.emit("do:commandResponsePM","Invalid room. Use /hay for a list of rooms.",user);
                return;
            }

            var 
                username = user.username || user.id || user.uri.split(":")[2],
                roomMessage = "",
                handle = that.data.room.handle || that.data.room.jqbx_id || that.bot.room.id,
                title = that.data.room.title || that.bot.room.name || handle || "",
                userMessage,
                roomID = input.split(" ")[0]
            ;

            roomMessage += "Message from "+ title + ". ";
            roomMessage += "Reply with /hay " + handle +" your message";

            userMessage = username + " ("+title+"): " + message.replace("@"+that.bot.user.username,"").split(" ").slice(2).join(" ");
            that.bot.emit("do:roomMessage", roomID, userMessage, user);
            that.bot.emit("do:roomMessage", roomID, roomMessage, user, {type: "notice"});
        }
    };


    return that;
};
WalkieTalkiePlugin.description = _description;
WalkieTalkiePlugin.help = _help;
module.exports = WalkieTalkiePlugin;
