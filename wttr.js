var WttrPlugin = function(data, config){
    
    var that = this;

    that.bot = data.bot;

    that.config = that.bot.pluginConfig || {
        wttr: {
            opts: "Q0np"
        }
    }; 
    Object.assign(that.config, data.config, config || {});

    that.lastCity = null; 

    that.help = {
        "/weather": "Display the weather. Usage: /weather [city]"
    };

    that.commands = {
        "/weather": function(input, user) {
            

            if(!input && !that.lastCity) {
                return that.bot.emit("do:commandResponse", "Usage: /weather [city]");
            }

            var weather_url = "http://wttr.in/" + encodeURIComponent(input || that.lastCity) + "_q0np.png";
            var prepend = (!input && that.lastCity) ? that.lastCity + " " : "";
            that.bot.emit("do:commandResponse", prepend + weather_url);
            that.lastCity = input; 
        },
    };

    return that;
};

module.exports = WttrPlugin;
