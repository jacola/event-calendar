const { ApolloServer, gql } = require('apollo-server');
// const { MongoClient } = require('mongodb');

//const context = () => MongoClient.connect('mongodb://gql:Aa123456@localhost:27017/eventdb', { useNewUrlParser: true })
// .then(client => client.db('eventdb'));

require('./config');
const { Event } = require('./models');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    allEvents: [Event]
    event(id: ID!): Event
  }
  type Mutation {
    addEvent(input: EventInput) : Event
  }
  input EventInput {
    title: String
    start: String
    end: String
    cssClass: String
    description: String
  }
  type Event {
    id: ID!,
    title: String,
    start: String,
    end: String,
    cssClass: String,
    description: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    allEvents: async () => await Event.find({}).exec(),
    event: async (_, args) => Event.findById(args.id).exec()
    // context().then(db => db.collection('events').find().toArray())
    //events: (args, context) =>context().then(db => db.collection('events').find().toArray()),
    //event: (args, context) =>context().then(db => db.collection('events').findOne({ _id: args.id })),
  }
};
/* addEvent: (args, context) => context().then(
    db => db.collection('events').insertOne({
      title: args.input.title,
      start: args.input.start,
      end: args.input.end,
      cssClass: args.input.cssClass,
      description: args.input.description
  })).then(response => response.ops[0])  */
  
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
  });
