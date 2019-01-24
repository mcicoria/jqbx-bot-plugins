const
    _description = "Bringo - by shepy",
    _help = {
        "/bringo": "Calls the Bringo gif - by shepy"
    }
;

var bringo = function(data) {
  var that = this;
    that.bot = data.bot;
    that.help = _help;
    const str = "https://media.giphy.com/media/xLsaBMK6Mg8DK/giphy.gif";
    that.bot.emit("do:commandResponseExpandable", str);
    return that;
};

bringo.help = _help;
bringo.description = _description;

module.exports = bringo;
