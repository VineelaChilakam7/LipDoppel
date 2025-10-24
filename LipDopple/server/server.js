import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("LipDopple API is running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err.message));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
