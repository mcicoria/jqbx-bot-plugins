var request = require("request");


const 
    _description = "Get a dad joke! Will give a random joke if you do not use a search term. - by @Captian Internet",
    _help = {
        "/dadjoke [search]": "Get a dad joke! Will give a random joke if you do not use a search term. - by @Captian Internet"
    }
;

var DadJokePlugin = function (data) {

    var that = this;

    that.bot = data.bot;

    that.help = _help;

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
            var str = "No yolks found.";

            if (resp.body.joke) {
                str = resp.body.joke;
            }else if(resp.body.results[0]){
                var rand = Math.floor(Math.random() * resp.body.results.length);
                // console.log(resp.body.results[rand].joke);
            }else {
                str = "No yolks could be found."
            }

            that.bot.emit("do:commandResponseExpandable", str, {
                htmlMessage: str.split("\n").join("<br/><br/>")
            });
        });
    }



    that.commands = {
        "/dadjoke": function (input, user) {
            if (input) {
                getJoke("https://icanhazdadjoke.com/search?term=" + encodeURIComponent(input),20);
            }
            else {
                getJoke("https://icanhazdadjoke.com/",1);
            }
        }
    };

    return that;
};

DadJokePlugin.help = _help;
DadJokePlugin.description = _description;

module.exports = DadJokePlugin;

// This can be tested locally, like so:
// var DJ = new DadJokePlugin({
//     bot:{
//         on: console.log,
//         emit: console.log
//     }
// });

// DJ.commands["/dadjoke"]("cat dog", {});
