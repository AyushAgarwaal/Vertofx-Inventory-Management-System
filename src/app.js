import express from "express";
import morgan from "morgan";
import cors from "cors";
import productsRouter from "./routes/products.routes.js";
import errorHandler from "./middleware/error.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/products", productsRouter);

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "okayy" });
});

// error handling
app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(422).json({
      message: "Validation failed",
    });
  }

  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
