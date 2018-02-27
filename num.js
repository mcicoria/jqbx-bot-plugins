/*
 * name: 	NumFactPlugin
 * by:		aeketn : JQBX Waddle Bird
 * date:	02/26/2018
 */

var request = require("request");

const 
    _description = "Get a fact about about a number. - by @Waddle Bird",
    _help = {
        "/num [#]": "Specify a number to get a fact about it, or input nothing for a random number fact. - by @Waddle Bird"
    };

var NumFactPlugin = function (data) {

    var that = this;
    that.bot = data.bot;
    that.help = _help;

    function numFact(searchURL,n) {
        request.get({
            url: searchURL,
            json: true,
            limit: n,
            headers: {
                'User-Agent': 'JQBX.FM Bot'
            }
        }, function (err, resp) {
            if (err) return that.bot.emit("error", err);
            var str = "Couldn't find your number... is it imaginary?";

            if (resp.body) {
                str = resp.body;
            } else {
				var str = "Couldn't find your number... is it imaginary?";
            }

            that.bot.emit("do:commandResponseExpandable", str, {
                htmlMessage: str.split("\n").join("<br/><br/>")
            });
        });
    }



    that.commands = {
        "/num": function (input, user) {
			var typeOfFact = "/trivia"
			var rand = Math.floor(Math.random() * 2)

			if (0 == rand) {
				typeOfFact = "/math"
			}

			if (input == parseInt(input, 10)) {
				numFact("http://numbersapi.com/" + encodeURIComponent(input) + typeOfFact, 20);
			} else {
				numFact("http://numbersapi.com/random/" + typeOfFact, 20);
			}
		}
    };

    return that;
};

NumFactPlugin.help = _help;
NumFactPlugin.description = _description;

module.exports = NumFactPlugin;

////This can be tested locally, like so:
//var DJ = new NumFactPlugin({
//    bot:{
//        on: console.log,
//        emit: console.log
//    }
//});
//
//DJ.commands["/num"]("2", {});
