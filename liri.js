require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var userOption = process.argv[2];
var inputParameter = process.argv[3];

UserInputs(userOption, inputParameter);

function UserInputs(userOption, inputParameter) {
    switch (userOption) {
        case 'spotify-this-song':
            showSongInfo(inputParameter);
            break;

        case 'concert-this':
            showConcertInfo(inputParameter);
            break;

        case 'movie-this':
            showMovieInfo(inputParameter);
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
                console.log("**********Song Information**********");
                fs.appendFileSync("log.txt", "**********Song Information**********\n");
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


function showConcertInfo(inputParameter) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("**********Concert Information**********");
                fs.appendFileSync("log.txt", "**********Concert Information**********\n");
                console.log(i);
                fs.appendFileSync("log.txt", + i + "\n");
                // Not directed to in instructions but added band name above event Info as I feel it is better to view this way
                console.log("Band Name: " + inputParameter);
                fs.appendFileSync("log.txt", "Band Name: " + inputParameter + "\n");
                console.log("Name of the venue: " + concerts[i].venue.name);
                fs.appendFileSync("log.txt", "Name of the venue: " + concerts[i].venue.name + "\n");
                console.log("Venue Location: " + concerts[i].venue.city);
                fs.appendFileSync("log.txt", "Venue location: " + concerts[i].venue.city + "\n");
                console.log("Date of the Event: " + concerts[i].datetime);
                fs.appendFileSync("log.txt", "Date of the Event: " + concerts[i].datetime + "\n");
                console.log("----------------------------------------")
                fs.appendFileSync("log.txt", "----------------------------------------" + "\n");
            }
        } else {
            console.log("Error occured");
        }

    });
}