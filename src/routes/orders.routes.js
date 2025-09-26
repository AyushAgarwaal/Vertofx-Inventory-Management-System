import { Router } from "express";
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getUserOrders,
  fulfillOrder,
  getAllOrders,
} from "../controllers/orders.controller.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders); // Get all orders
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);
router.get("/user/:userId", getUserOrders);
router.post("/:id/fulfill", fulfillOrder);

export default router;
