

const 
    _description = "Can decide between a list of items! - by diablo",
    _help = {
        "/choose": "Use like /choose red, blue, green"
    }
;

var DecisionMakerPlugin = function (data) {

    var that = this;

    that.bot = data.bot;

    that.help = _help;

    function getDecision(input) {
        var str = input;
        var array = str.split(',');
        var randomNumber = Math.floor(Math.random()*array.length);
        if(array[randomNumber].trim() == ''){
            that.bot.emit("do:commandResponseExpandable", 'I am unable to make a choice.');

        } else {
            var decision = 'Beep boop. Choosing ' + array[randomNumber].trim();

            that.bot.emit("do:commandResponseExpandable", decision);
        }
        

    }



    that.commands = {
        "/choose": function (input) {
            getDecision(input);
        }
    };

    return that;
};

DecisionMakerPlugin.help = _help;
DecisionMakerPlugin.description = _description;

module.exports = DecisionMakerPlugin;

//This can be tested locally, like so:
// var oracle = new DecisionMakerPlugin({
//     bot:{
//         on: console.log,
//         emit: console.log
//     }
// });

// oracle.commands["/choose"]("one, two, three", {});
