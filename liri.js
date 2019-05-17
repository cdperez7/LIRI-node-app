require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var userOption = process.argv[2];
var inputParameter = process.argv[3];

UserInputs(userOption, inputParameter);
