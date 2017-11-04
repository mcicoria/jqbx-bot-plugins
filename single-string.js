
var SingleStringPlugin = function(data, config){
    
    var that = this;

    that.bot = data.bot;
    that.config = {}; 
    
    Object.assign(that.config, data.config, config || {});

    phrases = {
        "/shrug": "¯\\_(ツ)_/¯",
        "/shots": "SHOTS"
    };

    that.commands = {}

    function generateReplaceFunction(replacement) {
        return function(input, user) {
            that.bot.emit("do:commandResponse", replacement);
        }
    }
 
    for (var key in phrases) {
        that.commands[key] = generateReplaceFunction(phrases[key]);
    }

    return that;
};

module.exports = SingleStringPlugin;
