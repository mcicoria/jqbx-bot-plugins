/* 
 *name: rarePlugin
 *by..: Hayden Sykes
 *date: 2018/08/02
 *format borrowed from u/cwoozle - AlbumPlugin
 */
 
const 
	_description = "give someone props for their rare track by treating them to a rare steak. -by smudgezilla",
	_help = {"/rare": "give someone props for their rare track by treating them to a rare steak. -by smudgezilla"}
	;

var rarePlugin = function(data){

	var that = this;
	that.data = data;
	that.bot = data.bot;
	that.help = _help;

	//posts a rare steak emoji (a.k.a cut of meat) + "Face Savoring Delicious Food" emoji |  unicode: U+1F969 and U+1F60B 
  function xtraRare(user){
		emojiStr = String.fromCodePoint(0x1F969) +' '+ String.fromCodePoint(0x1F60B);
		that.bot.emit("do:commandResponse", emojiStr);
	};

	that.commands = {
		"/rare": function(user){
			xtraRare(user);
		}
	};
	return that;
};

rarePlugin.help = _help;
rarePlugin.description = _description;
module.exports = rarePlugin;

/*Test locally, just remember to delete the line specifiying "module.exports = rarePlugin"!

var LP = new rarePlugin({
	bot:{
		emit: console.log
		}
});
LP.commands["/rare"]({uri: "123"});
*/
