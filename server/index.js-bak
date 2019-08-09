const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { MongoClient } = require('mongodb');

const context = () => MongoClient.connect('mongodb://gql:Aa123456@localhost:27017/eventdb', { useNewUrlParser: true })
  .then(client => client.db('eventdb'));

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    events: [Event]
    event(id: Int): Event
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
    _id: ID,
    title: String,
    start: String,
    end: String,
    cssClass: String,
    description: String
  }
`);

// Provide resolver functions for your schema fields
const resolvers = {
  events: (args, context) =>context().then(db => db.collection('events').find().toArray()),
  event: (args, context) =>context().then(db => db.collection('events').findOne({ _id: args.id })),
  addEvent: (args, context) => context().then(
    db => db.collection('events').insertOne({
      title: args.input.title,
      start: args.input.start,
      end: args.input.end,
      cssClass: args.input.cssClass,
      description: args.input.description
  })).then(response => response.ops[0])
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  context,
  graphiql: true
}));
app.listen(4000);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
