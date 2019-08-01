require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const typeDefs = importSchema ('./src/schema.graphql');
const { AuthDirective } = require('./resolvers/directive');
const verifyToken = require('./utils/verifyToken');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');

mongoose.connect(process.env.mongourl, {useNewUrlParser: true}, (err)=>{
    if(!err){
        console.log('MONGODB conectado correctamente');
    }
});

const Post = require('./models/Post');

const { getAllPosts, getPost, getUsers } = require('./resolvers/Querys');
const { createPost, createUser, login, addPhoto } = require('./resolvers/Mutations');


const resolvers = {
    Query: {
      //saludo: (root, args) => `Hola ${args.name}`,   
      getAllPosts,
      getPost,
      getUsers
    },
    Mutation:{
        createPost,
        createUser, 
        login, addPhoto
    }
  }
  
const schema = makeExecutableSchema ({
    typeDefs,
    resolvers,
    schemaDirectives: {
        auth: AuthDirective
    }
})

  //const server = new GraphQLServer({ typeDefs, resolvers })
  const server = new GraphQLServer({ schema, context:async({request})=> verifyToken(request) })
  server.start(() => console.log('Server is running on localhost:4000'))