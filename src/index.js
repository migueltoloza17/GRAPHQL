require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const typeDefs = importSchema ('./src/schema.graphql');
const mongoose = require('mongoose');

mongoose.connect(process.env.mongourl, {useNewUrlParser: true}, (err)=>{
    if(!err){
        console.log('MONGODB conectado correctamente');
    }
});

const Post = require('./models/Post');

const { getAllPosts } = require('./resolvers/Querys');
const { createPost, createUser } = require('./resolvers/Mutations');


const resolvers = {
    Query: {
      //saludo: (root, args) => `Hola ${args.name}`,   
      getAllPosts

    },
    Mutation:{
        createPost,
        createUser
    }
  }
  
  const server = new GraphQLServer({ typeDefs, resolvers })
  server.start(() => console.log('Server is running on localhost:4000'))