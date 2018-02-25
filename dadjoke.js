var request = require("request");

var DadJokePlugin = function (data) {

    var that = this;

    that.bot = data.bot;

    that.help = {
        "/dadjoke (search)": "Get a dad joke! Will give a random joke if you do not use a search term."
    };

    function getJoke(searchURL,n) {
        request.get({
            url: searchURL,
            json: true,
			limit: n,
			headers: {
				'User-Agent': 'JQBX.FM Bot'
			}
        }, function (err, resp) {
            if (err) return that.bot.emit("error", err);
            var str = "No data.";

            if (resp.body.joke) {
                str = resp.body.joke;
            }else if(resp.body.results[0]){
				var rand = Math.floor(Math.random() * resp.body.results.length);
				console.log(resp.body.results[rand].joke);
			}else {
                str = "No jokes could be found."
            }

            that.bot.emit("do:commandResponseExpandable", str, {
                htmlMessage: str.split("\n").join("<br/><br/>")
            });
        });
    }



    that.commands = {
        "/dadjoke": function (input, user) {
            if (input) {
                getJoke("https://icanhazdadjoke.com/search?term=" + input,20);
            }
            else {
                getJoke("https://icanhazdadjoke.com/",1);
            }
        }
    };

    return that;
};

module.exports = DadJokePlugin;
