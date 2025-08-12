import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// db
import db from './_db.js';

// types
import { typeDefs } from './schema.js';

const resolvers = {
    Query : {
      games() {
        return db.games
      },
      reviews() {
        return db.reviews
      },
      authors() {
        return db.authors
      }
    }
}

// user queries
/* 
  games {
    title
  }
*/

// server setup
const server = new ApolloServer({
    // typeDefs shows type definitions for the data types and relation they have with other data types
    typeDefs,
    // resolvers how we respond to queries and different data on the graph
    resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`); 