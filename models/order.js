const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  first_name_mail: {
    type: String,
    required: true
  },
  last_name_mail: {
    type: String,
    required: true
  },
  email_mail: {
    type: String,
    required: true
  },
  phone_mail: {
    type: String,
    required: true
  },
  address_mail: {
    type: String,
    required: true
  },
  town_mail: {
    type: String,
    required: true
  },
  state_name_mail: {
    type: String,
    required: true
  },
  delivery_location_mail: {
    type: String,
    required: true
  },
  delivery_price_mail: {
    type: String,
    required: true
  },
  item_details_mail: [],  
  subtotal_mail: {
    type: String,
    required: true
  },
  actual_total_mail: {
    type: String,
    required: true
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  }
});

// inorder to change the _id to id
orderSchema.virtual('id').get(function (){
  return this._id.toHexString();
});

orderSchema.set('toJSON', {
  virtuals: true
})

module.exports.Order = mongoose.model("Order", orderSchema);
