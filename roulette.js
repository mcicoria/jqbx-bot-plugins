var roulettePlugin = function(data){
    
    var that = this;

    that.bot = data.bot;

//    help text probably not necessary here unless someone wants to make this actually toggleable.     
//    that.help = {
//            "/roulette": "Toggles a beautiful game of Russian Roulette."
//        };

    function roulette(){
        if (Math.floor(Math.random()*6) == 1){
            that.bot.emit("do:lame", that.bot.user);
            that.bot.emit("do:commandResponse","BLAM!");
        }
    }
    
    that.bot.on("next-track", roulette); 
    
    return that;
};

module.exports = roulettePlugin;
