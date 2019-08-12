const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: String,
  start: String,
  end: String,
  cssClass: String,
  data: {
    description: String
  }
});

const Event = mongoose.model('event', eventSchema);

module.exports = {
  Event
};
