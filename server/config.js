const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const context = () => MongoClient.connect('mongodb://gql:Aa123456@localhost:27017/eventdb', { useNewUrlParser: true })
const url = 'mongodb://gql:Aa123456@localhost:27017/eventdb';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`🔗 Connected to mongo at ${url}`));
