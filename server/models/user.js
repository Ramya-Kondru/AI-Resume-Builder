// to create schema

// using the schema create a model
import bcrypt from 'bcrypt'

import mongoose  from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    email:{type:String,required:true},

},{timestamps:true})  

//whenver new database is created it will automatically add timestamp

UserSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

const User=mongoose.model("User",UserSchema)
export default User;