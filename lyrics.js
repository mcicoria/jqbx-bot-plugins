const l = require("lyric-get");
let artist;
let song;

let getLyricsPlugin = function(data) {
  let that = this;
  that.bot = data.bot;
  that.help = {
    "/lyrics <song> <artist>":
      "Get (most) of the lyrics for the song that's playing"
  };

  function getLyrics(currentSong, currentArtist, user) {
    l.get(currentArtist, currentSong, function(err, res) {
      if (err) {
        that.bot.emit("do:commandResponsePM", err, user);
      } else {
        that.bot.emit("do:commandResponsePM", res, user);
      }
    });
  }

  that.bot.on("next-track", function(data) {
    song = data.nextTrack.name;
    artist = data.nextTrack.artists.name;
  });

  that.commands = {
    "/lyrics": function(user) {
        getLyrics(song, artist, user);
    }
  };

  return that;
};

module.exports = getLyricsPlugin;