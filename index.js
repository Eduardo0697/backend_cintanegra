const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
    type Query{
        hello(name : String!): String!
    }
`;

const resolvers = {
    Query:{
        hello: (root, params, context, info) => `Hola ${params.name} 🥶`
    }
};

/**
 * root: informacion del server de gpql
 * params: datos que envia el cliente y se definen en el type def
 * context: es un objeto por el cual se comunican los resorvers
 * info: es el query que se ejecuto por el cliente
 * 
 */
const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => console.log('Server iniciado en puerto 4000'));