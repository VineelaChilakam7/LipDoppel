import dotenv from "dotenv";
import mongoose from "mongoose";
import  Product  from "../models/Product.js";
import { products } from "../data/productsSeed.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    console.log("Cleared existing products");

    const formatted = products.map(p => ({
      ...p,
      image: {
        data: Buffer.from([]),
        contentType: "url",
      },
      imageUrl: p.imageUrl
    }));

    await Product.insertMany(formatted);
    console.log(`Inserted ${formatted.length} products`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();
