const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Table = require("./Table");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageURL: String,
  city: String,
  preferences: {
    vegetarian: Boolean,
    vegan: Boolean,
    glutenFree: Boolean,
    nonAlcohol: Boolean
  },
  table: [{ type: Schema.Types.ObjectId, ref: "Table" }],
  tableInvites: [{ type: Schema.Types.ObjectId, ref: "Table" }]
});
// change model: tableCreated and tableInvited, to allow for invitations

const User = mongoose.model("User", userSchema);

module.exports = User;
