const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
    type Query{
        hello(name : String!): String!
        getUsers:[User]!
        getUser(id: Int! ) : User!
    }

    type Mutation{
        createUser( name:String!, age:Int): User!
    }

    type User{
        id: Int!
        name: String!
        age: Int
    }
`;

const users = [];

const resolvers = {
    Query:{
        hello: (root, params, context, info) => `Hola ${params.name} 🥶`,
        getUsers: (root, params, context, info) =>  users,
        getUser: (root, { id }, context, info) => users.find(u => u.id === id)
    },
    Mutation:{
        createUser: (root, { name, age}, context, info) => {
            const user = {
                id: users.length + 42454,
                name,
                age,
            };

            users.push(user);
            return user;
        }
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