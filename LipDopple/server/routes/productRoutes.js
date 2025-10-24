import express from "express";
import multer from "multer";
import { getProducts, addProduct } from "../controllers/productController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct);

export default router;
