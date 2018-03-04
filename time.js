/*
 * name:    FactPlugin
 * by:      aeketn : JQBX Waddle Bird
 * date:    02/26/2018 
 * 
 * by:      mcicoria : Single plugin for facts
 * update:  03/03/2018
 */

var request = require("request");

const 
    _description = "Get a facts about today, a year, or number. - by @Waddle Bird",
    _help = {
        "/fact year [yyyy]": "Specify a year to get a fact about that year, or input nothing for a random year. - by @Waddle Bird",
        "/fact num [#]": "Specify a number to get a fact about it, or input nothing for a random number fact. - by @Waddle Bird",
        "/fact today": "Get a fact about today's date - by @Waddle Bird"
    },
    API_URL = "http://numbersapi.com/"
;

var FactPlugin = function (data) {

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

    that.subCommands = {
        "year": function (input, user) {

            if (input == parseInt(input, 10)) {
                yearFact(API_URL + encodeURIComponent(input) + "/year", 20);
            } else {
                yearFact(API_URL+ "random/year", 20);
            }

            return true;
        },
        "num": function (input, user) {
            var typeOfFact = "/trivia"
            var rand = Math.floor(Math.random() * 2)

            if (0 == rand) {
                typeOfFact = "/math"
            }

            if (input == parseInt(input, 10)) {
                numFact(API_URL + encodeURIComponent(input) + typeOfFact, 20);
            } else {
                numFact(API_URL + "random/" + typeOfFact, 20);
            }

            return true;
        },
        "today": function (input, user, message) {

            var date = new Date();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            dateFact(API_URL + month + "/" + day, 20);

            return true;
        }
    };

    that.commands = {
        "/fact": function(input, user, message) {

            if(FactPlugin.parseSubCommand(that.subCommands)(input, user, message)) return;

            var msg = FactPlugin.helpMessage(); 

            that.bot.emit("do:commandResponsePM", msg.str, user, {
                htmlMessage: msg.html
            });
        }
    };

    return that;
};

FactPlugin.help = _help;
FactPlugin.description = _description;


module.exports = FactPlugin;


// FactPlugin.helpMessage = function(name, help, description){
//     return {
//         html: "Nice Help",
//         str: "Nice Help"
//     }
// };

// FactPlugin.parseSubCommand = function (subcommands) {

//     return function(input, user, message){

//         var 
//             inputArr = input.split(" "), 
//             sub = inputArr[0]
//         ;

//         if(input && sub &&  subcommands[sub]) {
//             return subcommands[sub](inputArr.slice(1).join(" "), user, message);
//         }

//     };
// };


// ////This can be tested locally, like so:
// var DJ = new FactPlugin({
//    bot:{
//        on: console.log,
//        emit: console.log,
//        user: {
//          username: "botname",
//          uri: "123"
//        }
//    }
// });

// DJ.commands["/fact"]("today", {}, "/fact today");
// DJ.commands["/fact"]("num 2", {}, "/fact num 2");
// DJ.commands["/fact"]("year 1999", {}, "/fact year 1999");
