//import { Mongoose } from "mongoose";

const moongose = require('mongoose');
const Schema = moongose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        requiere : true
    },
    body:{
        type:String,
        requiere:true
    },
    createdAt: {
        type: String,
        requiere: true
    },
    user: {
        type : Schema.Types.ObjectId,
        ref: 'users'
    }
})
const Post = moongose.model('post', postSchema);

module.exports = Post;