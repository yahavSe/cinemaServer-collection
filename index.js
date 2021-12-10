var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

var moviesController = require('./controllers/movieController')
var membersController = require('./controllers/membersController')
var subscriptionsController = require('./controllers/subscriptionsController')

require('./config/alfaDB')

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())

app.use('/movies',moviesController)
app.use('/members',membersController)
app.use('/subscriptions',subscriptionsController)

app.listen(3002,()=>{
    console.log("the server is up");
})