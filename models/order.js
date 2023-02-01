import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: { type: String, required: true, lowercase: true, unique: true },
  restraunt: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  status: Boolean,
});
export default mongoose.model("Order", orderSchema);
