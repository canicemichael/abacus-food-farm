const mongoose = require("mongoose");

const sugarProductSchema = mongoose.Schema({
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
sugarProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

sugarProductSchema.set("toJSON", {
  virtuals: true,
});

module.exports.SugarProduct = mongoose.model("SugarProduct", sugarProductSchema);