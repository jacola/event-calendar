require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
console.log(url);
const context = () => MongoClient.connect(url, { useNewUrlParser: true })


mongoConnect().then(() => console.log(`Connected to mongo at ${url}`)).catch(error => console.error(error.stack));

async function mongoConnect() {
  //console.log(mongoose.version);
  await mongoose.connect(url, { useNewUrlParser: true }).
    catch(error => { console.log(`Caught "${error.message}"`);
    process.exit(1)});
}
