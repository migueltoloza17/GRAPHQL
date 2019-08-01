const Post = require('../models/Post');


const getAllPosts = async (root, args) => {
    console.log(args.title);
    let post = await Post.find({ title :args.title});
    //console.log(post)
    return post;
    /*let Post;
    Post.findOne({title: args.title}, (err, respuesta)=>{
          console.log(resp.id);
    })*/
}

const getPost = async (root, args) => {
    const post = await Post.findById(args.id).populate('user');
    if(!post) return new Error('No se encontro el post');
    return post.toObject();
}

const getUsers = async (root, args) => {
const users = await users.find().exec();
return users;
}

module.exports = {
    getAllPosts,
    getPost,
    getUsers
}