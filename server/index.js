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
    data: EventData
  }

  input EventInput {
    title: String,
    start: String,
    end: String,
    cssClass: String,
    data: EventDataInput
  }

  type EventData {
    description: String
  }

  input EventDataInput {
    description: String
  }

  type Query {
    allEvents: [Event]
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(input: EventInput): Event
    updateEvent(id: ID!, input: EventInput) : Event
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
    createEvent: async (_, { input }) => {
      try {
        let response = await Event.create(input);
        return response;
      } catch(e) {
        e.message;
      }
    },
    updateEvent: async (_, {id, input }) => {
      try {
        let response = await Event.findOneAndUpdate({ id }, input, {new: true });
        return response;
      } catch(e) {
        e.message;
      }
    },
    deleteEvent: async (_, { id }) => {
      try {
        let response = await Event.findOneAndRemove({ _id: id });
        return response;
      } catch(e) {
        e.message;
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers, playground: true });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
);
