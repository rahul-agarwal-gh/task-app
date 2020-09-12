const mongoose = require('mongoose')

//connecting to sever(here localhost) and specifying the DB name to which we want to connect
mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true, 
})




