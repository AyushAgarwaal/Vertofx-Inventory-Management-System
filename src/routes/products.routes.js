import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  getLowStockProducts,
  increaseStock,
  decreaseStock,
  updatePartialProduct
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);

// updte all product fields
router.put("/:id", updateProduct);

router.patch("/:id", updatePartialProduct);  
// incearse stock
router.patch("/:id/increase-stock", increaseStock);
//decrese stock
router.patch("/:id/decrease-stock", decreaseStock);

router.get("/low-stock", getLowStockProducts);
// router.patch("/:id/stock", adjustStock);

export default router;
