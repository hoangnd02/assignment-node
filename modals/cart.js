import mongoose, { Schema, ObjectId } from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  cartItems: [
    {
      product: {
        type: ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
      },
    }
  ]
})

module.exports = mongoose.model('Cart', cartSchema)
