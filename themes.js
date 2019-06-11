/*
 * name:    ThemesPlugin
 * by:      sloonark
 * date:    11/06/2019
 * 
 * Type /theme to get a random theme.
 * Each DJ must choose a song based on that theme.
 * 
*/

const 
    _description = "Gets a random theme for playing the theme game.",
    _help = {"/theme": "Get a random theme."}
    ;

var ThemesPlugin = function(data){

    var that = this;
    that.data = data;
    that.bot = data.bot;
    that.help = _help;

    //Gets a random theme from the themes array
    function getTheme(user){

        var thisTheme = getRandomTheme();

        that.bot.emit("do:commandResponse", "The theme is: "+ thisTheme +"!");
        
    };

    function getRandomTheme()
    {
        var theme = themes[Math.floor(Math.random()*themes.length)];

        return theme;
    }

    var themes = [
        "sunshine",
        "rain",
        "memories",
        "angry",
        "sleep",
        "beauty",
        "fast",
        "animals",
        "cities and countries",
        "travel",
        "vehicles",
        "breaking up",
        "coldness",
        "evil",
        "fear",
        "insanity",
        "fire",
        "warmth",
        "death",
        "worry",
        "happiness",
        "pain",
        "pleasure",
        "strength",
        "flying",
        "jumping",
        "children",
        "loneliness",
        "friendship",
        "school",
        "crime",
        "fighting",
        "morning",
        "night",
        "dreaming",
        "freedom",
        "lucky",
        "snakes and spiders",
        "food",
        "money",
        "water",
        "stars",
        "space",
        "movies",
        "fruit",
        "houses",
        "hearts",
        "sticks and stones",
        "love",
        "brains",
        "streets",
        "heaven and hell",
        "talk",
        "questions",
        "trust",
        "America",
        "underwater",
        "nature",
        "winter",
        "days of the week",
        "months and years",
        "clothing",
        "birds",
        "boys names",
        "girls names",
        "families",
        "kissing",
        "dancing",
        "eyes, nose, and mouth",
        "bones",
        "time",
        "belief",
        "beaches",
        "explosions",
        "science fiction",
        "young and old",
        "falling down",
        "magic",
        "the world",
        "stop",
        "first and last",
        "colors",
        "cats and dogs",
        "instruments",
        "heads and shoulders",
        "far away",
        "so close",
        "toys and games",
        "touch",
        "numbers",
        "goodbye",
        "baby",
        "crying",
        "dark",
        "light",
        "gold and jewels",
        "body parts",
        "boogie",
        "got the blues",
        "drinking",
        "lust",
        "1960s",
        "1950s",
        "1980s",
        "1990s",
        "1970s",
        "plants and flowers",
        "good and bad"
    ]

    that.commands = {
        "/theme": function(user){
            getTheme(user);
        }
    };
    return that;
};

ThemesPlugin.help = _help;
ThemesPlugin.description = _description;
module.exports = ThemesPlugin;

/*

This can be tested locally via this, just remember to delete the line specifiying "module.exports = ThemesPlugin"!

var TP = new ThemesPlugin({
    bot:{
         on: console.log,
         emit: console.log
     }

});

TP.commands["/theme"]();

*/
