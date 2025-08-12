import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// types
import { typeDefs } from './schema';

// server setup
const server = new ApolloServer({
    // typeDefs shows type definitions for the data types and relation they have with other data types
    typeDefs,
    // resolvers how we respond to queries and different data on the graph
    
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`); 