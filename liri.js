require("dotenv").config();

var keys = require("./keys.js")

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var request = require("request");

var moment = require("moment");

var fs = require("fs");

var command = process.argv[2];
var input = process.argv[3];
for (i = 4; i < process.argv.length; i++) {
    input += (" " + process.argv[i])
};

var bandsInTownKey = keys.bandsInTown.id;


function concertThis() {

    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsInTownKey;

    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log(error)
        }

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            for (var i = 0; i < data.length; i++) {
                console.log("Venue: " + data[i].venue.name);
                console.log("Location: " + data[i].venue.city, data[i].venue.country);
                console.log("Date: " + moment(data[i].datetime).format("MM/DD/YYYY"));
            }
        }
    });
}

function spotifyThisSong() {
    if (!input) {
        spotify.search({
            type: 'track',
            query: 'Eye of the Tiger'
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist(s): " + data.tracks.items[5].artists[0].name);
            console.log("Song Name: " + data.tracks.items[5].name);
            console.log("Preview : " + data.tracks.items[5].album.name);
            console.log("Album: " + data.tracks.items[5].preview_url);
        });
    } else {
        spotify.search({
            type: 'track',
            query: input
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Artist(s): " + data.tracks.items[5].artists[0].name);
            console.log("Song Name: " + data.tracks.items[5].name);
            console.log("Preview : " + data.tracks.items[5].album.name);
            console.log("Album: " + data.tracks.items[5].preview_url);

        });
    }

}

function movieThis() {
    if (!input) {
        var queryUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {
            if (error) {
                console.log(error)
            }

            if (!error && response.statusCode === 200) {

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year Released: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function (error, response, body) {
            if (error) {
                console.log(error)
            }
            if (!error && response.statusCode === 200) {

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year Released: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        });
    }
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(error)
        }
        var dataNew = data.split(",");
        var dataArr = [];

        for (i = 0; i < dataNew.length; i++) {
            dataArr.push(dataNew[i].trim());
        };
        command = dataArr[0]
        input = dataArr[1]
        switch (command) {
            case "concert-this":
                concertThis();
                break;
            case "spotify-this-song":
                spotifyThisSong();
                break;
            case "movie-this":
                movieThis();
                break;
            case "do-what-it-says":
                doWhatItSays();
                break;
            default:
                console.log("Try again!");
                break;
        };

    })
}

switch (command) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Something went wrong, try again!");
        break;
};