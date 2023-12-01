import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById, updateOrderToPaid } from "../controllers/orderControllers.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems); // Add new order route (Private)
router.route("/:id").get(protect, getOrderById); // Get order by ID route (Private)
router.route("/:id/pay").put(protect, updateOrderToPaid); 

export default router;
