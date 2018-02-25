# jqbx-bot-plugins

Plugins for JQBX bots. Feel free to submit a pull request. 

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

that.bot.on("do:commandResponse", message, htmlMessage);
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
