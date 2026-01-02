import * as productService from "./product.service.js";

export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body, req.user._id);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, team, type, league, minPrice, maxPrice, search } = req.query;

    const filters = {};
    if (team) filters.team = team;
    if (type) filters.type = type;
    if (league) filters.league = league;
    if (minPrice || maxPrice) {
      filters.minPrice = minPrice ? parseFloat(minPrice) : null;
      filters.maxPrice = maxPrice ? parseFloat(maxPrice) : null;
    }
    if (search) filters.search = search;

    const result = await productService.getAllProducts(
      filters,
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const getProductsByTeam = async (req, res) => {
  try {
    const { team } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const result = await productService.getProductsByTeam(
      team,
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query required",
      });
    }

    const result = await productService.searchProducts(
      q,
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};