const mongoose = require('mongoose')
const validator = require('validator') //using validator npm packages to hanndle validations

const Task = mongoose.model('Task', {
  
    description : {
        type : String,
        required : true,
        trim : true,
    },
    completed : {
        type : Boolean,
        default : false 
    }
})

module.exports = Task



///dummy task/////

// const task1 =  new Task( {

//     description : "Do pushups",
//     completed : false
// })

// task1.save().then( (result) => {

//     console.log(result)
// }).catch( (error) => {
 
//     console.log(error)
// })

