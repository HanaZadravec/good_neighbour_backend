const mongoose = require("mongoose");

const crimeSchema = mongoose.Schema({
  reporterEmail: {
    type: String,
    required: true
  },
  crimeTitle: {
    type: String,
    required: true
  },
  crimeAddress: {
    type: String,
    required: true
  },
  crimeCity: {
    type: String,
    required: true
  },
  crimeDesc: {
    type: String,
    required: true
  },
  crimeDate: {
    type: Date,
    required: true,
  }
});

const Crimes = mongoose.model("Crimes", crimeSchema);
module.exports = Crimes;
