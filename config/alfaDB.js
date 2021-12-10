var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/alfaDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})