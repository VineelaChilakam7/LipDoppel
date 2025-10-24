import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    shade: { type: String, trim: true },
    colorHex: { type: String }, // for image dupe search
    availability: {
      type: String,
      enum: ["in-stock", "online", "limited"],
      default: "in-stock",
    },
    finish: {
      type: String,
      enum: ["Matte", "Satin", "Glossy", "Cream", "Liquid Matte", "Tint", "Powder Matte","Velvet","Metallic","Creamy"],
    },
    undertone: {
      type: String,
      enum: ["warm", "cool", "neutral"],
    },
    imageUrl: { type: String, required: true },
    description: { type: String },
    ingredients: { type: [String], default: [] }, // ✅ added for future use
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
