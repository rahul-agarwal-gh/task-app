const express = require('express')
const bodyParser = require('body-parser')

require('./db/mongoose') /*require without storing in a const just makes sure taht the specified path gets run.Here the code inside 
the mongoose.js file will run that will make a connection to the DB*/

const User = require('./models/users')
const Task = require('./models/tasks')

const app = express()

app.use(express.json())

const port = 3000

app.get("/users", function(req, res){

    User.find({}).then( (users) => {
        
        res.send(users);

    }).catch( (error) => {

        res.status(500).send(error)
    })
})

app.get("/users/:id", function(req, res){

    const _id = req.params.id
    User.findById(_id).then( (user) => { 
        if(!user)
        return res.send("User not found");
        res.send(user)
    }).catch( (error) => {

        res.status(500).send(error)
    })
})

app.post("/users", function(req, res){

    const user = new User( req.body )

     user.save().then(() => {
         res.status(201).send(user)
     }).catch(() => {
         res.send("Some Error Occurred")
     });

})


app.post("/tasks", function(req, res){

    const task = new Task( req.body )

     task.save().then(() => {
         res.status(201).send(task)
     }).catch(() => {
         res.send("Some Error Occurred")
     });

})


app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen( port, function(){
    console.log("Server Started on Port", port)
})