const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minLength:[6, 'Minimum 6 characters required']
    },
    age:{
        type:Number,
        trim:true,
        required:true,
        defualt:20,
        validate(value){
            if(value<20){
                throw new Error("Value should be positive");
            }
        }
    },
    token:{
        type:String
    }
});

userSchema.methods.preSave =async function  (){
    const user = this; //assing user's data
    user.password = await bcrypt.hash(user.password, 8);
    return user.password;
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user || user == null){
        throw 'User not exist';
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw 'Password is not matched';
    }
    return user;
}
userSchema.methods.generateToken = async function () {
    const user = this;
    if(user.token){
        return user.token;
    }else{
        const token = jwt.sign({_id:user._id.toString()}, "userToken");
        user.token = token;
        await user.save();
        return token;
    }
}
const User = mongoose.model('User', userSchema)
module.exports = User;