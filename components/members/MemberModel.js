const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Api400Error } = require("../../middleware/error/ApiErrors");

const MemberSchema = new Schema({
  name: {
    type: String,
    required: [true, "Member Name must be required"]
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone Number must be required."]
  },
  email: {
    type: String,
    required: [true, "Email must be required."],
    lowercase: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  createdAt: {
    type: Date,
    inmutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
});

MemberSchema.pre("save", (err, doc, next) => {
  if (err.name === "MongoServerError" && err.code === 11000) {
    let error = new Api400Error("Bad Request");
    next(error);
  } else {
    next(err);
  }
});

/*
 * TODO: Create Custom Validators
 * TODO: Implement Soft Delete functionality
 */

module.exports = mongoose.model("Member", MemberSchema);
