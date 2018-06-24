const
    _description = "Dicks - by cz4r",
    _help = {
        "/dicks": "Just type it dude wtf - by cz4r"
    }
;

var dicks = function(data) {
  var that = this;
    that.bot = data.bot;
    that.help = _help;
    const str = "https://media3.giphy.com/media/ebPX2n2kvJHOM/giphy.gif";
    that.bot.emit("do:commandResponseExpandable", str);
    return that;
};

dicks.help = _help;
dicks.description = _description;

module.exports = dicks;
