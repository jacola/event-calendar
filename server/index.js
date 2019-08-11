const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

require('./config');
const { Event } = require('./models');

// The GraphQL schema
const typeDefs = gql`
  type Event {
    id: ID!,
    title: String,
    start: String,
    end: String,
    cssClass: String,
    description: String
  }

  type Query {
    allEvents: [Event]
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(title: String,  start: String,  end: String,  cssClass: String,  description: String) : Event
    updateEvent(id: ID!, title: String,  start: String,  end: String,  cssClass: String,  description: String) : Event
    deleteEvent(id: ID!) : Event
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    allEvents: async () => await Event.find({}).exec(),
    event: async (_, args) => Event.findById(args.id).exec()
  },
  Mutation: {
    createEvent: async (_, args) => {
      try {
        let response = await Event.create(args);
        return response;
      } catch(e) {
        e.message;
      }
    },
    updateEvent: async (_, args) => {
      try {
        let response = await Event.findOneAndUpdate({ _id: args.id }, args, {new: true });
        return response;
      } catch(e) {
        e.message;
      }
    },
    deleteEvent: async (_, args) => {
      try {
        let response = await Event.findOneAndRemove({ _id: args.id });
        return response;
      } catch(e) {
        e.message;
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
