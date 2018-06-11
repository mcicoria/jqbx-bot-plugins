# JQBX Bot Plugins

Plugins for the bots that live on JQBX (https://www.jqbx.fm/). JQBX lets you play music online through Spotify with anyone, anywhere. Be a virtual dj, and discover new music by listening together in real time.

Feel free to submit a pull request.

## JQBX Bot Commands

The latest commands can be seen by sending ```/help``` in chat.

| Command | Description |
| ------------------------------- | --- |
| ––––––––––––––––––––––––––––––– | ––– |
|   /#  |   Try /shrug or a number /3 - by @tjwds   |
|   /artist |   Get the current artist information, if available.   |
|   /artist [name]  |   Get a specific artist's information, if available.  |
|   /auto-artist    |   Toggle automatic artist info for every new track.   |
|   /audiohelp    |   Will try to help you with your audio issues.   |
|   /btc    |   Get the current price of Bitcoin    |
|   /dadjoke [search]   |   Get a dad joke! Will give a random joke if you do not use a search term. - by @Captian Internet |
|   /down   |   The bot will stop DJing |
|   /fact num [#]   |   Specify a number to get a fact about it, or input nothing for a random number fact. - by @Waddle Bird   |
|   /fact today |   Get a fact about today's date - by @Waddle Bird |
|   /fact year [yyyy]   |   Specify a year to get a fact about that year, or input nothing for a random year. - by @Waddle Bird |
|   /first  |   Get info about the first play of the current track on JQBX. Note: this does not include tracks played by bots, with less than one upvote, or in rooms without a bot.    |
|   /first [track uri]  |   Get info about the first play of the track. Ex: /first spotify:track:5A90uRgyQd1M9ZHbwyrgxx    |
|   /first-artist   |   Get info about the first play of the current artist.    |
|   /firsts |   Get info about the first play of the current track and the artist.  |
|   /github |   Add custom functionality and plugins, info here |
|   /haha   |   Upvote the last joke told in this room. |
|   /hay    |   Get a list of room ids for walkie-talkie messaging. |
|   /hay [room id] [message]    |   Send a message to another room. Ex: /hay boteshop Hi there  |
|   /help   |   Display this message    |
|   /inspire    |   Get an AI generated lame inspirational quote image. |
|   /joke   |   The bot will tell you a random user submitted joke. Limited to 1 joke per 3 minutes.    |
|   /joke list  |   List your submitted jokes and their votes.  |
|   /joke remove [#]    |   Remove a joke you submitted.    |
|   /joke submit 'joke' 'punchline' |   Your joke will be submitted to the joke pool. The best each month will be saved forever. Max 3 jokes per person each month. [Web/Desktop Only] Submit privately with /w @botname /joke submit ...   |
|   /joke top   |   Get the top jokesters for the current joke pool.    |
|   /lastfm |   View lastfm url and status. |
|   /me [action]    |   Do something as you. Ex: /me dances |
|   /queue  |   See what the bot's next tracks will be  |
|   /queue build    |   Add tracks to the bot's queue   |
|   /queue clear    |   Clear the tracks in the bot's queue |
|   /queue help |    Learn how the bot queue is generated.  |
|   /relink |   The bot will try to find a working link in your region to the current song. |
|   /ro |   Votes for the bot to rock out (dope) a song. Requires 3 people. - by @Captian Internet  |
|   /roulette # |   Feeling lucky, DJ? # is optional. - thank @tjwds    |
|   /skip   |   The bot's turn will be skipped  |
|   /stats  |   View room listening stats on last.fm.   |
|   /time   |   Displays the local time of anywhere. By @vmednis aka kweakzsz   |
|   /top    |   See the top tracks played in this room. |
|   /tv |   The bot give you a link to the GIFTV page   |
|   /up |   The bot will start DJing    |
|   /urban word |   Get the urban dictionary definition of a word - by @maniexx |
|   /want   |   Get a bot for your room |
|   /weather    |   Display the weather. Usage: /weather [city] - by @tjwds |
|   /wiki [topic]   |   Get a summary from Wikipedia on the topic   |
|   /you-here @name |   Gets last action information for a user in the room |
|   /yt (search)    |   Get a video URL from youtube matching the currently playing song. Using arguments will return a video based on search terms. - by @Captian Internet |


### JQBX Bot Configuration Commands

The latest commands and a full list of available plugins can be seen by sending ```/config``` in chat.


#### Plugin Commands
Enable and disable plugins with /config plugins. Do not include the [ and ] characters.

| Command | Description |
| ------------------------------- | --- |
| ––––––––––––––––––––––––––––––– | ––– |
| /config plugins help    | See this help message and list of commands  |
| /config plugins enable [name]   | Enabled a plugin named, name. Do not include the [ and ] characters.    |
| /config plugins disable [name]  | Disable a plugin named, name. Do not include the [ and ] characters.    |


#### Bot Settings Commands
Configure your bot with /config set. Do not include the [ and ] characters.

| Command | Description |
| ------------------------------- | --- |
| ––––––––––––––––––––––––––––––– | ––– |
| /config set images  | This will set the bot avatars to your current ones. There is no undo.   |
| /config set name [botname]  | This will set your bot's name. Do not include the [ and ] characters.   |
| /config set genres [indie, rock, etc]   | This will set the bot's default genres. Up to 5 genres. Do not include the [ and ] characters.  |
| /config set genres  | List current genres and available options.  |

# Documentation

Plugins contributed to this repo will be applied to all bots on JQBX. Currently, this is the only way to contribute to code to JQBX as there is no timeline for an open API or source.

## Bot Object
The current bot information

```
var bot = that.bot;

/**
    bot.user (the current bot user info)
    {
        uri: "spotify:user:12345678",
        username: "botname"
    }
**/
```

## Room Object
The current room information.

```
/**

    that.room.djs is an array of users and index 0 is the current dj
    [
        {
            username: 'displaynname',
            id: '12345678',
            uri: 'spotify:user:12345678',
            image: 'https://jqbx.s3.amazonaws.com/profile-1509536915144.gif',
            thumbsUpImage: 'https://jqbx.s3.amazonaws.com/upvote-smooth-1509536820155.gif',
            thumbsDownImage: 'https://jqbx.s3.amazonaws.com/profile-1509536915144.gif',
            djImage: 'https://jqbx.s3.amazonaws.com/dj-1509536762198.gif',
            device: 'desktop',
            status: 'active',
            country: 'US',
            playCount: 0, //only active when setting of max track is enabled
            votes: []
        },
        // ...
    ]

    that.room.users is an array
    [
        {
            username: 'displaynname',
            id: '12345678',
            uri: 'spotify:user:12345678',
            image: 'https://jqbx.s3.amazonaws.com/profile-1509536915144.gif',
            thumbsUpImage: 'https://jqbx.s3.amazonaws.com/upvote-smooth-1509536820155.gif',
            thumbsDownImage: 'https://jqbx.s3.amazonaws.com/profile-1509536915144.gif',
            djImage: 'https://jqbx.s3.amazonaws.com/dj-1509536762198.gif',
            device: 'desktop', //mobile, bot
            status: 'active',
            country: 'US'
        },
        // ...
     ]
**/
```

## Events

A quick list of events to listen on and emit.


### Listening

#### next-track
The track about to start playing.

```
that.bot.on("next-track", function(data){
    var track = data.nextTrack;
    /**
        data is an object like:
            { nextTrack: {
                _id: '5a91123123123123',
              album:
               { images: [ { height: 300,
                   url: 'https://i.scdn.co/image/ce7a343d33926965828dccb05534b0a7cdd0fa43',
                   width: 300 } ],
                 name: 'Lower Than Atlantis (The Black Edition)',
                 uri: 'spotify:album:6uf4FBKy6xgAW4f1GmQ04A' },
              artists:
               [ { external_urls:
                     { spotify: 'https://open.spotify.com/artist/5pjCYG6hPLBO3y4swxu3dh' },
                    href: 'https://api.spotify.com/v1/artists/5pjCYG6hPLBO3y4swxu3dh',
                    id: '5pjCYG6hPLBO3y4swxu3dh',
                    name: 'Tonight Alive',
                    type: 'artist',
                    uri: 'spotify:artist:5pjCYG6hPLBO3y4swxu3dh' } ],
              duration_ms: 234786,
              href: 'https://api.spotify.com/v1/tracks/04qlaPMIPACn0jsqONhFjF',
              name: 'Ain\'t No Friend',
              popularity: 37,
              uri: 'spotify:track:04qlaPMIPACn0jsqONhFjF',
              userUri: 'spotify:user:12345678',
              username: 'displaynname',
              startedAt: '2018-02-25T00:01:17.074Z',
              thumbsDown: 0,
              thumbsUp: 1,
              thumbsUpUris: [ 'spotify:user:12345658' ],
              room: '5a91123123123123' }
            }
    **/
});
```

#### new-roomies
People who just joined the room.

```
that.bot.on("new-roomies", function(users){

    /**
        users is an array like:
        [
            {
                username: 'displayname',
                id: '123456',
                uri: 'spotify:user:12345678',
                image: 'https://jqbx.s3.amazonaws.com/profile-1509536915144.gif',
                thumbsUpImage: 'https://jqbx.s3.amazonaws.com/upvote-smooth-1509536820155.gif',
                thumbsDownImage: 'https://jqbx.s3.amazonaws.com/profile-1509536915144.gif',
                djImage: 'https://jqbx.s3.amazonaws.com/dj-1509536762198.gif',
                device: 'desktop',
                status: 'active',
                country: 'US'
            },
            //...
         ]
    **/
});
```

#### regions
Regions updated with all user's regions in the room.

```
that.bot.on("regions", function(regions){
    /**
        regions is an array of region codes in the current room
        ["US", "AU", "GB"]
    **/
});
```

### Emitting
These are sent via ```that.bot.emit("event", data)```.


#### do:commandResponse

Send a message to chat from the bot.

```
var opts = {
    htmlMessage: "htmlversion of message",
    type: "expandable" //alert, null
}

that.bot.on("do:commandResponse", message, opts);
```

Sends a prviate message to chat.
```
that.bot.on("do:commandResponsePM", message, recipients, opts);
that.bot.emit("do:commandResponsePM", "Message", user, {
    htmlMessage: "html version"
});
```

Sends a notice to chat like "user has become a Dj."

```
that.bot.on("do:commandResponseNotice", message, opts);
```

Sends an expandable message to chat.
```
that.bot.on("do:commandResponseExpandable", message, opts);

//To specific users
that.bot.on("do:commandResponseExpandable", message, {
    recipients: [user]
});
```
