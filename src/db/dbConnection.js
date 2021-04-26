const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {
            useFindAndModify:false,
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true
        });
        console.log('Successfully Connected')
    } catch (err) {
        mongoose.connection.on('error',err=>console.log('Unable to connect database!!!', err));
    }
}

module.exports = connectDB;