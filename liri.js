require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
// var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var userOption = process.argv[2];
var inputParameter = process.argv[3];

UserInputs(userOption, inputParameter);

function UserInputs (userOption, inputParameter){
    switch (userOption){
        case 'spotify-this-song':
        showSongInfo(inputParameter);
        break;

        
    }
}

function showSongInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "The Sign";
    }
    spotify.search(
        {
            type: "track",
            query: inputParameter,
            limit: 2,
        },
        function (err, data) {
            if (err) {
                console.log("Error occured" + err);
                return;
            }
            
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("------------Song Information---------");
                fs.appendFileSync("log.txt", "Song Information\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist: " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist: " + songs[i].artists[0].name + "\n");
                console.log("-------------------------------------");
                fs.appendFileSync("log.txt", "-------------------------------------\n")
            }
        }
    );
}

