import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    stock_quantity: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text" });
// ProductSchema.index({ sku: 1 }, { unique: true });

export default mongoose.model("products", ProductSchema);
