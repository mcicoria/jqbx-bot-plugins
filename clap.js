/* 
 *name: clapPlugin
 *by..: Oscar Romin
 *date: 2018/08/27
 *format borrowed from u/cwoozle - AlbumPlugin
 */

const
    _description = "Give someone a clap!. -by Dynasto",
    _help = {
        "/clap": "Give someone a clap!. -by Dynasto"
    };

var clapPlugin = function (data) {

    var that = this;
    that.data = data;
    that.bot = data.bot;
    that.help = _help;

    //posts a clap emoji (a.k.a two hands together) |  unicode: U+1F44F 
    function doTheClap(user) {
        emojiStr = String.fromCodePoint(0x1F44F);
        that.bot.emit("do:commandResponse", emojiStr);
    };

    that.commands = {
        "/clap": function (user) {
            doTheClap(user);
        }
    };
    return that;
};

clapPlugin.help = _help;
clapPlugin.description = _description;
module.exports = clapPlugin;

/*Test locally, just remember to delete the line specifiying "module.exports = clapPlugin"!

var LP = new clapPlugin({
	bot:{
		emit: console.log
		}
});
LP.commands["/clap"]({uri: "123"});
*/