var singleGif = function(data, config) {
  var that = this;

    that.bot = data.bot;
    that.config = {}; 
    
    Object.assign(that.config, data.config, config || {});

    phrases = {
        "/dicks": "https://media3.giphy.com/media/ebPX2n2kvJHOM/giphy.gif",
        "/thrash": "https://media0.giphy.com/media/xT8qBq60IhnS5KCScM/200.gif"
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

module.exports = singleGif;
