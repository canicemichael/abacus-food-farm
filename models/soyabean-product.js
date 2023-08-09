const mongoose = require("mongoose");

const soyabeanProductSchema = mongoose.Schema({
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
soyabeanProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

soyabeanProductSchema.set("toJSON", {
  virtuals: true,
});

module.exports.SoyabeanProduct = mongoose.model("SoyabeanProduct", soyabeanProductSchema);
