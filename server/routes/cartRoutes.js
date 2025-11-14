import express from "express";
import {
  createCart,
  addItemToCart,
  getUserCart,
  deleteItemFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/:userId/create", createCart);
router.post("/:userId/add", addItemToCart);
router.get("/:userId", getUserCart);
router.delete("/:userId/item/:productId", deleteItemFromCart);

export default router;
