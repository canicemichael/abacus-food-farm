const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
});

// inorder to change the _id to id
orderItemSchema.virtual('id').get(function (){
  return this._id.toHexString();
});

orderItemSchema.set('toJSON', {
  virtuals: true
})

module.exports.OrderItem = mongoose.model("OrderItem", orderItemSchema);
