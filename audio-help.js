const
  _description = "Will try to help you with your audio issues! - by Myztiq",
  _help = {
    "/audiohelp": "Audio isn't working? Get some help. - by Myztiq"
  }
;

const HELP = "Try clicking the Sync Audio button, wait 10 seconds. If that doesn't work, click the" +
  " devices icon in the top right to check its sending audio to the right location. " +
  "Consider restarting the app and spotify. " +
  "If all else fails use /relink to get a direct to spotify link and follow along until the server cools down.";

var AudioHelp = function (data) {

  var that = this;

  that.bot = data.bot;

  that.help = _help;

  function getAudioHelp() {
    that.bot.emit("do:commandResponseExpandable", HELP);
  }

  that.commands = {
    "/audiohelp": function () {
      getAudioHelp();
    }
  };

  return that;
};

AudioHelp.help = _help;
AudioHelp.description = _description;

module.exports = AudioHelp;

// This can be tested locally, like so:
// var DJ = new AudioHelp({
//     bot:{
//         on: console.log,
//         emit: console.log
//     }
// });

// DJ.commands["/audiohelp"]();
