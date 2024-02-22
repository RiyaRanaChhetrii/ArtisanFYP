import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct, 
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct)

// Handling reviews for a specific product ID
router.route("/:id/reviews").post(protect, createProductReview)

// Getting top-rated products
router.get('/top', getTopProducts)

// Routes for a specific product ID, supporting GET, DELETE, and PUT operations
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
