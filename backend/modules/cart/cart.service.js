// cart.service.js
import Cart from "./cart.model.js";
import Jersey from "../jersey/jersey.model.js"; // Changed from Product

const calculateCartTotals = (items) => {
  let totalPrice = 0;
  let totalItems = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  return { totalPrice, totalItems };
};



export const addToCart = async (userId, jerseyId, quantity, size) => {
  // Changed productId to jerseyId
  const jersey = await Jersey.findById(jerseyId); // Changed from Product
  if (!jersey) throw new Error("Jersey not found");

  // Note: Jersey model doesn't have stock or availableSizes fields
  // Remove these checks or add these fields to your Jersey model if needed
  
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [
        {
          product: jerseyId, // This references the Jersey
          quantity,
          size,
          price: jersey.price,
        },
      ],
    });
  } else {
    // Check if item already exists
    const existingItem = cart.items.find(
      (item) => item.product.toString() === jerseyId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: jerseyId,
        quantity,
        size,
        price: jersey.price,
      });
    }
  }

  const { totalPrice, totalItems } = calculateCartTotals(cart.items);
  cart.totalPrice = totalPrice;
  cart.totalItems = totalItems;

  await cart.save();
  return cart.populate("items.product");
};

export const updateCartItem = async (userId, jerseyId, quantity, size) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find(
    (item) => item.product.toString() === jerseyId && item.size === size
  );

  if (!item) throw new Error("Item not found in cart");

  // Remove stock check since Jersey model doesn't have stock field
  // If you need stock management, add it to Jersey model

  item.quantity = quantity;

  const { totalPrice, totalItems } = calculateCartTotals(cart.items);
  cart.totalPrice = totalPrice;
  cart.totalItems = totalItems;

  await cart.save();
  return cart.populate("items.product");
};

export const removeFromCart = async (userId, jerseyId, size) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => !(item.product.toString() === jerseyId && item.size === size)
  );

  const { totalPrice, totalItems } = calculateCartTotals(cart.items);
  cart.totalPrice = totalPrice;
  cart.totalItems = totalItems;

  await cart.save();
  return cart.populate("items.product");
};


// cart.service.js

export const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  return cart;
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = [];
  cart.totalPrice = 0;
  cart.totalItems = 0;

  await cart.save();
  return cart;
};