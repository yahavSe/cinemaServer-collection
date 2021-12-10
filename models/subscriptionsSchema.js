var mongoose = require('mongoose')

var Schema = mongoose.Schema

var subscriptionsSchema = new Schema({
    id: String,
    memberId : String,
    movies: [{
        _id: false,
        movieId:String,
        date:String 
    }]
})

module.exports = mongoose.model('subscriptions', subscriptionsSchema)