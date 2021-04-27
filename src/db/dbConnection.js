const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        mongoose.connect(process.env.connString, {
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