var mongoose = require('mongoose')

var Schema = mongoose.Schema

var moviesSchema = new Schema({
    name: String,
    genres: Array,
    image: String,
    premiered: String
})

module.exports = mongoose.model('movies', moviesSchema)