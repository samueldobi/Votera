const mongoose = require('mongoose');

const contestantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  about: {
    type: String,
    required: true,
    trim: true,
  },
  picture: {
    type: String,
    required: false,
  },
    votes: {
    type: Number,
    default: 0, // starts at zero
  }
}, { _id: true }); // auto-generate _id for each contestant

const pollSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  about: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  contestants: [contestantSchema]
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);
