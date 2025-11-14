import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import asyncHandler from "../middleware/asyncHandler.js";

/**
 * @desc    Create a new empty cart for a user
 * @route   POST /api/cart/:userId/create
 */
export const createCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    throw new Error("User ID is required");
  }

  // Check if user already has a cart
  const existingCart = await Cart.findOne({ user: userId });
  if (existingCart) {
    return res.status(200).json(existingCart);
  }

  const cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
  res.status(201).json(cart);
});

/**
 * @desc    Add an item to the user's cart
 * @route   POST /api/cart/:userId/add
 */
export const addItemToCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found for this user");
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
      price: product.price,
    });
  }

  // Recalculate total price
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  await cart.save();
  res.status(200).json(cart);
});

/**
 * @desc    Get a user's cart
 * @route   GET /api/cart/:userId
 */
export const getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const cart = await Cart.findOne({ user: userId })
    .populate("items.productId")
    .populate("user", "name email");

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  res.status(200).json(cart);
});

/**
 * @desc    Delete an item from the user's cart
 * @route   DELETE /api/cart/:userId/item/:productId
 */
export const deleteItemFromCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  // Recalculate total price
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  await cart.save();
  res.status(200).json(cart);
});
