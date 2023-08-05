const mongoose = require("mongoose");

const rabbitProductSchema = mongoose.Schema({
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
  images: [
    {
      type: String,
      default: "",
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  countInStock: {
    type: Number,
    required: [true, "the number of count in stock is required"],
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  },
  numReviews: {
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// inorder to change the _id to id
rabbitProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

rabbitProductSchema.set("toJSON", {
  virtuals: true,
});

module.exports.RabbitProduct = mongoose.model("RabbitProduct", rabbitProductSchema);
