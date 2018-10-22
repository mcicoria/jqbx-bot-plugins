const l = require("lyric-get");

let getLyricsPlugin = function(data) {
  let that = this;
  that.bot = data.bot;
  that.help = {
    "/lyrics <song> <artist>":
      "Get (most) of the lyrics for the song that's playing"
  };

  function getLyrics(song, artist, user) {
    l.get(artist, song, function(err, res) {
      if (err) {
        that.bot.emit("do:commandResponsePM", err, user);
      } else {
        that.bot.emit("do:commandResponsePM", res, user);
      }
    });
  }

  that.commands = {
    "/lyrics": function(song, artist, user) {
      if (song && artist) {
        getLyrics(song, artist, user);
      }
    }
  };

  return that;
};

module.exports = getLyricsPlugin;
