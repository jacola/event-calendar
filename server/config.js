require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(url);
const context = () => MongoClient.connect(url, { useNewUrlParser: true })

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
	console.log(`Connected to mongo at ${url}`)
});

