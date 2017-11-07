var request = require("request");

var BTCPlugin = function(data){
    
    var that = this;

    that.bot = data.bot;

    that.help = {
        "/btc": "Get the current price of Bitcoin"
    };

    function getCurrentBTCPrice (){
        request.get({
            url: "https://api.coindesk.com/v1/bpi/currentprice.json",
            json: true
        }, function(err, resp){
            if(err) return that.bot.emit("error", err);
            var str = "No data.";

            if(resp.body && resp.body.bpi && resp.body.bpi.USD) {
                str = "Bitcoin is at $" + resp.body.bpi.USD.rate;
                str += ". Cha ching. :money_with_wings::moneybag:"
                that.bot.emit("btc: price", resp.body.bpi);
            }

            that.bot.emit("do:commandResponse", str);
        });
    }

    function getYesterdayBTCPrice (){
        request.get({
                url: "https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05&for=yesterday",
                json: true
            }, function(err, resp){
                if(err) return that.bot.emit("error", err);
                var str = "No data.";

                if(resp.body && resp.body.bpi && resp.body.bpi) {
                    for(var i in resp.body.bpi) {
                        str = "Yesterday Bitcoin was at $" + resp.body.bpi[i];
                        that.bot.emit("btc: price-yesterday", {
                            rate: resp.body.bpi[i],
                            rate_float: parseFloat(resp.body.bpi[i])
                        });
                        break;
                    }
                    
                }
                that.bot.emit("do:commandResponse", str);
            });
    }

    function getYesteryearBTCPrice (){

        var 
            today = new Date(),
            date = "",
            dd = today.getDate(),
            mm = today.getMonth()+1,
            yyyy = today.getFullYear()-1;

        if(dd<10) dd = "0"+dd;
        if(mm<10) mm = "0"+mm;

        date = [yyyy,mm,dd].join("-");

        var url = "https://api.coindesk.com/v1/bpi/historical/close.json?start="+date+"&end="+date;

        request.get({
                url: url,
                json: true
            }, function(err, resp){
                if(err) return that.bot.emit("error", err);
                var str = "No data.";

                if(resp.body && resp.body.bpi && resp.body.bpi) {
                    for(var i in resp.body.bpi) {
                        str = "This time last year Bitcoin was at $" + resp.body.bpi[i];
                        that.bot.emit("btc: price-last-year", {
                            rate: resp.body.bpi[i],
                            rate_float: parseFloat(resp.body.bpi[i])
                        });
                        break;
                    }
                    
                }
                that.bot.emit("do:commandResponse", str);
            });
    }

    that.commands = {
       
        "/btc": function(input, user) {
            if(input && input.toLowerCase() == "extra") {
                //btcExtra();
            } else if(input){
                getCurrentBTCPrice();
                that.bot.once("btc: price", function(data){
                    if(data && data.USD.rate_float) {
                        var str = parseFloat(input) + "BTC is $" + (parseFloat(input)*parseFloat(data.USD.rate_float)) + " USD";
                        that.bot.emit("do:commandResponse", str)
                    }
                })
                return;
            }
            getCurrentBTCPrice();
            getYesterdayBTCPrice();
            getYesteryearBTCPrice();
        }
    };

  
    return that;
};

module.exports = BTCPlugin;
