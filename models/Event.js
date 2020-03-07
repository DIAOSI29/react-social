const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  name: {
    type: String
  },

  avatar: {
    type: String
  },

  location: {
    type: String
  },

  eventdate: {
    type: Date
  },

  hour: {
    type: String
  },

  minute: {
    type: String,
    default: "00"
  },

  about: {
    type: String
  },

  maxnumber: {
    type: Number
  },

  date: {
    type: Date,
    default: Date.now
  },
  joins: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      name: {
        type: String
      },
      mobile: {
        type: String
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Event = mongoose.model("event", EventSchema);
