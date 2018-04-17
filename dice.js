// I'm like 90% sure this works ¯\_(ツ)_/¯

const
	_description = "Rolls dice, default 1 six-sided die - by cz4r",
	_help = {
		"/roll": "Roll the dice! '/roll' will roll a six-sided die, '/roll 5d8' will roll 5 eight-sided dice. - by cz4r"
	}
;

var DicePlugin = function(data) {
	var that = this;
	that.bot = data.bot;
	that.help = _help;
	var str;
	that.commands = {
		"/roll": function(input) {
			var total;
			if(input) {
				var vals = input.split("d");
				if (parseInt(vals[0], 10) && parseInt(vals[1], 10)) {
					for (i = 0; i < parseInt(vals[0]); i++ {
						total += Math.floor(Math.random() * (parseInt(vals[1])+1));
					}
					str = "You rolled: " + total;
				}
			}
			else {
				total += Math.floor(Math.random() * 7);
				str = "You rolled: " + total;
			}
			that.bot.emit("do:commandResponseExpandable", str);
		}
	};
	
	return that;
};

DicePlugin.help = _help;
DicePlugin.description = _description;

module.exports = DicePlugin;
