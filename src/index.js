const express = require('express')

require('./db/mongoose') /*require without storing in a const just makes sure that the specified path gets run. Here the code inside 
the mongoose.js file will run that will make a connection to the DB*/

const UserRoute = require('./routes/user')
const TaskRoute = require('./routes/task')

const app = express()

app.use(express.json())

app.use(UserRoute)
app.use(TaskRoute)

const port = 3000

app.listen( port, function(){
    console.log("Server Started on Port", port)
})