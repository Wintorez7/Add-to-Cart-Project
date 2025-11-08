const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: Number, required: true }, // ✅ numeric ID from DummyJSON
    quantity: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
