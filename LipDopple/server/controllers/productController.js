import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    if (search) {
      // Use Atlas Search if index exists
      const results = await Product.aggregate([
        {
          $search: {
            index: "default", // your Atlas Search index name
            text: {
              query: search,
              path: ["name", "brand", "shade", "finish", "undertone", "description"],
              fuzzy: { maxEdits: 2 },
            },
          },
        },
        { $limit: 1000 },
      ]);

      return res.json(results);
    }

    // If no search, return all
    const products = await Product.find().limit(1000);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({ message: "Error adding product" });
  }
};
