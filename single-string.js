var SingleStringPlugin = function(data, config){
    
    var that = this;

    that.bot = data.bot;

    Object.assign(that.config, data.config, config || {});

    phrases = {
        "/shrug": "Â¯\_(ã)_/Â¯",
        "/shots": "SHOTS"
    };

    that.commands = {}
 
    for (var i = 0; i < Object.entries(phrases).length; i++) {

        /* make array from each key/object pair in phrases, sequentially */
        phrase_array = Object.entries(phrases)[i];

        /* build function for each phrase in phrases */ 
        that.commands[phrase_array[0]] = function(input, user) { 
            that.bot.emit("do:commandResponse", phrase_array[1]);
        };
    };

    return that;
};

module.exports = SingleStringPlugin;
