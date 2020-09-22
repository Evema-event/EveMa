//Importing mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating schema with necessary information
const stallSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productDomain: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  visitors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  links: [String],
  documents: [String],
  images: [String]
});

//Exporting stall model
module.exports = mongoose.model('Stall', stallSchema);
