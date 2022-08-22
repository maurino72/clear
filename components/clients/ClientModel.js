const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new Schema({
  company_name: {
    type: String,
    required: [true, "Company Name must be required."]
  },
  address: {
    type: String,
    required: [true, "Address must be required"]
  },
  city: {
    type: String,
    required: [true, "City must be required."]
  },
  state: {
    type: String,
    required: [true, "State must be required."]
  },
  zipCode: {
    type: String,
    required: [true, "Zip Code must be required."]
  },
  headcount: {
    type: String,
    required: [true, "Headcount mus be required."]
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member"
    }
  ],
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

/*
 * TODO: Create Custom Validators
 * TODO: Implement Soft Delete functionality
 */

module.exports = mongoose.model("Client", ClientSchema);
