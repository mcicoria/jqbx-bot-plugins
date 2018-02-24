var request = require("request");

var UrbanDictionaryPlugin = function (data) {

    var that = this;

    that.bot = data.bot;

    that.help = {
        "/urban word": "Get the urban dictionary definition of a word"
    };

    function getNthDefinition(word, n) {
        request.get({
            url: "https://api.urbandictionary.com/v0/define?term=" + word,
            json: true
        }, function (err, resp) {
            if (err) return that.bot.emit("error", err);
            var str = "No data.";

            if (resp.body && resp.body.list && resp.body.list[n]) {
                str = word + ': ' + resp.body.list[n].definition + "\n";
                str += "Example: " + resp.body.list[n].example;
            }
            else {
                str = "There aren't enough definitions."
            }

            that.bot.emit("do:commandResponseExpandable", str, {
                htmlMessage: str.split("\n").join("<br/><br/>")
            });
        });
    }

    function getDefinition(word) {
        return getNthDefinition(word, 0);
    }

    that.commands = {
        "/urban": function (input, user) {
            if (input) {
                getDefinition(input);
            }
            else {
                response = 'Use "/urban word" to get a definition.';
                that.bot.emit("do:commandResponsePM", response, [user]);
            }
        }
    };

    return that;
};

module.exports = UrbanDictionaryPlugin;
