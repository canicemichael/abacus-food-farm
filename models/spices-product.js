const mongoose = require("mongoose");

const spicesProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  richDescription: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  
  
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,

  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// inorder to change the _id to id
spicesProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

spicesProductSchema.set("toJSON", {
  virtuals: true,
});

module.exports.SpicesProduct = mongoose.model("SpicesProduct", spicesProductSchema);
