var SingleStringPlugin = function(data, config){
    
    var that = this;

    that.bot = data.bot;
    that.config = {}; 
    
    Object.assign(that.config, data.config, config || {});

    phrases = {
        "/rawr": "RAWR",
        "/clap": ":clap: :clap: :clap:",
        "/care": "https://media2.giphy.com/media/yoJC2suV6hS7hqi796/giphy.gif",
        "/sheesh": "sheeeeeeeeeeesh",
        "/shrug": "¯\\_(ツ)_/¯",
        "/shots": "SHOTS",
        "/wait": "wait",
        "/x": "JASON!",
        "/1": "Never outshine the master",
        "/2": "Never put too much trust in friends, learn how to use enemies",
        "/3": "Conceal your intentions",
        "/4": "Always say less than necessary",
        "/5": "So much depends on reputation — guard it with your life.",
        "/6": "Court attention at all cost",
        "/7": "Get others to do the work for you, but always take the credit.",
        "/8": "Make other people come to you — use bait if necessary.",
        "/9": "Win through your actions, never through argument",
        "/10": "Infection — avoid the unhappy and unlucky",
        "/11": "Learn to keep people dependent on you",
        "/12": "Use selective honesty and generosity to disarm your victim",
        "/13": "When asking for help, appeal to people's self-interest, never to their mercy or gratitude",
        "/14": "Pose as a friend, work as a spy",
        "/15": "Crush your enemy totally.",
        "/16": "Use absence to increase respect and honor",
        "/17": "Keep others in suspended terror — cultivate an air of unpredictability.",
        "/18": "Do not build fortresses to protect yourself — isolation is dangerous.",
        "/19": "Know who you are dealing with — do not offend the wrong person",
        "/20": "Do not commit to anyone",
        "/21": "Play a sucker to catch a sucker — seem dumber than your mark",
        "/22": "Use the surrender tactic — transform weakness into power.",
        "/23": "Concentrate your forces",
        "/24": "Play the perfect courtier",
        "/25": "Re-create your life.",
        "/26": "Keep your hands clean",
        "/27": "Play on people's need to believe to create a cultlike following",
        "/28": "Enter action with boldness",
        "/29": "Plan all the way to the end",
        "/30": "Make your accomplishments seem effortless",
        "/31": "Control the options — get others to play with the cards you deal",
        "/32": "Play to people's fantasies",
        "/33": "Discover each employee's thumbscrew.",
        "/34": "Be royal in your own fashion — act like a king or queen to be treated like one.",
        "/35": "Master the art of timing",
        "/36": "Disdain things you cannot have — ignoring them is the best revenge.",
        "/37": "Create compelling spectacles",
        "/38": "Think as you like but behave like others",
        "/39": "Stir up waters to catch fish.",
        "/40": "Despise the free lunch",
        "/41": "Avoid stepping into a great man's shoes",
        "/42": "Strike the shepherd and the sheep will scatter",
        "/43": "Work on the hearts and minds of others.",
        "/44": "Disarm and infuriate with the 'mirror effect'",
        "/45": "Preach the need for change, but never reform too much at once.",
        "/46": "Never appear too perfect. — Only gods and the dead can seem perfect with impunity.",
        "/47": "Do not go past the mark you aimed for — in victory, learn when to stop.",
        "/48": "Assume formlessness."
    };

    that.commands = {}

    function generateReplaceFunction(replacement) {
        return function(input, user) {
            that.bot.emit("do:commandResponse", replacement);
        }
    }
 
    for (var key in phrases) {
        that.commands[key] = generateReplaceFunction(phrases[key]);
    }

    return that;
};

module.exports = SingleStringPlugin;
