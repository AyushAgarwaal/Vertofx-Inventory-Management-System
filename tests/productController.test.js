import mongoose from "mongoose";
import Product from "../src/models/Product.js";
import { increaseStock, decreaseStock } from "../src/controllers/products.controller.js";


jest.setTimeout(3000);

beforeAll(async () => {
  if (!process.env.MONGO_TEST_URI) {
    throw new Error("MONGO_TEST_URI is not defined in .env");
  }

  await mongoose.connect(process.env.MONGO_TEST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to test database");
});

// Drop the database and close connection after all tests
afterAll(async () => {
  await mongoose.connection.dropDatabase(); 
  await mongoose.connection.close();
  console.log("Test database connection closed");
});

// Main test suite
describe("Product Inventory Test", () => {
  let product;

  // Create a fresh product
  beforeEach(async () => {
    product = await Product.create({
      name: "Test Product",
      sku: `TEST-${Date.now()}`,
      price: 10,
      stock_quantity: 10,
      description: "A test product",
    });
  });

  // Clean up products after each test
  afterEach(async () => {
    await Product.deleteMany();
  });

  test("increase stock by 5", async () => {
    const updated = await increaseStock(product._id, 5);
    expect(updated.stock_quantity).toBe(15);
  });

  test("decrease stock by 3", async () => {
    const updated = await decreaseStock(product._id, 3);
    expect(updated.stock_quantity).toBe(7);
  });

  test("decrease stock more than available should throw error", async () => {
    await expect(decreaseStock(product._id, 20)).rejects.toThrow(
      "Insufficient stock"
    );
  });

  test("increase stock by 0 does nothing", async () => {
    const updated = await increaseStock(product._id, 0);
    expect(updated.stock_quantity).toBe(10);
  });

  test("decrease stock by 0 does nothing", async () => {
    const updated = await decreaseStock(product._id, 0);
    expect(updated.stock_quantity).toBe(10);
  });
});
