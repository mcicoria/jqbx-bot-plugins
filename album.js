/*
 * name:    AlbumPlugin
 * by:      cwoozle
 * date:    06/13/2018 
 * 
*/

const 
	_description = "Gets the album name of the current song, by cwoozle",
	_help = {"/album": "Get the album name of the current song! -by cwoozle"}
	;

var AlbumPlugin = function(data){

	var that = this;
	that.data = data;
	that.bot = data.bot;
	that.help = _help;

	//Gets the album name, with error handling for albums that have been taken down, or the case of no album name
	function getAlbum(user){
		var AlbumName = that.data.currentTrack.album.name;
		var SongName = that.data.currentTrack.name;
		var AlbumLink = that.data.currentTrack.album.uri;
		if (!AlbumName){
			that.bot.emit("do:commandResponsePM", "There's been an error, please raise an issue at https://github.com/mcicoria/jqbx-bot-plugins/issues specifying what song caused this error.", user);
		}
		else if (AlbumName.length == 0){
			that.bot.emit("do:commandResponse", "The album has appeared to have been taken down.");
		}
		else if (AlbumName){
			that.bot.emit("do:commandResponse", "The song " + SongName " is from the album: " + AlbumName)
			that.bot.emit("do:commandResponseExpandable", str, {htmlMessage: AlbumLink
		})

	};

	that.commands = {
		"/album": function(user){
			getAlbum(user);
		}
	};
	return that;
};

AlbumPlugin.help = _help;
AlbumPlugin.description = _description;
module.exports = AlbumPlugin;

/*

This can be tested locally via this, just remember to delete the line specifiying "module.exports = AlbumPlugin"!

var LP = new AlbumPlugin({
	bot:{
		emit: console.log
		},
	currentTrack:{
		album: {
			name: "success!"
		}
	}

});

LP.commands["/album"]({uri: "123"});

*/
