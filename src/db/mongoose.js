const mongoose = require('mongoose')

const validator = require('validator') //using validator npm packages to hanndle validations

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true 
})


const User = mongoose.model('User', {
    name : {
        type : String, //validation using mongoose.model 
        required : true, //it should be required
        trim : true //remove spaces 
    },
    age : {
        type : Number, 
        default : 0,
        validate(value){ //validate method is used to add custom validation. value means we will validate the value of the age

            if(value < 0)
                throw new Error('Age must be a positive number')
        } //validation using mongoose.model 
    },
    email : {
        type : String,
        trim : true,
        lowercase : true, //convert to lower case before storing
        validate(value){

            if(!validator.isEmail(value))
                throw new Error("Email is invalid")
        },

     password : {
         type : String,
         required : true,
         trim : true,
         minlength : 7,
         validate(value){
            if(value.toLoweCase().includes('password'))
                throw new Error("Password cannot contain 'password' ");
         }
     }   

    }
})

 const rahul = new User({

    name : "Rahul",
    age : 23

})

// //save() also returns a promise

rahul.save().then( (result) => {
    console.log(result);
} ).catch( (error) => {
    console.log(error);
} )

const user3 = new User( {

    name : "Naruto",
    age : 17,
    email : 'leaf@konoha.com',
    password : ' ramenallday '

} )

user3.save().then( (result) => {
        console.log(result);
    } ).catch( (error) => {
        console.log(error);
    } ) 


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

const task1 =  new Task( {

    description : "Do pushups",
    completed : false
})

task1.save().then( (result) => {

    console.log(result)
}).catch( (error) => {
 
    console.log(error)
})


