import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});
export default mongoose.model("Cart", cartSchema);
