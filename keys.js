console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.bandsintown = {
    key: process.env.BIT_API_KEY
};

exports.omdb = {
    id: process.env.OMDB_key
};