import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  price: String,
  description: String,
  imageUrl: String,
});

export default mongoose.model("Item", itemSchema);
