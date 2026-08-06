const mongoose = require("mongoose");

// Schema 
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  }
}, { timestamps: true });


// Model -> data collection for some specific entity (table)
const User = mongoose.model("user", userSchema);

module.exports = User;
