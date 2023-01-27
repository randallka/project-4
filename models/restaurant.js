import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: { type: String, required: true, lowercase: true, unique: true },
  logoUrl: String,
  description: String,
  menu: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});
export default mongoose.model("Restaurant", restaurantSchema);