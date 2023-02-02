import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address: { type: String, lowercase: true, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    status: Boolean,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Order", orderSchema);
