const mongoose = require('mongoose')
 function connect (){
    const uri = 'mongodb+srv://Shoaib:Games587@cluster0.yycq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    try{
         mongoose.connect(uri,{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true })
        const connection = mongoose.connection;
        connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
        })
    }catch(e){
        console.log(e)
    }
}

module.exports = connect