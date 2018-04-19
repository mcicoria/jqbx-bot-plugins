// I'm like 90% sure this works ¯\_(ツ)_/¯

const
    _description = "Rolls dice, default 1 six-sided die - by cz4r",
    _help = {
        "/roll": "Roll the dice! '/roll' will roll a six-sided die, '/roll 5d8' will roll 5 eight-sided dice. - by cz4r"
    }
;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var DicePlugin = function(data) {
    var that = this;
    that.bot = data.bot;
    that.help = _help;

    that.commands = {
        "/roll": function(input) {

            input = input || "1d6";

            var vals = input.split("d");
            var die = parseInt(vals[0] || 1, 10);
            var sides = parseInt(vals[1] || 6, 10);

            var total = getRandomIntInclusive(die, sides*die);
            var str = "You rolled: " + total;
            
            that.bot.emit("do:commandResponseExpandable", str);
        }
    };
    
    return that;
};

DicePlugin.help = _help;
DicePlugin.description = _description;

module.exports = DicePlugin;



// ////This can be tested locally, like so:
// var DC = new DicePlugin({
//    bot:{
//        on: console.log,
//        emit: console.log,
//        user: {
//          username: "botname",
//          uri: "123"
//        }
//    }
// });

// for(var i = 100; i > 0; i--){
//     console.log("--")
//     DC.commands["/roll"](null, {}, "/roll");
//     DC.commands["/roll"]("2", {}, "/roll 2");
//     DC.commands["/roll"]("5d8", {}, "/roll 5d8");
//     DC.commands["/roll"]("1d2", {}, "/roll 1d2");
//     DC.commands["/roll"]("ed2", {}, "/roll ed2");
//     DC.commands["/roll"]("3.4d2", {}, "/roll 3.4d2");
// }
