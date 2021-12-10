var axios = require('axios')
var Movies = require('./movieSchema')

var moviesImport = async () => {
    let objMovies = await axios.get("https://api.tvmaze.com/shows")
    let compressMovies = objMovies.data.slice(0, 10)
    compressMovies.forEach(element => {
        addMovie(element)
    });
}

var getALL = async () => {
    return new Promise((resolve, reject) => {
        Movies.find({}, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}
var getById = (id) => {
    return new Promise((resolve, reject) => {
        Movies.findById(id, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

var addMovie = (movie) => {
    let prom = new Promise((resolve, reject) => {
        var newMovie = new Movies({
            name: movie.name,
            genres: movie.genres,
            image: movie.image.medium,
            premiered: movie.premiered
        })

        newMovie.save((err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("The Movie has been created")
            }
        })
    })

    return prom;
}

var updateMovie = (movie, id) => {
    return new Promise((resolve, reject) => {
        Movies.findByIdAndUpdate(id, {
            name: movie.name,
            genres: movie.genres,
            image: movie.image,
            premiered: movie.premiered
        }, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("The Movie has been updated")
            }
        })

    })
}

var deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        Movies.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("Deleted!!!")
            }
        })
    })
}
module.exports = { getALL, getById, addMovie, updateMovie, deleteMovie, moviesImport }