/*
 * name: 	YearPlugin
 * by:		aeketn : JQBX Waddle Bird
 * date:	02/26/2018
 */

var request = require("request");

const 
    _description = "Get a fact about a year. - by @Waddle Bird",
    _help = {
        "/year [yyyy]": "Specify a year to get a fact about that year, or input nothing for a random year. - by @Waddle Bird"
    };

var YearPlugin = function (data) {

    var that = this;
    that.bot = data.bot;
    that.help = _help;

    function yearFact(searchURL,n) {
        request.get({
            url: searchURL,
            json: true,
            limit: n,
            headers: {
                'User-Agent': 'JQBX.FM Bot'
            }
        }, function (err, resp) {
            if (err) return that.bot.emit("error", err);
            var str = "Sorry, that year probably never happened.";

            if (resp.body) {
                str = resp.body;
            } else {
                str = "Sorry, that year probably never happened."
            }

            that.bot.emit("do:commandResponseExpandable", str, {
                htmlMessage: str.split("\n").join("<br/><br/>")
            });
        });
    }



    that.commands = {
        "/year": function (input, user) {
			if (input == parseInt(input, 10)) {
                yearFact("http://numbersapi.com/" + encodeURIComponent(input) + "/year", 20);
			} else {
				yearFact("http://numbersapi.com/random/year", 20);
			}
		}
    };

    return that;
};

YearPlugin.help = _help;
YearPlugin.description = _description;

module.exports = YearPlugin;

////This can be tested locally, like so:
//var DJ = new YearPlugin({
//    bot:{
//        on: console.log,
//        emit: console.log
//    }
//});
//
//DJ.commands["/year"]("(+/-)yyyy", {});
