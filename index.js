import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from "./_db.js";

// types
import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },

    // for query variables
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },

    // for nested data
    Game: {
      reviews(parent){
        return db.reviews.filter((r) => r.game_id === parent.id)
      }
    },

    Author: {
      reviews(parent) {
        return db.reviews.filter((r) => r.author_id === parent.id);
      }
    },

    Review: {
      author(parent) {
        return db.authors.find((a) => a.id === parent.author_id);
      },

      game(parent){
        return db.games.find((g) => g.id === parent.game_id)
      }
    },

    Mutation: {
      deleteGame(_, args) {
        db.games = db.games.filter((game)=> game.id !== args.id);

        return db.games;
      },

      addGame(_, args){
        let newGame = {
          ...args.game,
          id: Math.floor(Math.random() * 10000).toString()
        }

        db.games.push(newGame)

        return newGame;
      }, 

      updateGame(_, args){
        db.games = db.games.map((g) => {
          if(g.id === args.id){
            return {...g, ...args.edits}
          }

          return g;
        })

        return db.games.find((g) => g.id === args.id);
      }
    }
};

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
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
