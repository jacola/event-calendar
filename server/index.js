const express = require('express');
const { GraphQLScalarType } = require('graphql');
const { ApolloServer, gql } = require('apollo-server-express');

require('./config');
const { Event } = require('./models');

// The GraphQL schema
const typeDefs = gql`
  scalar Date

  type Event {
    id: ID!,
    title: String,
    start: String,
    end: String,
    cssClass: String,
    created: Date,
    modified: Date,
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
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    allEvents: async () => await Event.find({}).exec(),
    event: async (_, args) => Event.findById(args.id).exec()
  },
  Mutation: {
    createEvent: async (_, { input }) => {
      try {
        const dt = new Date();
        input.created = dt;
        input.modified = dt;
        let response = await Event.create(input);
        console.log(`Created: ${response.id}`);
        return response;
      } catch(e) {
        e.message;
      }
    },
    updateEvent: async (_, {id, input }) => {
      try {
        console.log(`Update: ${id}`);
        input.modified =  new Date();
        let response = await Event.updateOne({ _id: id }, input, {new: true });
        return await Event.findOne({ _id: id });
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
