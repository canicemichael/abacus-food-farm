const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  color: {
    type: String
  }
});

// inorder to change the _id to id
categorySchema.virtual('id').get(function (){
  return this._id.toHexString();
});

categorySchema.set('toJSON', {
  virtuals: true
})

module.exports.Category = mongoose.model("Category", categorySchema);
