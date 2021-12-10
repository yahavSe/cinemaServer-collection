var express = require('express')
var router = express.Router()
var movieBl = require('../models/moviesBL')

router.route('/').get(async (req, resp) => {
    var movies = await movieBl.getALL()
    if (movies.length === 0) {
        var movieList = await movieBl.moviesImport()
        return resp.json(movieList)
    }
    else {
        return resp.json(movies)
    }
})
router.route('/:id').get(async (req, resp) => {
    var id = req.params.id
    var movie = await movieBl.getById(id)
    return resp.json(movie)
})

router.route('/').post(async (req, resp) => {
    var newMovie = req.body;
    var result = await movieBl.addMovie(newMovie)
    return resp.json(result)
})

router.route('/:id').put(async (req, resp) => {
    var id = req.params.id;
    var updateMovie = req.body;
    var result = await movieBl.updateMovie(updateMovie, id);
    return resp.json(result)
})

router.route('/:id').delete(async (req, resp) => {
    var id = req.params.id;
    var result = await movieBl.deleteMovie(id);
    return resp.json(result)
})

module.exports = router