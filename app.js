const mongodb = require("mongodb");


const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager-db'

MongoClient.connect( connectionURL, {useNewUrlParser : true, useUnifiedTopology: true }, function(error, client){

    if(error){
        console.log("Unable to connect to DB")
        return
    }
    //else
    const db = client.db(dbName)

    // db.collection('users').insertOne({
    //     name : "Rahul",
    //     age : 23
    // }, function(error, data){

    //     if(error){
    //         console.log("Unable to insert One");
    //         return
    //     }else{
    //         console.log(data.ops) //ops is the array of documents that got inserted using insertOne or insertMany or replaceOne
    //     }
    // })

    // db.collection('users').insertMany([{

    //     name: "Lion",
    //     age : 31
    // }, {
    //     name : 'Teeth',
    //     age : 32
    // }], function (error, data) {
        
    //     if(error){
    //         console.log("Unable to insert document")
    //         return
    //     }

    //     console.log(data.ops)

    // })


/////////******************UPDATE */
    // const updatePromise = db.collection('users').updateOne({     //updateOne returns a promise object

    //     _id : new mongodb.ObjectId("5f5b05cd3e82a0152421f5a2")
    // }, {
    //     $set : { 
    //         name : "Zebra"
    //     }
    // });

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch( (error) => {
    //     console.log(error)
    // }) 

    // db.collection('users').updateMany({

    //     age : 31
    // },{
    //     $set : {
    //         name : 'Tortoise'
    //     }
    // }).then( (result) => {

    //     console.log(result)
    // }).catch( (error) => {
    //     console.log(error)
    // })


  ///////////////////////////****************delete*************** */  

    db.collection('users').deleteOne({
        age : 32 
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})


