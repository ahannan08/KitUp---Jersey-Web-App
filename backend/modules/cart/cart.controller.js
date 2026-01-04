import * as cartService from "./cart.service.js";


// cart.controller.js
export const addToCart = async (req, res) => {
  try {
    const { jerseyId, quantity, size } = req.body; // Changed from productId

    if (!jerseyId || !quantity || !size) {
      return res.status(400).json({
        success: false,
        message: "Jersey ID, quantity, and size are required",
      });
    }

    const cart = await cartService.addToCart(
      req.user._id,
      jerseyId, // Changed from productId
      quantity,
      size
    );

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { jerseyId, quantity, size } = req.body; // Changed from productId

    if (!jerseyId || !quantity || !size) {
      return res.status(400).json({
        success: false,
        message: "Jersey ID, quantity, and size are required",
      });
    }

    const cart = await cartService.updateCartItem(
      req.user._id,
      jerseyId, // Changed from productId
      quantity,
      size
    );

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { jerseyId, size } = req.body; // Changed from productId

    if (!jerseyId || !size) {
      return res.status(400).json({
        success: false,
        message: "Jersey ID and size are required",
      });
    }

    const cart = await cartService.removeFromCart(req.user._id, jerseyId, size);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// cart.controller.js

export const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user._id);
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};