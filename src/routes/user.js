const express = require('express')
const User = require('../models/users')

const router = new express.Router()


router.get("/users", async function(req, res){

    try{
        const users = await User.find({})
        res.send(users);
    }catch( error ){
        res.status(500).send(error)
    }
})

router.get("/users/:id", async function(req, res){

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

router.post("/users", async function(req, res){

    const user = new User( req.body )

    console.log(user)
    try {
        await user.save() //await for user to be saved and when it comes, just send it
        res.send(user)
    } catch (error) { //if above code threw any error(if user.save() called a reject)
        res.status(400).send("Some Error Occurred")
    }
   
})


router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
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

module.exports = router