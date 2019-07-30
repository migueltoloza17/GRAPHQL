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

module.exports = {
    getAllPosts
}