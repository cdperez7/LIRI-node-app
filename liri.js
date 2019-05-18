require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Capture user inputs
var userApi = process.argv[2];
var userInput = process.argv[3];

UserInputs(userApi, userInput);

// Functions for each API
function UserInputs(userApi, userInput) {
    switch (userApi) {
        case 'spotify-this-song':
            displaySpotify(userInput);
            break;

        case 'concert-this':
            displayConcerts(userInput);
            break;

        case 'movie-this':
            displayMovies(userInput);
            break;

        case 'do-what-it-says':
            showSomeInfo();
            break;    
    }
}


//reads the text from the random.txt file to display in console (backstreet boys)
function showSomeInfo() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArray = data.split(',');
        UserInputs(dataArray[0], dataArray[1]);
    });
}


// Function to get Spotify song information
function displaySpotify(userInput) {
    if (userInput === undefined) {
        userInput = "The Sign";
    }
    spotify.search(
        {
            type: "track",
            query: userInput,
            limit: 2,
        },
        function (err, data) {
            if (err) {
                console.log("Something went wrong: " + err);
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

// Function to get concert information
function displayConcerts(userInput) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("**********Concert Information**********");
                fs.appendFileSync("log.txt", "**********Concert Information**********\n");
                console.log(i);
                fs.appendFileSync("log.txt", + i + "\n");
                // Not directed to in instructions but added band name above event Info as I feel it is better to view this way
                console.log("Band Name: " + userInput);
                fs.appendFileSync("log.txt", "Band Name: " + userInput + "\n");
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
            console.log("Something went wrong: ");
        }

    });
}

// Function to get movie information
function displayMovies(userInput) {
    if (userInput === undefined) {
        userInput = "Mr. Nobody";
        console.log("----------------------------------------");
        fs.appendFileSync("log.txt", "----------------------------------------\n");
        console.log("If you haven't watched 'Mr. Nobody' then you should: http://www.imdb.com/title/tt0485947/")
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }

    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + userInput + "&y=&plot=short";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movies = JSON.parse(body);
            console.log("**********Movie Information**********");
            fs.appendFileSync("log.txt", "**********Movie Information**********\n");
            console.log("Title: " + movies.Title + "\n");
            fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
            console.log("Release Year: " + movies.Year);
            fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
            console.log("IMDB Rating: " + movies.imdbRating);
            fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
            console.log("Rotten Tomatoes Rating: " + rtRating(movies));
            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + rtRating(movies) + "\n");
            console.log("Country of Production: " + movies.Country);
            fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
            console.log("Language: " + movies.Language);
            fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
            console.log("Plot: " + movies.Plot);
            fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
            console.log("Actors: " + movies.Actors);
            fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
            console.log("----------------------------------------");
            fs.appendFileSync("log.txt", "----------------------------------------\n");

        } else {
            console.log("Something went wrong: ");
        }
    });
}

// Functions to pull Rotten Tomatoes rating
function rtObject(data) {
    return data.Ratings.find(function (item) {
        return item.Source === "Rotten Tomatoes";
    });
}

function rtRating(data) {
    return rtObject(data).Value;
}

