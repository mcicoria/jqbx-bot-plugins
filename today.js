/*
 * name: 	TodayPlugin
 * by:		aeketn : JQBX Waddle Bird
 * date:	02/26/2018
 *
 * [Note]:
 * I chose to do only today instead of any date
 * so that it would be more fun for users to come
 * back each day to get facts.
 */

var request = require("request");

const 
    _description = "Get a fact about today's date. - by @Waddle Bird",
    _help = {
        "/today": "Get a fact about today's date - by @Waddle Bird"
    };

var TodayPlugin = function (data) {

    var that = this;
    that.bot = data.bot;
    that.help = _help;

    function dateFact(searchURL,n) {
        request.get({
            url: searchURL,
            json: true,
            limit: n,
            headers: {
                'User-Agent': 'JQBX.FM Bot'
            }
        }, function (err, resp) {
            if (err) return that.bot.emit("error", err);
            var str = "Sorry, today does not exist. Try again tomorrow.";

            if (resp.body) {
                str = resp.body;
            } else {
                str = "Sorry, today does not exist. Try again tomorrow."
            }

            that.bot.emit("do:commandResponseExpandable", str, {
                htmlMessage: str.split("\n").join("<br/><br/>")
            });
        });
    }



    that.commands = {
        "/today": function (user) {
			var date = new Date();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			dateFact("http://numbersapi.com/" + month + "/" + day, 20);
		}
    };

    return that;
};

TodayPlugin.help = _help;
TodayPlugin.description = _description;

module.exports = TodayPlugin;

////This can be tested locally, like so:
//var DJ = new TodayPlugin({
//    bot:{
//        on: console.log,
//        emit: console.log
//    }
//});
//
//DJ.commands["/today"]({});
