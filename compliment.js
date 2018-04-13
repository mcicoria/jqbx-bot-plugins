var request = require("request");


const 
    _description = "Will give you a random compliment! - by Mason",
    _help = {
        "/compliment": "Get a compliment! Will give a random compliment. - by Mason"
    }
;

var ComplimentPlugin = function (data) {

    var that = this;

    that.bot = data.bot;

    that.help = _help;

    function getCompliment(input) {
        request.get({
            url: "https://compliment-api.herokuapp.com/",
            json: true,
            headers: {
                'User-Agent': 'JQBX.FM Bot'
            }
        }, function (err, resp) {

            if (err) return that.bot.emit("error", err);
            var str = "No compliments found.";

            if (resp.body) {
                str = resp.body;
            }

            // if (input) {
            //     str = "Hey " + input + ", "+ str;
            // }

            that.bot.emit("do:commandResponseExpandable", str);
        });
    }



    that.commands = {
        "/compliment": function (input) {
            getCompliment(input);
        }
    };

    return that;
};

ComplimentPlugin.help = _help;
ComplimentPlugin.description = _description;

module.exports = ComplimentPlugin;

// This can be tested locally, like so:
// var DJ = new ComplimentPlugin({
//     bot:{
//         on: console.log,
//         emit: console.log
//     }
// });

// DJ.commands["/compliment"]("", {});
