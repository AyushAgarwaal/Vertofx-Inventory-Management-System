import dotenv from "dotenv";
dotenv.config();
import connectDB from "../src/db.js";
import Category from "../src/models/Category.js";
import Product from "../src/models/Product.js";

const seed = async () => {
  try {
    await connectDB();

    // Clear old data
    await Category.deleteMany();
    await Product.deleteMany();

    // Categories
    const categories = await Category.insertMany([
      { name: "Electronics", description: "Gadgets and devices" },
      { name: "Books", description: "Fiction, non-fiction, and academic" },
      { name: "Clothing", description: "Men's and women's apparel" },
    ]);

    // Products
    const products = [
      {
        name: "Smartphone",
        sku: "ELEC001",
        price: 599.99,
        stock_quantity: 15,
        description: "Latest model with high-resolution camera",
        category: categories[0]._id,
      },
      {
        name: "Laptop",
        sku: "ELEC002",
        price: 999.99,
        stock_quantity: 8,
        description: "High-performance laptop for work and gaming",
        category: categories[0]._id,
      },
      {
        name: "Novel - The Great Gatsby",
        sku: "BOOK001",
        price: 12.99,
        stock_quantity: 50,
        description: "Classic novel by F. Scott Fitzgerald",
        category: categories[1]._id,
      },
      {
        name: "T-Shirt",
        sku: "CLOT001",
        price: 19.99,
        stock_quantity: 100,
        description: "Comfortable cotton T-shirt",
        category: categories[2]._id,
      },
      {
        name: "Jeans",
        sku: "CLOT002",
        price: 49.99,
        stock_quantity: 25,
        description: "Stylish denim jeans",
        category: categories[2]._id,
      },
    ];

    await Product.insertMany(products);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
