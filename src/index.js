import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./db.js";

// import http from "http";

// Import all models to register them with Mongoose
import "./models/Category.js";
import "./models/Product.js";



const PORT = process.env.PORT || 4000;

const checkConnection = async() => {
  try {
    await connectDB();
  
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }  
};

checkConnection();
