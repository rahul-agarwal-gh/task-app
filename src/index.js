const express = require('express')
const bodyParser = require('body-parser')

require('./db/mongoose') /*require without storing in a const just makes sure taht the specified path gets run.Here the code inside 
the mongoose.js file will run that will make a connection to the DB*/

const User = require('./models/users')
const Task = require('./models/tasks')

const app = express()

app.use(express.json())

const port = 3000

app.get("/users", async function(req, res){

    try{
        const users = await User.find({})
        res.send(users);
    }catch( error ){
        res.status(500).send(error)
    }
})

app.get("/users/:id", async function(req, res){

    const _id = req.params.id

    try {

        const user = User.findById(_id)
        if(!user)
            return res.send("User not found");
        
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post("/users", async function(req, res){

    const user = new User( req.body )

    try {
        await user.save() //await for user to be saved and when it comes, just send it
        res.send(user)
    } catch (error) { //if above code threw any error(if user.save() called a reject)
        res.send("Some Error Occurred")
    }
   
})


app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


app.post("/tasks", async function(req, res){

    const task = new Task( req.body )

    try {
       await task.save()
       res.status(201).send(task)
    } catch (error) {
        res.send("Some Error Occurred")
    }
})

app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
     
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
 
})

app.patch("/tasks/:id", async function(req, res){

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description',  'completed']
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) )

    if(!isValidOperation){
        return res.status(400).send("Invalid updates")
    }

    try {

        const task = await task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})
        
        if(!task)
            return res.status(404).send("No task with given id found")
        
        //else
        res.send(task);
    } catch (error) {
        
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen( port, function(){
    console.log("Server Started on Port", port)
})