const mongoose = require("mongoose");

const snailProductSchema = mongoose.Schema({
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
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// inorder to change the _id to id
snailProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

snailProductSchema.set("toJSON", {
  virtuals: true,
});

module.exports.SnailProduct = mongoose.model("SnailProduct", snailProductSchema);
