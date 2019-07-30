const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (root, args) => {
    let newPost = new Post ({
        title : args.data.title,
        body: args.data.body,
        createdAt : args.data.createdAt,
        user: args.data.user
    })
    const miPost = await newPost.save();
    const post = await Post.findOne({_id:miPost._id}).populate('user')
    return post;
}

const createUser = async (root, args) => {
    let newUser = new User({
      ...args.data
    })
    const user = await newUser.save();
    return user;
}

module.exports = {
    createPost,
    createUser
}