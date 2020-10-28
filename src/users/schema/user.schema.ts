import { Schema } from "mongoose";
import * as bcrypt from 'bcryptjs'

const user = new Schema({
    username : {type : String , required : true , index : true , unique : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true , minlength : 6},
    isActive : {type : Boolean , required : true , default : false},
    created : {type : Date , defaule : Date.now},
    updated : {type : Date , defaule : Date.now},
    deleted : {type : Date , defaule : null},
})


user.pre('hashPassword ' , (next) => {
    this.password = bcrypt.hash(this.password , 10)
    next()
})

user.pre('save' , (next) => {
    const date = new Date

    this.updated = date

    next()

})

user.methods.serialize = (user) => {
    const {id , username , email} = user
    return {
        _id : id,
        username ,
        email
    }
} 

export const UserSchema = user